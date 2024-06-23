module.exports = ({ env }) => ({
  proxy: true,
  url: env("APP_URL"), // Sets the public URL of the application.
  // host: env("HOST", "0.0.0.0"),
  // port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
