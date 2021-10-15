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
    try {
      const files = ctx.request.files;
      const { pattern, color, colorCategory, patternCategory } = files;
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
        await strapi.plugins.import.services.import.importPatterns(
          pattern.path
        );
      }
      if (color) {
        await strapi.plugins.import.services.import.importColors(color.path);
      }
      return { ok: true };
    } catch (err) {
      console.log(err)
      ctx.status = 400;
      return {
        message: err.message,
        status: 400
      };
      // return ctx.status(400).send(err.message)
      // return err.message;
    }
  },
};
