"use strict";

/**
 * import.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const importPatterns = require("./import/import-patterns");
const importColorCategory = require("./import/import-color-category");
const importPatternCategory = require("./import/import-pattern-category");
const importColors = require("./import/import-colors");
module.exports = {
  importPatterns,
  importColorCategory,
  importPatternCategory,
  importColors,
};
