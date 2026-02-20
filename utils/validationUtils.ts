import { expect, Locator } from '@playwright/test';

export async function validateTooltip(locator: Locator, expectedText: string) {
  await expect(locator).toHaveText(expectedText);
}
