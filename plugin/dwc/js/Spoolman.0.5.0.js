(self["webpackChunkduetwebcontrol"] = self["webpackChunkduetwebcontrol"] || []).push([["Spoolman"], {
  "./src/plugins/Spoolman/index.js": function (_module, exports, require) {
    "use strict";
    require.r(exports);

    var SpoolmanComponent = {
      name: "Spoolman",
      data: function () {
        return {
          version: "0.5.0",
          serverUrl: "",
          manualServerUrl: "",
          connected: false,
          loading: false,
          error: "",
          success: "",
          settings: {
            language: "auto",
            spoolmanBaseUrl: "",
            hotendCount: 1,
            toolSpoolMap: {},
            rrf: {
              baseUrl: "",
              password: "",
              pollIntervalMs: 4000
            }
          },
          resolvedLanguage: "en",
          messages: {},
          trackingRunning: false,
          trackingState: {
            totalTrackedMmByTool: {},
            lastPollAt: null,
            lastError: null
          },
          spools: []
        };
      },
      methods: {
        apiUrl: function (path) {
          return this.serverUrl.replace(/\/+$/, "") + path;
        },
        browserLocale: function () {
          return navigator.language || "en";
        },
        toolList: function () {
          var count = Number(this.settings.hotendCount) || 1;
          var tools = [];
          for (var i = 0; i < count; i += 1) {
            tools.push("T" + i);
          }
          return tools;
        },
        setToast: function (type, message) {
          if (type === "error") {
            this.error = message;
            this.success = "";
          } else {
            this.success = message;
            this.error = "";
          }
        },
        clearToast: function () {
          this.error = "";
          this.success = "";
        },
        discoverServer: async function () {
          var currentHost = window.location.hostname;
          var candidates = [];

          if (this.manualServerUrl) {
            candidates.push(this.manualServerUrl);
          }
          if (currentHost) {
            candidates.push(window.location.protocol + "//" + currentHost + ":9377");
          }
          candidates.push("http://spoolman-bridge.local:9377");

          for (var i = 0; i < candidates.length; i += 1) {
            var base = candidates[i].replace(/\/+$/, "");
            try {
              var response = await fetch(base + "/api/v1/health", { method: "GET" });
              if (response.ok) {
                this.serverUrl = base;
                this.connected = true;
                this.setToast("success", "Connected to bridge server");
                return true;
              }
            } catch (_error) {
              // Continue with the next candidate.
            }
          }
          this.connected = false;
          this.setToast("error", "Could not discover server. Enter URL manually.");
          return false;
        },
        loadSettings: async function () {
          this.loading = true;
          this.clearToast();
          try {
            var response = await fetch(this.apiUrl("/api/v1/settings?browserLocale=" + encodeURIComponent(this.browserLocale())));
            if (!response.ok) {
              throw new Error("Failed to load settings");
            }
            var payload = await response.json();
            this.settings = payload.settings;
            this.resolvedLanguage = payload.resolvedLanguage;
            this.messages = payload.messages || {};
          } catch (error) {
            this.setToast("error", error.message);
          } finally {
            this.loading = false;
          }
        },
        saveSettings: async function () {
          this.loading = true;
          this.clearToast();
          try {
            var response = await fetch(this.apiUrl("/api/v1/settings"), {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.settings)
            });
            if (!response.ok) {
              var failedPayload = await response.json();
              throw new Error(failedPayload.error || "Failed to save settings");
            }
            var payload = await response.json();
            this.settings = payload.settings;
            this.setToast("success", "Settings saved on server");
          } catch (error) {
            this.setToast("error", error.message);
          } finally {
            this.loading = false;
          }
        },
        loadStatus: async function () {
          try {
            var response = await fetch(this.apiUrl("/api/v1/status"));
            if (!response.ok) {
              throw new Error("Failed to load status");
            }
            var payload = await response.json();
            this.trackingRunning = payload.trackingRunning;
            this.trackingState = payload.tracking;
          } catch (error) {
            this.setToast("error", error.message);
          }
        },
        loadSpools: async function () {
          try {
            var response = await fetch(this.apiUrl("/api/v1/spools"));
            if (!response.ok) {
              var body = await response.json();
              throw new Error(body.error || "Failed to load spools");
            }
            var payload = await response.json();
            this.spools = payload.spools || [];
          } catch (error) {
            this.setToast("error", error.message);
          }
        },
        setToolSpool: async function (toolId, spoolId) {
          try {
            if (!spoolId) {
              await fetch(this.apiUrl("/api/v1/tools/" + toolId + "/spool"), { method: "DELETE" });
            } else {
              await fetch(this.apiUrl("/api/v1/tools/" + toolId + "/spool"), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ spoolId: Number(spoolId) })
              });
            }
            await this.loadSettings();
          } catch (error) {
            this.setToast("error", error.message);
          }
        },
        setTracking: async function (run) {
          try {
            var path = run ? "/api/v1/tracking/start" : "/api/v1/tracking/stop";
            var response = await fetch(this.apiUrl(path), { method: "POST" });
            if (!response.ok) {
              throw new Error("Failed to change tracking state");
            }
            await this.loadStatus();
          } catch (error) {
            this.setToast("error", error.message);
          }
        },
        pollNow: async function () {
          try {
            await fetch(this.apiUrl("/api/v1/tracking/poll-now"), { method: "POST" });
            await this.loadStatus();
          } catch (error) {
            this.setToast("error", error.message);
          }
        }
      },
      mounted: function () {
        var self = this;
        this.discoverServer().then(function (found) {
          if (!found) {
            return;
          }
          Promise.all([self.loadSettings(), self.loadStatus()]).then(function () {
            self.loadSpools();
          });
        });
      },
      render: function (h) {
        var self = this;
        var tools = this.toolList();
        var toolRows = tools.map(function (toolId) {
          return h("div", { class: "spoolman-row" }, [
            h("label", { class: "spoolman-label" }, toolId),
            h("select", {
              class: "spoolman-input",
              domProps: { value: self.settings.toolSpoolMap[toolId] || "" },
              on: {
                change: function (event) {
                  self.setToolSpool(toolId, event.target.value);
                }
              }
            }, [
              h("option", { domProps: { value: "" } }, "Not assigned")
            ].concat(self.spools.map(function (spool) {
              var label = "#" + spool.id + " - " + (spool.filament?.name || "Unknown");
              return h("option", { domProps: { value: spool.id } }, label);
            })))
          ]);
        });

        return h("div", { class: "spoolman-container" }, [
          h("h2", "Spoolman Integration 0.5.0"),
          h("p", "Tracking runs on server side. Browser can be closed safely."),

          this.error ? h("div", { class: "spoolman-error" }, this.error) : null,
          this.success ? h("div", { class: "spoolman-success" }, this.success) : null,

          h("div", { class: "spoolman-card" }, [
            h("h3", "Bridge server"),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "Manual server URL"),
              h("input", {
                class: "spoolman-input",
                attrs: { type: "text", placeholder: "http://spoolman-bridge.local:9377" },
                domProps: { value: this.manualServerUrl },
                on: {
                  input: function (event) {
                    self.manualServerUrl = event.target.value;
                  }
                }
              })
            ]),
            h("div", { class: "spoolman-row" }, [
              h("button", { class: "spoolman-button", on: { click: this.discoverServer } }, "Discover server"),
              h("span", { class: "spoolman-status" }, this.connected ? "Connected: " + this.serverUrl : "Not connected")
            ])
          ]),

          this.connected ? h("div", { class: "spoolman-card" }, [
            h("h3", "Settings"),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "Language"),
              h("select", {
                class: "spoolman-input",
                domProps: { value: this.settings.language },
                on: {
                  change: function (event) {
                    self.settings.language = event.target.value;
                  }
                }
              }, [
                h("option", { domProps: { value: "auto" } }, "Auto"),
                h("option", { domProps: { value: "en" } }, "English"),
                h("option", { domProps: { value: "da" } }, "Dansk")
              ]),
              h("span", { class: "spoolman-muted" }, "Resolved: " + this.resolvedLanguage)
            ]),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "Spoolman URL"),
              h("input", {
                class: "spoolman-input",
                attrs: { type: "text", placeholder: "http://spoolman:7912" },
                domProps: { value: this.settings.spoolmanBaseUrl || "" },
                on: { input: function (event) { self.settings.spoolmanBaseUrl = event.target.value; } }
              })
            ]),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "RRF URL"),
              h("input", {
                class: "spoolman-input",
                attrs: { type: "text", placeholder: "http://duet" },
                domProps: { value: this.settings.rrf.baseUrl || "" },
                on: { input: function (event) { self.settings.rrf.baseUrl = event.target.value; } }
              })
            ]),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "RRF password"),
              h("input", {
                class: "spoolman-input",
                attrs: { type: "password", placeholder: "Optional" },
                domProps: { value: this.settings.rrf.password || "" },
                on: { input: function (event) { self.settings.rrf.password = event.target.value; } }
              })
            ]),
            h("div", { class: "spoolman-row" }, [
              h("label", { class: "spoolman-label" }, "Hotend count"),
              h("input", {
                class: "spoolman-input",
                attrs: { type: "number", min: 1, max: 16 },
                domProps: { value: this.settings.hotendCount || 1 },
                on: { input: function (event) { self.settings.hotendCount = Number(event.target.value) || 1; } }
              })
            ]),
            h("div", { class: "spoolman-row" }, [
              h("button", { class: "spoolman-button", on: { click: this.saveSettings } }, this.loading ? "Saving..." : "Save settings"),
              h("button", { class: "spoolman-button", on: { click: this.loadSpools } }, "Refresh spools")
            ])
          ]) : null,

          this.connected ? h("div", { class: "spoolman-card" }, [
            h("h3", "Tool to spool mapping"),
            toolRows
          ]) : null,

          this.connected ? h("div", { class: "spoolman-card" }, [
            h("h3", "Tracking"),
            h("p", this.trackingRunning ? "Tracking is running on the server." : "Tracking is stopped."),
            h("p", "Last poll: " + (this.trackingState.lastPollAt || "Never")),
            this.trackingState.lastError ? h("p", { class: "spoolman-error" }, this.trackingState.lastError) : null,
            h("div", { class: "spoolman-row" }, [
              h("button", { class: "spoolman-button", on: { click: function () { self.setTracking(true); } } }, "Start tracking"),
              h("button", { class: "spoolman-button", on: { click: function () { self.setTracking(false); } } }, "Stop tracking"),
              h("button", { class: "spoolman-button", on: { click: this.pollNow } }, "Poll now")
            ])
          ]) : null
        ]);
      }
    };

    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function () {
        return SpoolmanComponent;
      }
    });

    var routes = require("./src/routes/index.ts");
    (0, routes.registerRoute)(SpoolmanComponent, {
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
