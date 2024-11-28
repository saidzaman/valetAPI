const { defineConfig } = require("cypress");

async function setupNodeEvents(on, config) {
    on('task', {
        log(message) {
            console.log(message)
            return null
        },
    })

  };

module.exports = defineConfig({
  setupNodeEvents,
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents
  },
});
