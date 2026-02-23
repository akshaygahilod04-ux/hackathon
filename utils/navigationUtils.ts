import { Page } from '@playwright/test';

export async function navigateToCalculator(page: Page, calculatorName: string) {
  await page.goto('https://www.hdfc.bank.in/');
  await page.waitForTimeout(15000);
  await page.getByRole('link', { name: 'Discover Products ' }).click();
  await page.locator('#desktop-header').getByText('Calculator', { exact: true }).click();
  await page.getByRole('link', { name: calculatorName }).first().click();
}
