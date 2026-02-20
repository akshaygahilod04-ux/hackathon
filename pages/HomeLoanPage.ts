

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { calculateMonthlyEMI } from '../utils/calculateMonthlyEMI';

export class HomeLoanPage extends BasePage {
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
    //this.page.waitForLoadState('domcontentloaded');
    await this.loanAmountTextbox.click();
    await this.loanAmountTextbox.fill(amount);
    await this.loanTenureTextbox.fill(tenure);
    await this.interestRateTextbox.fill(rate);
  }

  // =========================
  // Functional Validations
  // =========================

  async validateEMI(expected: string) {
    await expect(this.page.locator('#homeLoanEmiResult'))
      .toHaveText(expected);
  }

  async validateTotalAmount(expected: string) {
    await expect(this.page.locator('#homeLoanFixedTotalAmount'))
      .toHaveText(expected);
  }

  async validateFixedEMI(expected: string) {
    await expect(this.page.locator('#homeLoanFixedEmiResult'))
      .toHaveText(expected);
  }

  async validatePrincipal(expected: string) {
    await expect(this.page.locator('#homeLoanFixedPrincipalAmt'))
      .toHaveText(expected);
  }

  // =========================
  // Negative Validations
  // =========================

  async validateInvalidLoanAmountTooltip(expected: string) {
    await expect(this.page.locator('.tooltip').first())
      .toHaveText(expected);
  }

  async validateInvalidTenureTooltip(expected: string) {
    await expect(this.page.locator('.tooltip').nth(1))
      .toHaveText(expected);
  }

  async validateInvalidInterestRateTooltip(expected: string) {
    await expect(this.page.locator('.tooltip').last())
      .toHaveText(expected);
  }

  // =========================
  // UI Validations
  // =========================

  async validateTitle() {
    await expect(this.page)
      .toHaveTitle('Home Loan EMI Calculator | EMI Calculator | Calculate EMI for Housing Loan');
  }

  // async validateLoanAmountEditable() {
  //   this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.loanAmountTextbox).toBeEditable();
  // }

  // async validateLoanTenureEditable() {
  //   //this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.loanTenureTextbox).toBeEditable();
  // }

  // async validateInterestRateEditable() {
  //   await expect(this.interestRateTextbox).toBeVisible();
  //   await expect(this.interestRateTextbox).toBeEditable();
  // }

  async extractTable() {
    await this.page.waitForSelector('#text-2126abd99d table thead tr th');
    const headers = await this.page.locator('#text-2126abd99d table thead tr th').allTextContents()
    const cleanedHeaders = headers.map(h => h.trim()).filter(h=>h.length > 0)
    const rows = await this.page.locator('#text-2126abd99d table tbody tr').all()
    const data: any[] =[]
    console.log('Headers:', cleanedHeaders.length)
    console.log("Rows:", rows.length)
    for(let i = 0; i < rows.length; i++){
      const cells = await rows[i].locator('td').allTextContents()
      const rowData: any = {}
      cleanedHeaders.forEach((header, index) =>{
        rowData[header] = cells[index]?.trim()
      })
      data.push(rowData)
    }
    return data
  }

  /**
   * Verifies the monthly EMI displayed on the website matches the manually calculated EMI
   * Uses loan amount: 2000000, tenure: 20 years, interest rate: 9%
   */
  async verifyMonthlyEMI() {
    const loanAmount = 2000000;
    const tenureYears = 20;
    const interestRate = 9;

    // Enter loan details on the website
    await this.enterLoanDetails(
      loanAmount.toString(),
      tenureYears.toString(),
      interestRate.toString()
    );

    // Calculate EMI manually
    const calculatedEMI = calculateMonthlyEMI(loanAmount, tenureYears, interestRate);
    console.log(`Manually Calculated EMI: ₹${calculatedEMI}`);

    // Get EMI from website
    const websiteEMI = await this.page.locator('#homeLoanEmiResult').textContent();
    const websiteEMIValue = parseInt(websiteEMI?.replace(/[₹,]/g, '') || '0');
    console.log(`Website EMI: ₹${websiteEMIValue}`);

    // Verify both values match
    expect(websiteEMIValue).toBe(calculatedEMI);
    console.log(`EMI Verification: ${websiteEMIValue === calculatedEMI ? 'PASSED' : 'FAILED'}`);

    return {
      calculatedEMI,
      websiteEMI: websiteEMIValue,
      isMatching: websiteEMIValue === calculatedEMI
    };
  }

}
