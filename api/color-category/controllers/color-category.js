"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async all() {
    const entities = await strapi.services["color-category"].find(
      {
        _sort: "displayOrder:asc",
      },
      []
    );
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["pattern-category"] })
    );
  },
};
