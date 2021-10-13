"use strict";

/**
 * import.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
const fs = require("fs");
module.exports = {
  async importPatterns(path) {
    const fileData = fs.readFileSync(path);
    const fileString = fileData.toString();

    console.log("read", fileData);
  },
  importColorCategory(path) {},
  importPatternCategory(path) {},
  importColors(path) {},
};
