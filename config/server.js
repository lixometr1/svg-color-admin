module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: "http://" + env("APP_DOMAIN", "0.0.0.0") + ":" + env.int("PORT", 1337),
  admin: {
    auth: {
      autoOpen: false,
      secret: env("ADMIN_JWT_SECRET", "3882a38451307b3b693454de23a190cc"),
    },
  },
});
