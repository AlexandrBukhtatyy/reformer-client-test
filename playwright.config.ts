import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const PORT = 5175;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* HTML-отчёт + список; видео/трейс каждого теста прикладываются. */
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    /* Запись прогона: видео и трейс (для просмотра успешного прогона). */
    video: 'on',
    trace: 'on',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      /* slowMo — чтобы прогон не «пролетал» и был виден на видео. */
      use: { ...devices['Desktop Chrome'], launchOptions: { slowMo: 300 } },
    },
  ],

  /* Автозапуск dev-сервера перед тестами. */
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
