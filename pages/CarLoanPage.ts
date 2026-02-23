import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CarLoanPage extends BasePage {
  readonly loanAmountTextbox: Locator;
  readonly loanTenureTextbox: Locator;
  readonly interestRateTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.loanAmountTextbox = page.getByRole('textbox', { name: 'Loan Amount' });
    this.loanTenureTextbox = page.getByRole('textbox', { name: 'Laon Tenure' });
    this.interestRateTextbox = page.getByRole('textbox', { name: 'Interest Rate' });
  }

  async enterLoanDetails(amount: string, tenure: string, rate: string) {
    await this.loanAmountTextbox.click();
    await this.loanAmountTextbox.fill(amount);
    await this.loanTenureTextbox.fill(tenure);
    await this.interestRateTextbox.fill(rate);
  }

  // Functional Validations

  async validateEMI(expected: string) {
    await this.page.locator('#carLoanNewPersonalLoanEmiResult').waitFor({timeout: 5000});
    await expect(this.page.locator('#carLoanNewPersonalLoanEmiResult')).toHaveText(expected);
  }

  async validateTotalAmount(expected: string) {
    await expect(this.page.locator('#carLoanNewPFixedTotalAmount'))
      .toHaveText(expected);
  }

  async validateFixedEMI(expected: string) {
    await expect(this.page.locator('#carLoanNewFixedEmiResult'))
      .toHaveText(expected);
  }

  async validatePrincipal(expected: string) {
    await expect(this.page.locator('#carLoanNewFixedPrincipalAmt'))
      .toHaveText(expected);
  }

  // UI Validations 

  async validateTitle() {
 await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page)
      .toHaveTitle('Car Loan EMI Calculator - Calculate EMI for New Car Loan | HDFC Bank');
  }

  async validateLoanAmountEditable() {
    this.loanAmountTextbox.waitFor({timeout:5000})
    await expect(this.loanAmountTextbox).toBeEditable();
  }

  async validateLoanTenureEditable() {
    this.loanTenureTextbox.waitFor({timeout:5000})
    await expect(this.loanTenureTextbox).toBeEditable();
  }

  async validateInterestRateEditable() {
   // this.page.waitForTimeout(5000);
    this.interestRateTextbox.waitFor({timeout:5000});
    await expect(this.interestRateTextbox).toBeEditable();
  }

  async validateInvalidLoanAmountTooltip(expected: string) {
    await expect(this.page.locator('.tooltip').first())
      .toHaveText(expected);
  }

  async validateApplyNowNavigation(context: any) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.getByRole('link', { name: 'Apply Now Car Loan EMI' }).click()
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('HDFC Bank Auto Loans');
  }
}