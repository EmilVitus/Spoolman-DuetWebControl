import { createRrfClient } from "../lib/rrf-client.js";
import { createSpoolmanClient } from "../lib/spoolman-client.js";

function toolKey(toolIndex) {
  return `T${toolIndex}`;
}

export function createTracker({ getSettings, saveSettings, getTrackingState, saveTrackingState }) {
  let intervalHandle = null;
  let running = false;

  async function pollOnce() {
    const settings = getSettings();
    const trackingState = getTrackingState();

    if (!trackingState.trackingEnabled) {
      return;
    }
    if (!settings.spoolmanBaseUrl || !settings.rrf.baseUrl) {
      return;
    }

    const rrf = createRrfClient(settings.rrf);
    const spoolman = createSpoolmanClient(settings.spoolmanBaseUrl);
    const model = await rrf.fetchMoveModel();
    const positions = model.extruderPositions;
    if (!positions.length) {
      return;
    }
    if ((Number(settings.hotendCount) || 0) !== positions.length) {
      await saveSettings({
        ...settings,
        hotendCount: positions.length
      });
    }

    const previous = trackingState.lastExtruderPositions;
    const nextTotals = { ...trackingState.totalTrackedMmByTool };

    for (let i = 0; i < positions.length; i += 1) {
      const current = Number(positions[i]) || 0;
      const last = Number(previous[i] ?? current);
      const delta = current - last;
      if (delta <= 0) {
        continue;
      }

      const assignedSpoolId = Number(settings.toolSpoolMap[toolKey(i)]);
      if (assignedSpoolId > 0) {
        await spoolman.useSpoolLengthMm(assignedSpoolId, delta);
      }

      const key = toolKey(i);
      nextTotals[key] = (Number(nextTotals[key]) || 0) + delta;
    }

    await saveTrackingState({
      ...trackingState,
      lastExtruderPositions: positions,
      totalTrackedMmByTool: nextTotals,
      lastPollAt: new Date().toISOString(),
      lastError: null
    });
  }

  async function safePoll() {
    try {
      await pollOnce();
    } catch (error) {
      const state = getTrackingState();
      await saveTrackingState({
        ...state,
        lastError: error.message,
        lastPollAt: new Date().toISOString()
      });
    }
  }

  function start() {
    if (running) {
      return;
    }
    running = true;

    const pollIntervalMs = Math.max(1000, Number(getSettings().rrf.pollIntervalMs) || 4000);
    intervalHandle = setInterval(() => {
      void safePoll();
    }, pollIntervalMs);
    void safePoll();
  }

  function stop() {
    running = false;
    if (intervalHandle) {
      clearInterval(intervalHandle);
      intervalHandle = null;
    }
  }

  function isRunning() {
    return running;
  }

  return {
    start,
    stop,
    isRunning,
    pollNow: safePoll
  };
}
