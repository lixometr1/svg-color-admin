"use strict";

/**
 * import.js controller
 *
 * @description: A set of functions called "actions" of the `import` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },
  upload: async (ctx) => {
    const files = ctx.request.files;
    const { pattern, color, colorCategory, patternCategory } = files;
    const path = pattern.path;
    console.log(pattern. color, colorCategory, patternCategory);
    if (colorCategory) {
      await strapi.plugins.import.services.import.importColorCategory(
        colorCategory.path
      );
    }
    if (patternCategory) {
      await strapi.plugins.import.services.import.importPatternCategory(
        patternCategory.path
      );
    }
    if (pattern) {
      await strapi.plugins.import.services.import.importPatterns(pattern.path);
    }
    if (color) {
      await strapi.plugins.import.services.import.importColors(color.path);
    }
    return { ok: true };
  },
};
