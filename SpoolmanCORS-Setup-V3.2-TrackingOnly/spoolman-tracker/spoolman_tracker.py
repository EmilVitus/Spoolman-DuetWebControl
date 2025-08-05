#!/usr/bin/env python3
"""
Spoolman Filament Tracker Service
Server-side filament usage tracking for RepRapFirmware + Spoolman integration

Author: Emil Vitus
License: GPL-3.0
Version: 1.0.0
"""

import asyncio
import aiohttp
import json
import os
import logging
import time
from datetime import datetime
from typing import Dict, List, Optional, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

class SpoolmanTracker:
    def __init__(self):
        """Initialize the Spoolman Tracker service."""
        # Configuration from environment variables
        self.rrf_url = os.getenv('RRF_URL', 'http://192.168.1.100')
        self.spoolman_url = os.getenv('SPOOLMAN_URL', 'http://spoolman:7913')
        self.poll_interval = int(os.getenv('POLL_INTERVAL', '30'))  # seconds
        self.auto_sync = os.getenv('AUTO_SYNC', 'true').lower() == 'true'
        self.state_file = os.getenv('STATE_FILE', '/data/tracker_state.json')
        
        # Tracking state
        self.last_positions: List[float] = [0.0, 0.0, 0.0, 0.0]
        self.consumed_filament: List[float] = [0.0, 0.0, 0.0, 0.0]
        self.active_spools: List[Optional[int]] = [None, None, None, None]  # Spool IDs
        self.tracking_active = False
        self.last_sync_time = None
        
        # Session for HTTP requests
        self.session: Optional[aiohttp.ClientSession] = None
        
        logger.info("🚀 Spoolman Tracker initialized")
        logger.info(f"🔧 RRF URL: {self.rrf_url}")
        logger.info(f"🔧 Spoolman URL: {self.spoolman_url}")
        logger.info(f"🔧 Poll interval: {self.poll_interval}s")
        logger.info(f"🔧 Auto sync: {self.auto_sync}")

    async def start(self):
        """Start the tracking service."""
        logger.info("▶️ Starting Spoolman Tracker service...")
        
        # Create HTTP session
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=10)
        )
        
        # Load previous state
        await self.load_state()
        
        # Start main tracking loop
        try:
            await self.tracking_loop()
        except KeyboardInterrupt:
            logger.info("⏹️ Received interrupt signal")
        except Exception as e:
            logger.error(f"❌ Tracking loop error: {e}")
        finally:
            await self.cleanup()

    async def cleanup(self):
        """Clean up resources."""
        logger.info("🧹 Cleaning up resources...")
        await self.save_state()
        if self.session:
            await self.session.close()

    async def load_state(self):
        """Load tracking state from persistent storage."""
        try:
            if os.path.exists(self.state_file):
                with open(self.state_file, 'r') as f:
                    state = json.load(f)
                    
                self.last_positions = state.get('last_positions', [0.0, 0.0, 0.0, 0.0])
                self.consumed_filament = state.get('consumed_filament', [0.0, 0.0, 0.0, 0.0])
                self.active_spools = state.get('active_spools', [None, None, None, None])
                self.last_sync_time = state.get('last_sync_time')
                
                logger.info("📂 State loaded from file")
                logger.info(f"📊 Consumed filament: {self.consumed_filament}")
                logger.info(f"🎯 Active spools: {self.active_spools}")
            else:
                logger.info("📂 No previous state found, starting fresh")
                await self.save_state()
        except Exception as e:
            logger.error(f"❌ Error loading state: {e}")

    async def save_state(self):
        """Save tracking state to persistent storage."""
        try:
            # Ensure directory exists
            os.makedirs(os.path.dirname(self.state_file), exist_ok=True)
            
            state = {
                'last_positions': self.last_positions,
                'consumed_filament': self.consumed_filament,
                'active_spools': self.active_spools,
                'last_sync_time': self.last_sync_time,
                'updated_at': datetime.now().isoformat()
            }
            
            with open(self.state_file, 'w') as f:
                json.dump(state, f, indent=2)
                
            logger.debug("💾 State saved to file")
        except Exception as e:
            logger.error(f"❌ Error saving state: {e}")

    async def get_rrf_extruder_positions(self) -> Optional[List[float]]:
        """Get current extruder positions from RepRapFirmware."""
        try:
            url = f"{self.rrf_url}/rr_model?key=move"
            async with self.session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if 'result' in data and 'extruders' in data['result']:
                        positions = []
                        for extruder in data['result']['extruders']:
                            positions.append(float(extruder.get('position', 0)))
                        
                        logger.debug(f"📊 RRF positions: {positions}")
                        return positions
                    else:
                        logger.warning("⚠️ Invalid RRF response format")
                        return None
                else:
                    logger.warning(f"⚠️ RRF responded with status {response.status}")
                    return None
                    
        except asyncio.TimeoutError:
            logger.warning("⏰ RRF request timeout")
            return None
        except Exception as e:
            logger.error(f"❌ Error getting RRF positions: {e}")
            return None

    async def update_filament_usage(self, current_positions: List[float]):
        """Update filament usage based on position changes."""
        changes_detected = False
        
        for i in range(min(len(current_positions), 4)):
            # Calculate usage since last check
            usage = current_positions[i] - self.last_positions[i]
            
            # Only count positive extrusion (ignore retractions)
            if usage > 0:
                self.consumed_filament[i] += usage
                changes_detected = True
                logger.info(f"📊 T{i} extruded {usage:.2f}mm (total: {self.consumed_filament[i]:.2f}mm)")
        
        # Update last positions
        self.last_positions = current_positions.copy()
        
        if changes_detected:
            await self.save_state()
            
            # Auto-sync to Spoolman if enabled
            if self.auto_sync:
                await self.sync_to_spoolman()

    async def sync_to_spoolman(self):
        """Sync consumed filament to Spoolman server."""
        if not self.active_spools:
            logger.debug("🔄 No active spools configured, skipping sync")
            return
            
        try:
            for i in range(4):
                spool_id = self.active_spools[i]
                usage_mm = self.consumed_filament[i]
                
                if spool_id and usage_mm > 0:
                    # Convert mm to meters for Spoolman API
                    usage_m = usage_mm / 1000.0
                    
                    url = f"{self.spoolman_url}/api/v1/spool/{spool_id}/use"
                    data = {"use_length": usage_m}
                    
                    async with self.session.patch(url, json=data) as response:
                        if response.status == 200:
                            logger.info(f"✅ Synced T{i}: {usage_mm:.2f}mm to spool #{spool_id}")
                            self.consumed_filament[i] = 0.0  # Reset after successful sync
                        else:
                            logger.warning(f"⚠️ Failed to sync T{i} to spool #{spool_id}: HTTP {response.status}")
            
            self.last_sync_time = datetime.now().isoformat()
            await self.save_state()
            
        except Exception as e:
            logger.error(f"❌ Error syncing to Spoolman: {e}")

    async def get_spoolman_configuration(self):
        """Get active spool configuration from Spoolman."""
        try:
            # Get all spools from Spoolman
            url = f"{self.spoolman_url}/api/v1/spool"
            async with self.session.get(url) as response:
                if response.status == 200:
                    spools = await response.json()
                    
                    # Look for DWC_STATE in first spool's comment
                    if spools and len(spools) > 0:
                        comment = spools[0].get('comment', '')
                        if 'DWC_STATE:' in comment:
                            try:
                                state_str = comment.split('DWC_STATE:')[1]
                                dwc_state = json.loads(state_str)
                                
                                # Extract active spool mapping
                                selected_spools = dwc_state.get('selectedSpools', [None, None, None, None])
                                active_spools = []
                                
                                for i in range(4):
                                    if i < len(selected_spools) and selected_spools[i]:
                                        active_spools.append(selected_spools[i]['id'])
                                    else:
                                        active_spools.append(None)
                                
                                self.active_spools = active_spools
                                logger.info(f"🎯 Updated active spools from DWC state: {self.active_spools}")
                                
                            except json.JSONDecodeError:
                                logger.warning("⚠️ Could not parse DWC_STATE from Spoolman comment")
                        else:
                            logger.debug("🔍 No DWC_STATE found in Spoolman comments")
                else:
                    logger.warning(f"⚠️ Failed to get Spoolman configuration: HTTP {response.status}")
                    
        except Exception as e:
            logger.error(f"❌ Error getting Spoolman configuration: {e}")

    async def tracking_loop(self):
        """Main tracking loop."""
        logger.info("🔄 Starting tracking loop...")
        
        while True:
            try:
                # Get current extruder positions
                current_positions = await self.get_rrf_extruder_positions()
                
                if current_positions:
                    # Update filament usage
                    await self.update_filament_usage(current_positions)
                    
                    # Update configuration from Spoolman every 5 minutes
                    if not hasattr(self, '_last_config_update') or \
                       time.time() - self._last_config_update > 300:
                        await self.get_spoolman_configuration()
                        self._last_config_update = time.time()
                
                # Wait for next poll
                await asyncio.sleep(self.poll_interval)
                
            except Exception as e:
                logger.error(f"❌ Error in tracking loop: {e}")
                await asyncio.sleep(self.poll_interval)

if __name__ == "__main__":
    tracker = SpoolmanTracker()
    asyncio.run(tracker.start())