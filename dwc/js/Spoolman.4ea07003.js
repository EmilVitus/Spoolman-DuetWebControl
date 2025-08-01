(self["webpackChunkduetwebcontrol"]=self["webpackChunkduetwebcontrol"]||[]).push([["Spoolman"],{
  "./src/plugins/Spoolman/index.js": function(e,n,t) {
    "use strict";
    t.r(n);
    
    // KOMPLET SPOOLMAN PLUGIN MED VUE RENDER FUNKTIONER
    var SpoolmanComponent = {
      name: 'Spoolman',
      data: function() {
        // Load saved settings from localStorage
        var savedUrl = localStorage.getItem('spoolman_url');
        var savedConnected = localStorage.getItem('spoolman_connected') === 'true';
        var savedApiConfig = localStorage.getItem('spoolman_show_api_config') === 'true';
        var savedIsDemo = localStorage.getItem('spoolman_is_demo') === 'true';
        var savedLanguage = localStorage.getItem('spoolman_language') || 'auto';
        
        // Hvis ingen URL er gemt, prøv at auto-detecte eller vis setup
        if (!savedUrl) {
          savedApiConfig = true; // Vis setup hvis ingen URL
          savedUrl = 'http://192.168.1.100:7913'; // Default
        }
        
        return {
          spoolmanUrl: savedUrl,
          connected: savedConnected,
          loading: false,
          spools: [],
          selectedSpools: [null, null, null, null], // T0-T3
          consumedFilament: [0, 0, 0, 0],
          error: null,
          successMessage: null,
          showDemoOption: false,
          showApiConfig: savedApiConfig,
          isDemo: savedIsDemo,
          isFirstTimeSetup: !localStorage.getItem('spoolman_url'), // Track hvis dette er første gang
          
          // Filament tracking
          tracking: false,
          trackingInterval: null,
          lastExtruderPositions: [0, 0, 0, 0],
          rrfUrl: 'http://toolchanger', // Default RRF URL
          trackingStartTime: null,
          
          // Language system
          selectedLanguage: savedLanguage,
          languageRevision: 0, // Force Vue reactivity for language changes
          translations: {
            da: {
              // Headers
              'filament_tracking': '📊 Filament Tracking',
              'toolchanger_config': '🔧 E3D Toolchanger Konfiguration',
              'connection_status': '✅ Klar til brug',
              'debug_info': '🔧 Debug Information',
              'language_settings': '🌐 Sprog / Language',
              
              // Tracking
              'tracking_active': '🟢 Tracking Aktiv',
              'tracking_inactive': '🔴 Tracking Inaktiv',
              'start_tracking': '▶️ Start Tracking',
              'stop_tracking': '⏹️ Stop Tracking',
              'manual_update': '✏️ Manuel Opdatering',
              'sync_to_spoolman': '📡 Sync til Spoolman',
              'tracking_started': '⏱️ Tracking startet',
              'tracking_note': '💡 Tracking køre kun mens DWC er åben i browseren',
              
              // Connection
              'demo_mode_active': '🎭 Demo Mode Aktiv',
              'demo_mode_desc': 'Du bruger test data. Alle valg og ændringer er kun for demonstration.',
              'ready_to_use': '✅ Klar til brug',
              'sync_devices': '🔄 Sync enheder',
              'syncing': '⏳ Syncer...',
              'first_time_setup': '🔧 Første gangs opsætning',
              'choose_source': '🔧 Vælg filament kilde',
              'first_time_note': '💡 På denne enhed skal du forbinde til Spoolman én gang. Dine filament valg synkroniseres automatisk fra serveren.',
              'start_demo': '🎭 Start med Demo Data',
              'connect_spoolman': '🔌 Forbind til Spoolman Server',
              'spoolman_config': '🔧 Spoolman Server Konfiguration',
              'cors_note': '✅ Brug port 7913 for CORS support (se SpoolmanCORS-Setup.zip).',
              'test_connection': 'Test Forbindelse',
              'testing': 'Tester...',
              'disconnect': '❌ Afbryd Forbindelse',
              'switch_source': '🔄 Skift kilde',
              
              // Filament
              'selected_filament': 'Valgt Filament:',
              'choose_filament': 'Vælg filament...',
              'weight': 'Vægt',
              'consumed_session': 'Forbrugt denne session:',
              'eject_filament': '⏏️ Eject Filament',
              'no_filament_info': 'Ingen filament information',
              'unknown_material': 'Ukendt materiale',
              
              // Messages
              'connection_success': '✅ Forbindelse til Spoolman lykkedes',
              'found_spools': 'Fandt',
              'spools': 'spools',
              'demo_activated': '🎭 Demo mode aktiveret! Du kan nu teste alle funktioner med demo data.',
              'tracking_started_msg': '▶️ Filament tracking startet! Positions bliver tracked hver 10. sekund.',
              'tracking_stopped_msg': '⏹️ Filament tracking stoppet. Manuel opdatering eller sync til Spoolman er stadig muligt.',
              'manual_update_done': '✏️ Manuel opdatering gennemført!',
              'sync_completed': '📡 Sync til Spoolman gennemført!',
              'spools_updated': 'spools opdateret.',
              'auto_found': '🎯 Auto-fundet Spoolman på:',
              'searching_server': '🔍 Søger efter Spoolman server...',
              
              // Debug
              'plugin_status': 'Plugin Status:',
              'loaded_functional': 'Loaded and Functional ✅',
              'vue_render': 'Vue Render:',
              'render_working': 'Working with render() functions ✅',
              'navigation': 'Navigation:',
              'tab_registered': 'Tab registered successfully ✅',
              'debugging': 'Debugging:',
              'check_console': 'Check browser F12 Console for detailed logs 🔍',
              
              // Language
              'language_auto': 'Automatisk (Browser sprog)',
              'language_danish': 'Dansk',
              'language_english': 'English',
              'language_changed': '🌐 Sprog ændret til Dansk!',
              
              // Status messages
              'using_spools_from': 'Bruger',
              'spools_from_demo': 'spools fra demo data',
              'spools_from_server': 'spools fra Spoolman server',
              'connected_no_spools': 'Forbundet - ingen spools fundet',
              
              // Colors
              'color_sort': 'Sort',
              'color_hvid': 'Hvid',
              'color_rød': 'Rød',
              'color_grøn': 'Grøn',
              'color_blå': 'Blå',
              'color_gul': 'Gul',
              'color_magenta': 'Magenta',
              'color_cyan': 'Cyan',
              'color_mørkerød': 'Mørkerød',
              'color_mørkegrøn': 'Mørkegrøn',
              'color_marineblå': 'Marineblå',
              'color_lilla': 'Lilla',
              'color_oliven': 'Oliven',
              'color_teal': 'Teal',
              'color_sølv': 'Sølv',
              'color_grå': 'Grå',
              'color_orange': 'Orange',
              'color_pink': 'Pink',
              'color_lyseblå': 'Lyseblå',
              'color_lysegrøn': 'Lysegrøn',
              'color_lysegul': 'Lysegul',
              'color_guld': 'Guld',
              'color_brun': 'Brun',
              'color_plum': 'Plum',
              'color_lysehavsgrøn': 'Lysehavsgrøn',
              'color_himmelblå': 'Himmelblå',
              'color_khaki': 'Khaki',
              'color_lavendel': 'Lavendel'
            },
            en: {
              // Headers
              'filament_tracking': '📊 Filament Tracking',
              'toolchanger_config': '🔧 E3D Toolchanger Configuration',
              'connection_status': '✅ Ready to use',
              'debug_info': '🔧 Debug Information',
              'language_settings': '🌐 Language / Sprog',
              
              // Tracking
              'tracking_active': '🟢 Tracking Active',
              'tracking_inactive': '🔴 Tracking Inactive',
              'start_tracking': '▶️ Start Tracking',
              'stop_tracking': '⏹️ Stop Tracking',
              'manual_update': '✏️ Manual Update',
              'sync_to_spoolman': '📡 Sync to Spoolman',
              'tracking_started': '⏱️ Tracking started',
              'tracking_note': '💡 Tracking only runs while DWC is open in browser',
              
              // Connection
              'demo_mode_active': '🎭 Demo Mode Active',
              'demo_mode_desc': 'You are using test data. All selections and changes are for demonstration only.',
              'ready_to_use': '✅ Ready to use',
              'sync_devices': '🔄 Sync devices',
              'syncing': '⏳ Syncing...',
              'first_time_setup': '🔧 First time setup',
              'choose_source': '🔧 Choose filament source',
              'first_time_note': '💡 On this device you need to connect to Spoolman once. Your filament selections synchronize automatically from the server.',
              'start_demo': '🎭 Start with Demo Data',
              'connect_spoolman': '🔌 Connect to Spoolman Server',
              'spoolman_config': '🔧 Spoolman Server Configuration',
              'cors_note': '✅ Use port 7913 for CORS support (see SpoolmanCORS-Setup.zip).',
              'test_connection': 'Test Connection',
              'testing': 'Testing...',
              'disconnect': '❌ Disconnect',
              'switch_source': '🔄 Switch source',
              
              // Filament
              'selected_filament': 'Selected Filament:',
              'choose_filament': 'Choose filament...',
              'weight': 'Weight',
              'consumed_session': 'Consumed this session:',
              'eject_filament': '⏏️ Eject Filament',
              'no_filament_info': 'No filament information',
              'unknown_material': 'Unknown material',
              
              // Messages
              'connection_success': '✅ Connection to Spoolman successful',
              'found_spools': 'Found',
              'spools': 'spools',
              'demo_activated': '🎭 Demo mode activated! You can now test all functions with demo data.',
              'tracking_started_msg': '▶️ Filament tracking started! Positions are tracked every 10 seconds.',
              'tracking_stopped_msg': '⏹️ Filament tracking stopped. Manual update or sync to Spoolman is still possible.',
              'manual_update_done': '✏️ Manual update completed!',
              'sync_completed': '📡 Sync to Spoolman completed!',
              'spools_updated': 'spools updated.',
              'auto_found': '🎯 Auto-discovered Spoolman at:',
              'searching_server': '🔍 Searching for Spoolman server...',
              
              // Debug
              'plugin_status': 'Plugin Status:',
              'loaded_functional': 'Loaded and Functional ✅',
              'vue_render': 'Vue Render:',
              'render_working': 'Working with render() functions ✅',
              'navigation': 'Navigation:',
              'tab_registered': 'Tab registered successfully ✅',
              'debugging': 'Debugging:',
              'check_console': 'Check browser F12 Console for detailed logs 🔍',
              
              // Language
              'language_auto': 'Auto (Browser language)',
              'language_danish': 'Dansk',
              'language_english': 'English',
              'language_changed': '🌐 Language changed to English!',
              
              // Status messages
              'using_spools_from': 'Using',
              'spools_from_demo': 'spools from demo data',
              'spools_from_server': 'spools from Spoolman server',
              'connected_no_spools': 'Connected - no spools found',
              
              // Colors
              'color_sort': 'Black',
              'color_hvid': 'White',
              'color_rød': 'Red',
              'color_grøn': 'Green',
              'color_blå': 'Blue',
              'color_gul': 'Yellow',
              'color_magenta': 'Magenta',
              'color_cyan': 'Cyan',
              'color_mørkerød': 'Dark Red',
              'color_mørkegrøn': 'Dark Green',
              'color_marineblå': 'Navy Blue',
              'color_lilla': 'Purple',
              'color_oliven': 'Olive',
              'color_teal': 'Teal',
              'color_sølv': 'Silver',
              'color_grå': 'Gray',
              'color_orange': 'Orange',
              'color_pink': 'Pink',
              'color_lyseblå': 'Light Blue',
              'color_lysegrøn': 'Light Green',
              'color_lysegul': 'Light Yellow',
              'color_guld': 'Gold',
              'color_brun': 'Brown',
              'color_plum': 'Plum',
              'color_lysehavsgrøn': 'Light Sea Green',
              'color_himmelblå': 'Sky Blue',
              'color_khaki': 'Khaki',
              'color_lavendel': 'Lavender'
            }
          }
        };
      },
      
      render: function(h) {
        var self = this;
        
        return h('div', { 
          style: { 
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
          }
        }, [
          
          // Filament Tracking Section (moved to top for better UX)
          this.connected && !this.isDemo ? h('div', {
            style: {
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px'
            }
          }, [
            h('h3', { style: { margin: '0 0 15px 0', color: '#343a40' } }, self.t('filament_tracking')),
            
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }
            }, [
              // Tracking status
              h('div', {
                style: {
                  padding: '8px 12px',
                  background: this.tracking ? '#d4edda' : '#f8d7da',
                  color: this.tracking ? '#155724' : '#721c24',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }
              }, this.tracking ? self.t('tracking_active') : self.t('tracking_inactive')),
              
              // Start/Stop tracking button
              h('button', {
                style: {
                  padding: '8px 16px',
                  background: this.tracking ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                },
                on: {
                  click: function() {
                    if (self.tracking) {
                      self.stopTracking();
                    } else {
                      self.startTracking();
                    }
                  }
                }
              }, this.tracking ? self.t('stop_tracking') : self.t('start_tracking')),
              
              // Manual update button
              h('button', {
                style: {
                  padding: '8px 16px',
                  background: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                },
                on: {
                  click: function() {
                    self.showManualUpdate();
                  }
                }
              }, self.t('manual_update')),
              
              // Update to Spoolman button
              h('button', {
                style: {
                  padding: '8px 16px',
                  background: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                },
                on: {
                  click: function() {
                    self.updateSpoolmanUsage();
                  }
                }
              }, self.t('sync_to_spoolman'))
            ]),
            
            // Tracking info
            this.tracking ? h('div', {
              style: {
                marginTop: '15px',
                padding: '10px',
                background: '#e2f3ff',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#0c5460'
              }
            }, [
              h('div', self.t('tracking_started') + ': ' + (this.trackingStartTime ? new Date(this.trackingStartTime).toLocaleTimeString('da-DK') : 'Ukendt')),
              h('div', { style: { marginTop: '5px' } }, self.t('tracking_note'))
            ]) : null
          ]) : null,
          

          
          // Demo info notice
          this.connected && this.isDemo ? h('div', {
            style: {
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              color: '#856404',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px'
            }
          }, [
            h('div', { style: { fontWeight: 'bold', marginBottom: '5px' } }, self.t('demo_mode_active')),
            h('div', { style: { fontSize: '14px' } }, self.t('demo_mode_desc'))
          ]) : null,
          

          
          // Toolheads Configuration
          this.connected ? h('div', [
            h('h3', { style: { marginTop: '30px' } }, self.t('toolchanger_config')),
            h('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
              }
            }, [0, 1, 2, 3].map(function(toolIndex) {
              return h('div', {
                key: 'tool-' + toolIndex,
                style: {
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#f8f9fa'
                }
              }, [
                h('h4', { 
                  style: { 
                    margin: '0 0 15px 0',
                    color: '#495057'
                  }
                }, 'T' + toolIndex + ' Hotend'),
                
                // Filament Selection
                h('div', { style: { marginBottom: '15px' } }, [
                  h('label', { 
                    style: { 
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: 'bold',
                      color: '#495057'
                    }
                  }, self.t('selected_filament')),
                  h('select', {
                    style: {
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    },
                    on: {
                      change: function(event) {
                        self.selectSpool(toolIndex, event.target.value);
                      }
                    }
                  }, [
                    h('option', { 
                      attrs: { 
                        value: '',
                        selected: !self.selectedSpools[toolIndex]
                      } 
                    }, self.t('choose_filament')),
                    self.spools.map(function(spool) {
                      
                      // Build display name fra Spoolman data
                      var displayName = '';
                      
                      // Tilføj farve emoji først
                      if (spool.filament && spool.filament.color_hex) {
                        var colorEmoji = self.getColorEmoji(spool.filament.color_hex);
                        displayName += colorEmoji + ' ';
                      }
                      
                      // Byg navn: Prioriter producent først, derefter spool navn
                      var hasProducent = false;
                      var spoolName = null;
                      
                      // Find spool navn
                      if (spool.name) {
                        spoolName = spool.name;
                      } else if (spool.filament && spool.filament.name) {
                        spoolName = spool.filament.name;
                      } else if (spool.comment && spool.comment.trim() && !spool.comment.startsWith('DWC_STATE:')) {
                        spoolName = spool.comment.trim();
                      }
                      
                      // Start med producent hvis tilgængeligt
                      if (spool.filament && spool.filament.vendor && spool.filament.vendor.name) {
                        displayName += spool.filament.vendor.name;
                        hasProducent = true;
                        
                        // Tilføj spool navn efter producent
                        if (spoolName) {
                          displayName += ' - ' + spoolName;
                        }
                      } else if (spoolName) {
                        // Hvis ingen producent, brug spool navn alene
                        displayName += spoolName;
                      }
                      
                      // Tilføj materiale hvis vi ikke har noget godt navn endnu
                      if (!hasProducent && !spoolName && spool.filament && spool.filament.material) {
                        displayName += spool.filament.material;
                      }
                      
                      // Fallback hvis intet andet virker
                      if (!displayName) {
                        displayName += 'Spool #' + spool.id;
                      }
                      
                      // Tilføj vægt til sidst
                      if (spool.remaining_weight !== null && spool.remaining_weight !== undefined) {
                        displayName += ' (' + Math.round(spool.remaining_weight) + 'g)';
                      }
                      
                      return h('option', {
                        key: spool.id,
                        attrs: { 
                          value: spool.id,
                          selected: self.selectedSpools[toolIndex] && self.selectedSpools[toolIndex].id === spool.id
                        }
                      }, displayName);
                    })
                  ])
                ]),
                
                // Current Spool Info
                self.selectedSpools[toolIndex] ? h('div', {
                  style: {
                    background: '#e9ecef',
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    color: '#495057' // Mørk grå tekst for læsbarhed
                  }
                }, [
                  // Vendor name med farve cirkel
                  h('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '5px'
                    }
                  }, [
                    // Farve cirkel
                    self.selectedSpools[toolIndex].filament && self.selectedSpools[toolIndex].filament.color_hex 
                      ? h('div', {
                          style: {
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: (self.selectedSpools[toolIndex].filament.color_hex.startsWith('#') ? 
                              self.selectedSpools[toolIndex].filament.color_hex : 
                              '#' + self.selectedSpools[toolIndex].filament.color_hex),
                            border: '2px solid #dee2e6',
                            flexShrink: '0'
                          }
                        })
                      : h('div', {
                          style: {
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: '#6c757d',
                            border: '2px solid #dee2e6',
                            flexShrink: '0'
                          }
                        }),
                    
                    // Spool navn (prioriter spool navn over vendor navn)
                    h('strong', {
                      style: { color: '#343a40' }
                    }, (function() {
                      var spool = self.selectedSpools[toolIndex];
                      if (spool.name) {
                        return spool.name;
                      } else if (spool.filament && spool.filament.name) {
                        return spool.filament.name;
                      } else if (spool.comment && spool.comment.trim() && !spool.comment.startsWith('DWC_STATE:')) {
                        return spool.comment.trim();
                      } else if (spool.filament && spool.filament.vendor && spool.filament.vendor.name) {
                        return spool.filament.vendor.name;
                      } else {
                        return 'Spool #' + spool.id;
                      }
                    })())
                  ]),
                  
                  // Material og farve info
                  self.selectedSpools[toolIndex].filament 
                    ? h('div', {
                        style: { color: '#495057', marginBottom: '5px' }
                      }, [
                        h('span', self.selectedSpools[toolIndex].filament.material || 'Ukendt materiale'),
                        self.selectedSpools[toolIndex].filament.color_hex 
                          ? h('span', {
                              style: { 
                                color: '#6c757d',
                                fontSize: '12px',
                                marginLeft: '8px'
                              }
                            }, (function() {
                              var colorName = self.getColorName(self.selectedSpools[toolIndex].filament.color_hex, self.t.bind(self));
                              var hexCode = self.selectedSpools[toolIndex].filament.color_hex.toUpperCase();
                              if (!hexCode.startsWith('#')) hexCode = '#' + hexCode;
                              
                              if (colorName) {
                                return colorName + ' (' + hexCode + ')';
                              } else {
                                return hexCode;
                              }
                            })())
                          : null
                      ])
                    : h('span', {
                        style: { color: '#6c757d' }
                      }, self.t('no_filament_info')),
                  
                  // Vægt information
                  h('span', {
                    style: { color: '#495057' }
                  }, self.t('weight') + ': ' + 
                    (self.selectedSpools[toolIndex].remaining_weight !== null && self.selectedSpools[toolIndex].remaining_weight !== undefined 
                      ? Math.round(self.selectedSpools[toolIndex].remaining_weight) + 'g' 
                      : '?g') + 
                    ' / ' + 
                    (self.selectedSpools[toolIndex].initial_weight !== null && self.selectedSpools[toolIndex].initial_weight !== undefined 
                      ? Math.round(self.selectedSpools[toolIndex].initial_weight) + 'g' 
                      : '?g'))
                ]) : null,
                
                // Consumed Filament
                h('div', { style: { marginBottom: '15px' } }, [
                  h('label', { 
                    style: { 
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: 'bold',
                      color: '#495057'
                    }
                  }, self.t('consumed_session')),
                  h('div', { 
                    style: { 
                      fontSize: '18px',
                      color: '#28a745'
                    }
                  }, self.consumedFilament[toolIndex].toFixed(2) + ' mm')
                ]),
                
                // Eject Button
                h('button', {
                  style: {
                    width: '100%',
                    padding: '8px',
                    background: self.selectedSpools[toolIndex] ? '#dc3545' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: self.selectedSpools[toolIndex] ? 'pointer' : 'not-allowed'
                  },
                  attrs: {
                    disabled: !self.selectedSpools[toolIndex]
                  },
                  on: {
                    click: function() {
                      self.ejectSpool(toolIndex);
                    }
                  }
                }, self.t('eject_filament'))
              ]);
            }))
          ]) : null,
          
          // Connection Status & Mode Selection (moved here for better layout)
          h('div', {
            style: {
              background: this.connected ? '#d4edda' : '#f8f9fa',
              border: '1px solid ' + (this.connected ? '#c3e6cb' : '#dee2e6'),
              color: this.connected ? '#155724' : '#495057',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '30px',
              marginBottom: '20px'
            }
          }, [
            // Header med refresh knap
            this.connected ? h('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }
            }, [
              h('h3', { style: { margin: '0' } }, self.t('ready_to_use')),
              h('button', {
                style: {
                  padding: '6px 12px',
                  background: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                },
                on: {
                  click: function() {
                    console.log('🔄 SPOOLMAN: Manuel refresh fra andre enheder...');
                    self.testConnection(true); // Sync fra andre enheder
                  }
                }
              }, this.loading ? self.t('syncing') : self.t('sync_devices'))
            ]) : h('h3', { style: { margin: '0 0 15px 0' } }, 
              this.isFirstTimeSetup ? self.t('first_time_setup') : 
              self.t('choose_source')
            ),
            
            // First time setup besked
            this.isFirstTimeSetup && !this.connected ? h('p', {
              style: {
                margin: '0 0 15px 0',
                fontSize: '14px',
                color: '#6c757d',
                fontStyle: 'italic'
              }
            }, self.t('first_time_note')) : null,
            
            // Mode selection buttons
            !this.connected ? h('div', {
              style: {
                display: 'flex',
                gap: '10px',
                marginBottom: '15px',
                flexWrap: 'wrap'
              }
            }, [
              h('button', {
                style: {
                  padding: '10px 20px',
                  background: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                },
                on: {
                  click: this.tryDemoMode
                }
              }, self.t('start_demo')),
              
              h('button', {
                style: {
                  padding: '10px 20px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                },
                on: {
                  click: function() {
                    self.showApiConfig = true;
                    self.$forceUpdate();
                  }
                }
              }, self.t('connect_spoolman'))
            ]) : null,
            
            // API Configuration (shown when requested)
            this.showApiConfig && !this.connected ? h('div', {
              style: {
                background: '#e9ecef',
                padding: '15px',
                borderRadius: '6px',
                marginTop: '10px'
              }
            }, [
              h('h5', { style: { margin: '0 0 10px 0', color: '#495057' } }, self.t('spoolman_config')),
              h('p', {
                style: {
                  margin: '0 0 10px 0',
                  fontSize: '14px',
                  color: '#28a745',
                  fontWeight: 'bold'
                }
              }, self.t('cors_note')),
              
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
                h('input', {
                  attrs: {
                    type: 'text',
                    placeholder: 'Spoolman URL (f.eks. http://192.168.1.100:7913)',
                    value: this.spoolmanUrl
                  },
                  style: {
                    flex: '1',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  },
                  on: {
                    input: function(event) {
                      self.updateSpoolmanUrl(event);
                    }
                  }
                }),
                h('button', {
                  style: {
                    padding: '8px 16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: function() {
                      self.testConnection(false); // Normal forbindelse fra UI knap
                    }
                  }
                }, this.loading ? self.t('testing') : self.t('test_connection'))
              ]),
              
              h('div', { style: { marginTop: '10px' } }, [
                h('button', {
                  style: {
                    padding: '8px 16px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: this.disconnect
                  }
                }, self.t('disconnect'))
              ])
            ]) : null,
            
            // Error Message
            this.error ? h('div', {
              style: {
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                color: '#721c24',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px',
                marginTop: '15px'
              }
            }, this.error) : null,
            
            // Success Message
            this.successMessage ? h('div', {
              style: {
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                color: '#155724',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px',
                marginTop: '15px'
              }
            }, this.successMessage) : null,
            
            // Connected info with source switch button
            this.connected ? h('div', {
              style: {
                marginTop: '10px'
              }
            }, [
              h('div', { 
                style: { 
                  fontSize: '14px',
                  marginBottom: '10px' 
                }
              }, this.spools.length > 0
                ? `${self.t('using_spools_from')} ${this.spools.length} ${this.isDemo ? self.t('spools_from_demo') : self.t('spools_from_server')}`
                : self.t('connected_no_spools')
              ),
              h('button', {
                style: {
                  padding: '6px 12px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                },
                on: {
                  click: function() {
                    self.connected = false;
                    self.isDemo = false;
                    self.showApiConfig = false;
                    self.spools = [];
                    self.selectedSpools = [null, null, null, null];
                    self.error = null;
                    self.successMessage = null;
                    self.$forceUpdate();
                  }
                }
              }, self.t('switch_source'))
            ]) : null
          ]),
          
          // Debug Info
          h('div', {
            style: {
              marginTop: '30px',
              padding: '15px',
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#495057'
            }
          }, [
            h('h4', { style: { margin: '0 0 10px 0', color: '#495057' } }, self.t('debug_info')),
            h('div', [
              h('strong', { style: { color: '#495057' } }, self.t('plugin_status') + ' '), self.t('loaded_functional')
            ]),
            h('div', [
              h('strong', { style: { color: '#495057' } }, self.t('vue_render') + ' '), self.t('render_working')
            ]),
            h('div', [
              h('strong', { style: { color: '#495057' } }, self.t('navigation') + ' '), self.t('tab_registered')
            ]),
            h('div', [
              h('strong', { style: { color: '#495057' } }, self.t('debugging') + ' '), self.t('check_console')
            ])
          ]),
          
          // Language Settings
          h('div', {
            style: {
              marginTop: '20px',
              padding: '15px',
              background: '#e3f2fd',
              border: '1px solid #bbdefb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#0d47a1'
            }
          }, [
            h('h4', { style: { margin: '0 0 15px 0', color: '#0d47a1' } }, self.t('language_settings')),
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }
            }, [
              h('label', {
                style: {
                  fontWeight: 'bold',
                  color: '#0d47a1'
                }
              }, 'Language / Sprog:'),
              h('select', {
                attrs: {
                  value: this.selectedLanguage
                },
                style: {
                  padding: '6px 12px',
                  border: '1px solid #90caf9',
                  borderRadius: '4px',
                  background: 'white',
                  color: '#0d47a1',
                  fontSize: '14px',
                  minWidth: '200px'
                },
                on: {
                  change: function(event) {
                    self.changeLanguage(event.target.value);
                  }
                }
              }, [
                h('option', {
                  attrs: {
                    value: 'auto'
                  }
                }, self.t('language_auto')),
                h('option', {
                  attrs: {
                    value: 'da'
                  }
                }, self.t('language_danish')),
                h('option', {
                  attrs: {
                    value: 'en'
                  }
                }, self.t('language_english'))
              ]),
              h('div', {
                style: {
                  fontSize: '12px',
                  color: '#1565c0',
                  fontStyle: 'italic'
                }
              }, 'Current: ' + (this.getCurrentLanguage() === 'da' ? 'Dansk 🇩🇰' : 'English 🇺🇸'))
            ])
          ])
        ]);
      },
      
      methods: {
        // Translation helper function with Vue reactivity
        t: function(key) {
          try {
            if (!key) return '';
            
            // Access languageRevision to trigger Vue reactivity when language changes
            var revision = this.languageRevision;
            
            var currentLang = this.getCurrentLanguage();
            
            // Først prøv nuværende sprog
            if (this.translations && this.translations[currentLang] && this.translations[currentLang][key]) {
              return this.translations[currentLang][key];
            }
            
            // Fallback til dansk
            if (this.translations && this.translations['da'] && this.translations['da'][key]) {
              return this.translations['da'][key];
            }
            
            // Fallback til engelsk
            if (this.translations && this.translations['en'] && this.translations['en'][key]) {
              return this.translations['en'][key];
            }
            
            // Sidste fallback til key selv
            return key;
          } catch (error) {
            console.warn('🌐 SPOOLMAN: Translation fejl for key:', key, error);
            return key; // Return key som fallback
          }
        },
        
        // Get current language based on settings
        getCurrentLanguage: function() {
          try {
            if (!this.selectedLanguage || this.selectedLanguage === 'auto') {
              // Auto-detect from browser
              var browserLang = navigator.language || navigator.userLanguage || 'en';
              return browserLang.toLowerCase().startsWith('da') ? 'da' : 'en';
            }
            
            // Explicit language selection - validate it's supported
            if (this.selectedLanguage === 'da' || this.selectedLanguage === 'en') {
              return this.selectedLanguage;
            }
            
            // Fallback to Danish if invalid
            return 'da';
          } catch (error) {
            console.warn('🌐 SPOOLMAN: Language detection fejl:', error);
            return 'da'; // Fallback
          }
        },
        
        // Change language
        changeLanguage: function(newLang) {
          console.log('🌐 SPOOLMAN: Skifter sprog fra', this.selectedLanguage, 'til', newLang);
          
          var oldLang = this.selectedLanguage;
          this.selectedLanguage = newLang;
          localStorage.setItem('spoolman_language', newLang);
          
          // Increment language revision to trigger Vue reactivity for all t() calls
          this.languageRevision++;
          
          // Force immediate re-render
          this.$forceUpdate();
          
          var self = this;
          
          // Show success message after a brief delay to ensure language is switched
          setTimeout(function() {
            var currentLang = self.getCurrentLanguage();
            if (currentLang === 'da') {
              self.successMessage = '✅ Sprog skiftet til Dansk!';
            } else {
              self.successMessage = '✅ Language switched to English!';
            }
            self.$forceUpdate();
            
            // Clear success message after delay
            setTimeout(function() {
              self.successMessage = null;
              self.$forceUpdate();
            }, 4000);
          }, 100);
          
          console.log('✅ SPOOLMAN: Sprog skiftet til', this.getCurrentLanguage(), 'revision:', this.languageRevision);
        },
        
        // Konverter hex farve til emoji
        getColorEmoji: function(hexColor) {
          if (!hexColor) return '⚪'; // Default hvid cirkel
          
          var hex = hexColor.replace('#', '').toLowerCase();
          
          // Direkte hex til emoji mapping
          var emojiMap = {
            // Røde farver
            'ff0000': '🟥', 'dc143c': '🟥', '8b0000': '🟥', 'b22222': '🟥',
            'cd5c5c': '🟥', 'f08080': '🟥', 'fa8072': '🟥', 'e9967a': '🟥',
            
            // Grønne farver  
            '00ff00': '🟩', '008000': '🟩', '228b22': '🟩', '32cd32': '🟩',
            '90ee90': '🟩', '98fb98': '🟩', '00fa9a': '🟩', '00ff7f': '🟩',
            
            // Blå farver
            '0000ff': '🟦', '000080': '🟦', '4169e1': '🟦', '6495ed': '🟦', 
            '87ceeb': '🟦', 'add8e6': '🟦', '87cefa': '🦆', '1e90ff': '🟦',
            
            // Gule farver
            'ffff00': '🟨', 'ffd700': '🟨', 'ffffe0': '🟨', 'fffacd': '🟨',
            'ffefd5': '🟨', 'fff8dc': '🟨', 'f0e68c': '🟨', 'bdb76b': '🟨',
            
            // Orange farver
            'ffa500': '🟧', 'ff8c00': '🟧', 'ff7f50': '🟧', 'ff6347': '🟧',
            'ffd4af': '🟧', 'ffb6c1': '🟧', 'daa520': '🟧',
            
            // Lilla/violet farver
            '800080': '🟪', '9932cc': '🟪', 'ba55d3': '🟪', 'da70d6': '🟪',
            'dda0dd': '🟪', 'ee82ee': '🟪', 'ff00ff': '🟪', 'c71585': '🟪',
            
            // Sorte/grå farver  
            '000000': '⚫', '696969': '⚫', '808080': '⚫', 'a9a9a9': '⚫',
            'd3d3d3': '⚫', 'dcdcdc': '⚫',
            
            // Hvide farver
            'ffffff': '⚪', 'f5f5f5': '⚪', 'f0f8ff': '⚪', 'faf0e6': '⚪',
            
            // Brune farver  
            'a52a2a': '🟫', '8b4513': '🟫', 'cd853f': '🟫', 'daa520': '🟫',
            'd2691e': '🟫', 'bc8f8f': '🟫'
          };
          
          // Direkte match
          if (emojiMap[hex]) {
            return emojiMap[hex];
          }
          
          // Fuzzy match baseret på RGB
          var target = this.hexToRgb(hex);
          if (!target) return '⚪';
          
          var bestEmoji = '⚪';
          var bestDistance = Infinity;
          
          for (var colorHex in emojiMap) {
            var candidate = this.hexToRgb(colorHex);
            if (candidate) {
              var distance = Math.sqrt(
                Math.pow(target.r - candidate.r, 2) +
                Math.pow(target.g - candidate.g, 2) +
                Math.pow(target.b - candidate.b, 2)
              );
              
              if (distance < bestDistance && distance < 60) { // 60 = tolerance
                bestDistance = distance;
                bestEmoji = emojiMap[colorHex];
              }
            }
          }
          
          return bestEmoji;
        },
        
        // Konverter hex farve til menneskeligt læsbart navn
        getColorName: function(hexColor, translateFn) {
          if (!hexColor) return null;
          
          var hex = hexColor.replace('#', '').toLowerCase();
          
          // Use translateFn if provided (from render), otherwise use this.t (from methods)
          var t = translateFn || this.t.bind(this);
          
          // Common farve mapping med oversættelse
          var colorMap = {
            '000000': 'color_sort',
            'ffffff': 'color_hvid',
            'ff0000': 'color_rød',
            '00ff00': 'color_grøn', 
            '0000ff': 'color_blå',
            'ffff00': 'color_gul',
            'ff00ff': 'color_magenta',
            '00ffff': 'color_cyan',
            '800000': 'color_mørkerød',
            '008000': 'color_mørkegrøn',
            '000080': 'color_marineblå',
            '800080': 'color_lilla',
            '808000': 'color_oliven',
            '008080': 'color_teal',
            'c0c0c0': 'color_sølv',
            '808080': 'color_grå',
            'ffa500': 'color_orange',
            'ffc0cb': 'color_pink',
            'add8e6': 'color_lyseblå',
            '90ee90': 'color_lysegrøn',
            'ffffe0': 'color_lysegul',
            'ffd700': 'color_guld',
            'a52a2a': 'color_brun',
            'dda0dd': 'color_plum',
            '20b2aa': 'color_lysehavsgrøn',
            '87ceeb': 'color_himmelblå',
            'f0e68c': 'color_khaki',
            'e6e6fa': 'color_lavendel'
          };
          
          // Eksakt match med oversættelse
          if (colorMap[hex]) {
            return t(colorMap[hex]);
          }
          
          // Fuzzy match baseret på RGB afstand
          var target = this.hexToRgb(hex);
          if (!target) return hexColor.toUpperCase();
          
          var bestMatch = null;
          var bestDistance = Infinity;
          
          for (var colorHex in colorMap) {
            var candidate = this.hexToRgb(colorHex);
            if (candidate) {
              var distance = Math.sqrt(
                Math.pow(target.r - candidate.r, 2) +
                Math.pow(target.g - candidate.g, 2) +
                Math.pow(target.b - candidate.b, 2)
              );
              
              if (distance < bestDistance && distance < 50) { // 50 = tolerance
                bestDistance = distance;
                bestMatch = colorMap[colorHex];
              }
            }
          }
          
          return bestMatch ? t(bestMatch) : hexColor.toUpperCase();
        },
        
        hexToRgb: function(hex) {
          if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          }
          
          var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        },
        testConnection: function(isReconnect) {
          var self = this;
          this.loading = true;
          this.error = null;
          this.successMessage = null;
          
          console.log('🔌 SPOOLMAN: Tester direkte forbindelse til ' + this.spoolmanUrl + (isReconnect ? ' (genindlæsning)' : ''));
          
          // Prøv direkte forbindelse først, fall back til demo mode ved CORS fejl
          var spoolmanApiUrl = this.spoolmanUrl.replace(/\/$/, '') + '/api/v1/spool';
          // Prøv direkte fetch først
          this.attemptDirectConnection(spoolmanApiUrl)
            .then(function(spoolsData) {
              self.handleSuccessfulConnection(spoolsData, false, isReconnect);
            })
            .catch(function(error) {
              console.log('❌ SPOOLMAN: Direct fetch fejlede pga. CORS. RRF proxy ikke implementeret.');
              self.handleConnectionError(error);
            });
        },
        
        attemptDirectConnection: function(url) {
          console.log('🔗 SPOOLMAN: Prøver direkte forbindelse...');
          return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(function(response) {
            if (!response.ok) {
              throw new Error('HTTP ' + response.status + ' - ' + response.statusText);
            }
            return response.json();
          });
        },
        
        attemptRRFProxy: function(url) {
          var self = this;
          console.log('❌ SPOOLMAN: RRF HTTP proxy ikke understøttet');
          
          return new Promise(function(resolve, reject) {
            // RepRapFirmware understøtter ikke direkte HTTP proxy funktionalitet
            // Dette ville kræve en custom løsning eller CORS konfiguration på Spoolman server
            console.log('💡 SPOOLMAN: For at bruge rigtig Spoolman data, skal CORS aktiveres på Spoolman serveren');
            console.log('📖 SPOOLMAN: Alternativt kan du bruge demo mode til at teste funktionaliteten');
            
            reject(new Error('RRF HTTP proxy er ikke implementeret. RepRapFirmware understøtter ikke direkte HTTP requests til eksterne servere. Brug demo mode eller konfigurer CORS på din Spoolman server.'));
          });
        },
        
        handleSuccessfulConnection: function(spoolsData, viaRRF, isReconnect) {
          this.connected = true;
          this.isDemo = false;
          this.showApiConfig = false;
          this.isFirstTimeSetup = false; // Ikke længere første gang
          this.spools = spoolsData || [];
          
          // Gem forbindelses-state (kun hvis ikke genindlæsning)
          if (!isReconnect) {
            this.saveSettings();
          }
          
          console.log('📦 SPOOLMAN: Modtaget spools data:', this.spools);
          
          var method = viaRRF ? 'via RepRapFirmware proxy' : 'direkte';
          this.successMessage = '✅ Forbindelse til Spoolman lykkedes ' + method + '! Fandt ' + this.spools.length + ' spools.';
          console.log('✅ SPOOLMAN: Forbindelse OK ' + method + ' - fandt ' + this.spools.length + ' spools');
          
          this.loading = false;
          
          // Load plugin state fra Spoolman efter successful connection
          var self = this;
          setTimeout(function() {
            self.loadFromSpoolman();
          }, 500);
          
          this.$forceUpdate();
          
          setTimeout(function() {
            self.successMessage = null;
            self.$forceUpdate();
          }, 5000);
        },
        
                    handleConnectionError: function(error) {
              this.connected = false;
              this.spools = [];
              this.loading = false;

              var errorMsg = 'Kunne ikke forbinde til Spoolman på ' + this.spoolmanUrl;
              errorMsg += '\n\n🔧 Løsninger:';
              errorMsg += '\n• Brug demo mode nedenfor til test';
              errorMsg += '\n• Konfigurer CORS på din Spoolman server';
              errorMsg += '\n• Tilføj Access-Control-Allow-Origin: * til Spoolman';
              errorMsg += '\n\nTeknisk fejl: ' + error.message;

              this.error = errorMsg;
              this.showDemoOption = true;
              this.$forceUpdate();

              console.log('❌ SPOOLMAN: Forbindelse fejlede:', error);
            },
        
        tryDemoMode: function() {
          var self = this;
          console.log('🎭 SPOOLMAN: Starter demo mode');
          
          this.connected = true;
          this.isDemo = true;
          this.error = null;
          this.showDemoOption = false;
          this.showApiConfig = false;
          this.spools = [
            {
              id: 1,
              filament: {
                vendor: { name: 'Prusament' },
                material: 'PLA',
                color_hex: '#FF0000'
              },
              remaining_weight: 850,
              initial_weight: 1000
            },
            {
              id: 2,
              filament: {
                vendor: { name: 'eSUN' },
                material: 'PETG',
                color_hex: '#00FF00'
              },
              remaining_weight: 750,
              initial_weight: 1000
            },
            {
              id: 3,
              filament: {
                vendor: { name: 'Hatchbox' },
                material: 'ABS',
                color_hex: '#0000FF'
              },
              remaining_weight: 920,
              initial_weight: 1000
            },
            {
              id: 4,
              filament: {
                vendor: { name: 'Polymaker' },
                material: 'PLA+',
                color_hex: '#FFA500'
              },
              remaining_weight: 1000,
              initial_weight: 1000
            },
            {
              id: 5,
              filament: {
                vendor: { name: 'SUNLU' },
                material: 'SILK PLA',
                color_hex: '#C0C0C0'
              },
              remaining_weight: 650,
              initial_weight: 1000
            }
          ];
          
          this.successMessage = '🎭 Demo mode aktiveret! Du kan nu teste alle funktioner med demo data.';
          
          // Gem demo state
          this.saveSettings();
          
          this.$forceUpdate();
          
          // Auto-hide efter 5 sekunder
          setTimeout(function() {
            self.successMessage = null;
            self.$forceUpdate();
          }, 5000);
        },
        
        selectSpool: function(toolIndex, spoolId) {
          if (spoolId) {
            this.selectedSpools[toolIndex] = this.spools.find(function(s) { return s.id == spoolId; });
          } else {
            this.selectedSpools[toolIndex] = null;
          }
          
          // Sync til Spoolman
          this.saveSettings();
          
          this.$forceUpdate(); // Force re-render
        },
        
        ejectSpool: function(toolIndex) {
          var self = this;
          if (confirm('Er du sikker på at du vil ejecte filamentet fra T' + toolIndex + '?')) {
            // Update consumed filament before ejecting
            // Here you would send data to Spoolman API
            this.selectedSpools.splice(toolIndex, 1, null); // Vue reactive update
            this.consumedFilament[toolIndex] = 0;
            
            // Sync til Spoolman
            this.saveSettings();
            
            this.$forceUpdate(); // Force re-render
          }
        },
        
        // Storage helpers (localStorage + Spoolman API sync)
        saveSettings: function() {
          // Lokalt backup
          localStorage.setItem('spoolman_url', this.spoolmanUrl);
          localStorage.setItem('spoolman_connected', this.connected.toString());
          localStorage.setItem('spoolman_show_api_config', this.showApiConfig.toString());
          localStorage.setItem('spoolman_is_demo', this.isDemo.toString());
          localStorage.setItem('spoolman_first_time', this.isFirstTimeSetup.toString());
          localStorage.setItem('spoolman_language', this.selectedLanguage);
          
          // Sync til Spoolman hvis forbundet (ikke demo mode)
          if (this.connected && !this.isDemo) {
            this.syncToSpoolman();
          }
        },
        
        syncToSpoolman: function() {
          var self = this;
          
          if (!this.connected || this.isDemo || this.spools.length === 0) {
            console.log('🚫 SPOOLMAN: Skipper sync - ikke forbundet eller demo mode');
            return;
          }
          
          var pluginState = {
            selectedSpools: this.selectedSpools.map(function(spool) {
              return spool ? spool.id : null;
            }),
            consumedFilament: this.consumedFilament,
            spoolmanUrl: this.spoolmanUrl, // Gem URL så andre enheder kan auto-forbinde
            lastUpdated: new Date().toISOString()
          };
          
          console.log('📡 SPOOLMAN: Forsøger at synce state:', pluginState);
          
          // Test først med GET request for at se om API virker
          var spoolmanApiUrl = this.spoolmanUrl.replace(/\/$/, '') + '/api/v1/spool/' + this.spools[0].id;
          console.log('🔗 SPOOLMAN: Sync URL:', spoolmanApiUrl);
          
          // Prøv først med localStorage som fallback metode
          var deviceId = 'dwc_' + (Math.random().toString(36).substr(2, 9));
          var storageKey = 'spoolman_plugin_state_' + this.spoolmanUrl.replace(/[^a-zA-Z0-9]/g, '_');
          
          var stateWithDevice = Object.assign({}, pluginState, {
            deviceId: deviceId,
            spoolmanUrl: this.spoolmanUrl
          });
          
          // Gem lokalt først
          localStorage.setItem(storageKey, JSON.stringify(stateWithDevice));
          console.log('💾 SPOOLMAN: State gemt lokalt som fallback');
          
          // Prøv at gemme som custom field hvis muligt (eksperimentelt)
          // I stedet for comment, prøv med en custom property
          fetch(spoolmanApiUrl + '?include_extra_fields=true', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(function(response) {
            console.log('🔍 SPOOLMAN: GET response status:', response.status);
            return response.json();
          })
          .then(function(spoolData) {
            console.log('📦 SPOOLMAN: Spool data modtaget:', spoolData);
            
            // Gem state i comment feltet
            var stateComment = 'DWC_STATE:' + JSON.stringify(pluginState);
            
            return fetch(spoolmanApiUrl, {
              method: 'PATCH',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                comment: stateComment
              })
            });
          })
          .then(function(response) {
            console.log('📡 SPOOLMAN: PATCH response status:', response.status);
            if (response.ok) {
              console.log('✅ SPOOLMAN: Plugin state synced til server via comment');
            } else {
              console.log('❌ SPOOLMAN: PATCH fejlede:', response.status, response.statusText);
            }
          })
          .catch(function(error) {
            console.log('⚠️ SPOOLMAN: Sync fejlede:', error);
            console.log('💾 SPOOLMAN: Bruger kun localStorage som fallback');
          });
        },
        
        loadFromSpoolman: function() {
          var self = this;
          var stateLoaded = false;
          
          console.log('🔍 SPOOLMAN: Prøver at loade state...');
          
          // Prøv først fra Spoolman server comment
          if (this.spools.length > 0 && this.spools[0].comment) {
            try {
              console.log('📝 SPOOLMAN: Tjekker comment fra første spool:', this.spools[0].comment);
              
              var commentMatch = this.spools[0].comment.match(/DWC_STATE:(.+)/);
              if (commentMatch) {
                var pluginState = JSON.parse(commentMatch[1]);
                console.log('📡 SPOOLMAN: Plugin state fundet i server comment:', pluginState);
                
                this.restorePluginState(pluginState);
                stateLoaded = true;
                console.log('✅ SPOOLMAN: Plugin state loaded fra server');
              }
            } catch (error) {
              console.log('⚠️ SPOOLMAN: Kunne ikke parse plugin state fra server comment:', error);
            }
          }
          
          // Fallback til localStorage hvis server ikke havde state
          if (!stateLoaded) {
            console.log('💾 SPOOLMAN: Prøver localStorage fallback...');
            var storageKey = 'spoolman_plugin_state_' + this.spoolmanUrl.replace(/[^a-zA-Z0-9]/g, '_');
            var localState = localStorage.getItem(storageKey);
            
            if (localState) {
              try {
                var pluginState = JSON.parse(localState);
                console.log('💾 SPOOLMAN: Plugin state fundet i localStorage:', pluginState);
                
                this.restorePluginState(pluginState);
                console.log('✅ SPOOLMAN: Plugin state loaded fra localStorage');
              } catch (error) {
                console.log('⚠️ SPOOLMAN: Kunne ikke parse localStorage state:', error);
              }
            } else {
              console.log('📭 SPOOLMAN: Ingen gemt state fundet');
            }
          }
        },
        
        restorePluginState: function(pluginState) {
          var self = this;
          
          // Restore URL hvis vi ikke har en (ny enhed)
          if (pluginState.spoolmanUrl && (!this.spoolmanUrl || this.spoolmanUrl === 'http://192.168.1.100:7913')) {
            this.spoolmanUrl = pluginState.spoolmanUrl;
            console.log('🔗 SPOOLMAN: Restored URL fra server:', this.spoolmanUrl);
            
            // Gem lokalt så det er tilgængeligt næste gang
            localStorage.setItem('spoolman_url', this.spoolmanUrl);
          }
          
          // Restore valgte spools
          if (pluginState.selectedSpools) {
            pluginState.selectedSpools.forEach(function(spoolId, index) {
              if (spoolId) {
                var spool = self.spools.find(function(s) { return s.id === spoolId; });
                if (spool) {
                  self.selectedSpools[index] = spool;
                  console.log('🎯 SPOOLMAN: Restored T' + index + ' til spool ' + spoolId);
                } else {
                  self.selectedSpools[index] = null;
                  console.log('❌ SPOOLMAN: Spool ' + spoolId + ' ikke fundet for T' + index);
                }
              } else {
                self.selectedSpools[index] = null;
              }
            });
          }
          
          // Restore consumed filament
          if (pluginState.consumedFilament) {
            this.consumedFilament = pluginState.consumedFilament;
            console.log('📊 SPOOLMAN: Restored consumed filament:', this.consumedFilament);
          }
          
          this.$forceUpdate();
        },
        
        updateSpoolmanUrl: function(event) {
          this.spoolmanUrl = event.target.value;
          this.saveSettings();
        },
        
        autoConnect: function() {
          var self = this;
          
          console.log('🔄 SPOOLMAN: Auto-connect tjekker - URL:', this.spoolmanUrl, 'Connected:', this.connected, 'Demo:', this.isDemo);
          
          if (this.isDemo) {
            console.log('🎭 SPOOLMAN: Auto-starter demo mode');
            this.tryDemoMode();
          } else if (this.spoolmanUrl && this.connected) {
            console.log('✅ SPOOLMAN: Allerede forbundet til: ' + this.spoolmanUrl);
            // Vi skal hente spools data først, derefter reload state
            console.log('🔄 SPOOLMAN: Genindlæser spools og state fra server...');
            this.testConnection(true); // TRUE = genindlæsning, skal ikke overskrive gemte filament valg
          } else if (this.isFirstTimeSetup || this.spoolmanUrl === 'http://192.168.1.100:7913') {
            // På ny enhed eller default URL - prøv discovery
            console.log('🔍 SPOOLMAN: Starter URL discovery...');
            this.discoverSpoolmanServer();
          } else if (this.spoolmanUrl && !this.connected) {
            // Auto-forbind hvis vi har en URL men ikke er forbundet
            console.log('🔄 SPOOLMAN: Auto-forbinder til gemt URL: ' + this.spoolmanUrl);
            this.showApiConfig = true; // Vis at vi prøver at forbinde
            this.testConnection(false);
          } else {
            console.log('📭 SPOOLMAN: Ingen gemt konfiguration fundet');
          }
        },
        
        discoverSpoolmanServer: function() {
          var self = this;
          
          // Common Spoolman URLs at prøve
          var commonUrls = [
            'http://192.168.86.50:7913',    // Din setup
            'http://192.168.1.100:7913',    // Default
            'http://192.168.0.100:7913',    // Common
            'http://192.168.1.50:7913',     // Alternative
            'http://spoolman.local:7913',   // mDNS
            'http://localhost:7913'         // Local
          ];
          
          this.loading = true;
          this.successMessage = '🔍 Søger efter Spoolman server...';
          console.log('🔍 SPOOLMAN: Prøver ', commonUrls.length, ' mulige URLs');
          
          var tryNextUrl = function(index) {
            if (index >= commonUrls.length) {
              console.log('❌ SPOOLMAN: Ingen server fundet på common URLs');
              self.loading = false;
              self.successMessage = null;
              self.error = 'Kunne ikke auto-finde Spoolman server. Indtast URL manuelt.';
              self.showApiConfig = true;
              self.$forceUpdate();
              return;
            }
            
            var testUrl = commonUrls[index];
            console.log('🔍 SPOOLMAN: Prøver URL ' + (index + 1) + '/' + commonUrls.length + ': ' + testUrl);
            
            var apiUrl = testUrl.replace(/\/$/, '') + '/api/v1/spool?limit=1';
            
            // Quick timeout test
            var controller = new AbortController();
            var timeoutId = setTimeout(function() {
              controller.abort();
            }, 2000); // 2 sekunder timeout
            
            fetch(apiUrl, {
              method: 'GET',
              mode: 'cors',
              headers: {
                'Accept': 'application/json'
              },
              signal: controller.signal
            })
            .then(function(response) {
              clearTimeout(timeoutId);
              if (response.ok) {
                console.log('✅ SPOOLMAN: Fundet server på: ' + testUrl);
                self.spoolmanUrl = testUrl;
                self.loading = false;
                self.successMessage = '🎯 Auto-fundet Spoolman på: ' + testUrl;
                self.saveSettings(); // Gem den fundne URL
                self.testConnection(false); // Forbind for real
              } else {
                console.log('❌ SPOOLMAN: Server på ' + testUrl + ' svarede ' + response.status);
                tryNextUrl(index + 1);
              }
            })
            .catch(function(error) {
              clearTimeout(timeoutId);
              console.log('❌ SPOOLMAN: ' + testUrl + ' fejlede: ' + error.message);
              tryNextUrl(index + 1);
            });
          };
          
          tryNextUrl(0);
        },
        
        disconnect: function() {
          this.connected = false;
          this.isDemo = false;
          this.showApiConfig = false;
          this.spools = [];
          this.selectedSpools = [null, null, null, null];
          this.error = null;
          this.successMessage = null;
          
          // Ryd localStorage
          localStorage.removeItem('spoolman_connected');
          localStorage.removeItem('spoolman_is_demo');
          localStorage.removeItem('spoolman_show_api_config');
          // Gem URL så den ikke går tabt
          localStorage.setItem('spoolman_url', this.spoolmanUrl);
          
          this.$forceUpdate();
        },
        
        // === FILAMENT TRACKING METHODS ===
        
        startTracking: function() {
          var self = this;
          
          if (this.tracking) {
            console.log('⚠️ TRACKING: Allerede i gang');
            return;
          }
          
          console.log('▶️ TRACKING: Starter filament tracking...');
          
          // Initialize tracking
          this.tracking = true;
          this.trackingStartTime = Date.now();
          this.lastExtruderPositions = [0, 0, 0, 0];
          
          // Get initial positions
          this.getRRFExtruderPositions().then(function(positions) {
            if (positions) {
              self.lastExtruderPositions = positions;
              console.log('📍 TRACKING: Initial positions:', positions);
            }
          });
          
          // Start polling RRF every 10 seconds
          this.trackingInterval = setInterval(function() {
            self.trackFilamentUsage();
          }, 10000);
          
          this.successMessage = '▶️ Filament tracking startet! Positions bliver tracked hver 10. sekund.';
          setTimeout(function() {
            self.successMessage = null;
            self.$forceUpdate();
          }, 3000);
          
          this.$forceUpdate();
        },
        
        stopTracking: function() {
          var self = this;
          
          console.log('⏹️ TRACKING: Stopper filament tracking...');
          
          this.tracking = false;
          this.trackingStartTime = null;
          
          if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
          }
          
          this.successMessage = '⏹️ Filament tracking stoppet. Manuel opdatering eller sync til Spoolman er stadig muligt.';
          setTimeout(function() {
            self.successMessage = null;
            self.$forceUpdate();
          }, 3000);
          
          this.$forceUpdate();
        },
        
        getRRFExtruderPositions: function() {
          var self = this;
          
          // Prøv at hente fra RRF machine model
          return fetch(this.rrfUrl + '/rr_model?key=move')
            .then(function(response) {
              if (!response.ok) {
                throw new Error('RRF HTTP ' + response.status);
              }
              return response.json();
            })
            .then(function(data) {
              if (data.result && data.result.extruders) {
                var positions = data.result.extruders.map(function(extruder) {
                  return extruder.position || 0;
                });
                console.log('📊 TRACKING: RRF positions:', positions);
                return positions;
              } else {
                throw new Error('Invalid RRF response format');
              }
            })
            .catch(function(error) {
              console.log('❌ TRACKING: Kunne ikke hente RRF positions:', error.message);
              // Fallback til mocked data for demo
              return [0, 0, 0, 0];
            });
        },
        
        trackFilamentUsage: function() {
          var self = this;
          
          this.getRRFExtruderPositions().then(function(currentPositions) {
            if (!currentPositions) return;
            
            // Calculate usage since last check
            for (var i = 0; i < 4; i++) {
              var usage = currentPositions[i] - self.lastExtruderPositions[i];
              if (usage > 0) {
                self.consumedFilament[i] += usage;
                console.log('📊 TRACKING: T' + i + ' brugte ' + usage.toFixed(2) + 'mm (total: ' + self.consumedFilament[i].toFixed(2) + 'mm)');
              }
            }
            
            // Update last positions
            self.lastExtruderPositions = currentPositions;
            
            // Save locally
            self.saveSettings();
            self.$forceUpdate();
          });
        },
        
        showManualUpdate: function() {
          var self = this;
          
          for (var i = 0; i < 4; i++) {
            if (this.selectedSpools[i]) {
              var usage = prompt(
                'Indtast brugt filament for T' + i + ' (' + this.selectedSpools[i].filament.vendor.name + '):\n' +
                'Aktuelt registreret: ' + this.consumedFilament[i].toFixed(2) + 'mm',
                this.consumedFilament[i].toString()
              );
              
              if (usage !== null && !isNaN(parseFloat(usage))) {
                this.consumedFilament[i] = parseFloat(usage);
                console.log('✏️ MANUAL: T' + i + ' opdateret til ' + usage + 'mm');
              }
            }
          }
          
          this.saveSettings();
          this.$forceUpdate();
          
          this.successMessage = '✏️ Manuel opdatering gennemført!';
          setTimeout(function() {
            self.successMessage = null;
            self.$forceUpdate();
          }, 3000);
        },
        
        updateSpoolmanUsage: function() {
          var self = this;
          
          if (!this.connected || this.isDemo) {
            this.error = 'Kan kun synce til Spoolman når forbundet til rigtig server';
            setTimeout(function() {
              self.error = null;
              self.$forceUpdate();
            }, 3000);
            return;
          }
          
          var promises = [];
          var updatedCount = 0;
          
          for (var i = 0; i < 4; i++) {
            if (this.selectedSpools[i] && this.consumedFilament[i] > 0) {
              var spoolId = this.selectedSpools[i].id;
              var usage = this.consumedFilament[i];
              
              console.log('📡 SYNC: Opdaterer spool ' + spoolId + ' med ' + usage + 'mm forbrug');
              
              var promise = fetch(this.spoolmanUrl.replace(/\/$/, '') + '/api/v1/spool/' + spoolId + '/use', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  use_length: usage
                })
              })
              .then(function(response) {
                if (response.ok) {
                  updatedCount++;
                  console.log('✅ SYNC: Spool opdateret i Spoolman');
                } else {
                  console.log('❌ SYNC: Fejl ved opdatering:', response.status);
                }
              })
              .catch(function(error) {
                console.log('❌ SYNC: Network fejl:', error);
              });
              
              promises.push(promise);
            }
          }
          
          if (promises.length === 0) {
            this.error = 'Intet filament forbrug at synce';
            setTimeout(function() {
              self.error = null;
              self.$forceUpdate();
            }, 3000);
            return;
          }
          
          Promise.all(promises).then(function() {
            self.successMessage = '📡 Sync til Spoolman gennemført! ' + updatedCount + ' spools opdateret.';
            
            // Reset consumed filament after successful sync
            for (var i = 0; i < 4; i++) {
              if (self.selectedSpools[i] && self.consumedFilament[i] > 0) {
                self.consumedFilament[i] = 0;
              }
            }
            
            self.saveSettings();
            self.$forceUpdate();
            
            setTimeout(function() {
              self.successMessage = null;
              self.$forceUpdate();
            }, 5000);
          });
        }
      },
      
      mounted: function() {
        console.log('✅ SPOOLMAN: Full plugin mounted successfully!');
        console.log('🔧 SPOOLMAN: Klar til at vælge filament kilde - demo data eller Spoolman server');
        console.log('🌐 SPOOLMAN: Aktive sprog:', this.getCurrentLanguage());
        
        // Clean up any old language change flags (from previous versions)
        localStorage.removeItem('spoolman_language_changing');
        
        // Auto-forbind til sidste kendte konfiguration
        var self = this;
        setTimeout(function() {
          self.autoConnect();
        }, 100); // Lille delay for at lade UI loade først
      }
    };
    
    // Export og navigation registrering
    Object.defineProperty(n, "default", {
      enumerable: true,
      get: function() { 
        return SpoolmanComponent; 
      }
    });
    
    var routes = t("./src/routes/index.ts");
    (0,routes.registerRoute)(SpoolmanComponent, {
      Plugins: {
        Spoolman: {
          icon: "mdi-spool",
          caption: "Spoolman Integration",
          path: "/Job/Spoolman"
        }
      }
    });
  }
}]);