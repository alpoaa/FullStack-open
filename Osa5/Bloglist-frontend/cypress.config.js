import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:5173'
  },
  env: {
    BACKEND: 'http://localhost:3003/api'
  },
  defaultCommandTimeout: 10000
})