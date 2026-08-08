import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  timeout: 90_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "https://www.hernaholding.com",
    trace: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
