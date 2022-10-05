import { test, expect } from '@playwright/test';

for (let i = 0; i < 10; i++) {
  test.only(`basic test numer ${i}`, async ({ page }) => {
    await page.waitForTimeout(1 * 750);
    expect(true).toBe(true);
  });
};