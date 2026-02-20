// import { expect, Locator, Page } from '@playwright/test';
// import { BasePage } from './BasePage';

// export class CarLoanPage extends BasePage {
//   readonly loanAmountTextbox: Locator;
//   readonly loanTenureTextbox: Locator;
//   readonly interestRateTextbox: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.loanAmountTextbox = page.getByRole('textbox', { name: 'Loan Amount' });
//     this.loanTenureTextbox = page.getByRole('textbox', { name: 'Laon Tenure' });
//     this.interestRateTextbox = page.getByRole('textbox', { name: 'Interest Rate' });
//   }

//   async enterLoanDetails(amount: string, tenure: string, rate: string) {
//     await this.loanAmountTextbox.click();
//     await this.loanAmountTextbox.fill(amount);
//     await this.loanTenureTextbox.fill(tenure);
//     await this.interestRateTextbox.fill(rate);
//   }

//   async validateResults(expected: { emi: string; total: string; fixedEmi: string; principal: string }) {
//     await expect(this.page.locator('#carLoanNewPersonalLoanEmiResult')).toHaveText(expected.emi);
//     await expect(this.page.locator('#carLoanNewPFixedTotalAmount')).toHaveText(expected.total);
//     await expect(this.page.locator('#carLoanNewFixedEmiResult')).toHaveText(expected.fixedEmi);
//     await expect(this.page.locator('#carLoanNewFixedPrincipalAmt')).toHaveText(expected.principal);
//   }

// async validateUIElements() {
//   // Title validation
//   await expect(this.page).toHaveTitle('Car Loan EMI Calculator - Calculate EMI for New Car Loan | HDFC Bank');

//   // Car loan title visible
//   await expect(this.page.locator('span[data-labeltext="Car Loan EMI Calculator"]')).toBeVisible();

//   // Radio button validations
//   await expect(this.page.getByText('New Car', { exact: true })).toBeChecked();
//   await expect(this.page.getByText('Pre-owned Car', { exact: true })).toBeEnabled();

//   // Textbox validations
//   await expect(this.loanAmountTextbox).toBeEditable();
//   await expect(this.loanTenureTextbox).toBeEditable();
//   await expect(this.interestRateTextbox).toBeEditable();

//   // Sliders
//   const amtSlider = this.page.locator('div[name="loan_range_slider"]');
//   await expect(amtSlider).toHaveAttribute('min', '1,00,000');
//   await expect(amtSlider).toHaveAttribute('max', '19,00,000');

//   const tenureSlider = this.page.locator('div[name="loan_tenure_slider"]');
//   await expect(tenureSlider).toHaveAttribute('min', '1');
//   await expect(tenureSlider).toHaveAttribute('max', '8');

//   const rateSlider = this.page.locator('div[name="interest_rate_slider"]');
//   await expect(rateSlider).toHaveAttribute('min', '7');
//   await expect(rateSlider).toHaveAttribute('max', '15');

//   // Call button validation
//   const callButton = this.page.getByTitle('Call on 18001600');
//   await expect(callButton).toBeVisible();
//   await expect(callButton).toBeEnabled();
// }
// }




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

  // =========================
  // Functional Validations
  // =========================

  async validateEMI(expected: string) {
    await expect(this.page.locator('#carLoanNewPersonalLoanEmiResult'))
      .toHaveText(expected);
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

  // =========================
  // UI Validations
  // =========================

  async validateTitle() {
    await expect(this.page)
      .toHaveTitle('Car Loan EMI Calculator - Calculate EMI for New Car Loan | HDFC Bank');
  }

  async validateLoanAmountEditable() {
    await expect(this.loanAmountTextbox).toBeEditable();
  }

  async validateLoanTenureEditable() {
    await expect(this.loanTenureTextbox).toBeEditable();
  }

  async validateInterestRateEditable() {
    //this.page.waitForTimeout(5000);
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