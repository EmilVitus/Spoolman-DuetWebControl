import test from "node:test";
import assert from "node:assert/strict";
import { resolveLanguage, getMessages } from "../src/lib/i18n.js";

test("resolveLanguage uses explicit setting", () => {
  assert.equal(resolveLanguage("da", "en-US"), "da");
  assert.equal(resolveLanguage("en", "da-DK"), "en");
});

test("resolveLanguage uses browser locale when setting is auto", () => {
  assert.equal(resolveLanguage("auto", "da-DK"), "da");
  assert.equal(resolveLanguage("auto", "en-US"), "en");
  assert.equal(resolveLanguage("auto", ""), "en");
});

test("messages fallback to english", () => {
  assert.equal(getMessages("da").connectedPrefix, "Forbundet");
  assert.equal(getMessages("x").connectedPrefix, "Connected");
});
