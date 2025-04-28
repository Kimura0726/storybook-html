// playwright-storybook.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./src",
  testMatch: "**/*.spec.ts",
  webServer: {
    command: "npm run storybook",
    url: "http://localhost:6006",
    timeout: 120000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:6006",
  },
};

export default config;

// テスト実行用コマンド
// npx playwright test --config=playwright-storybook.config.ts
