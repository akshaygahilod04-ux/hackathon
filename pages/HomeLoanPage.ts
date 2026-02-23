import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { promises } from 'node:dns';


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

 
  // Functional Validations


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


  // Negative Validations


  async validateInvalidLoanAmountTooltip(expected: string) {
    await expect(this.page.locator('.tooltip').first())
      .toHaveText(expected);
  }

  async validateInvalidTenureTooltip(expected: string) {
    await this.page.locator('.tooltip').nth(1).waitFor({timeout:5000});
    await expect(this.page.locator('.tooltip').nth(1))
      .toHaveText(expected);
  }

  async validateInvalidInterestRateTooltip(expected: string) {
    await this.page.locator('.tooltip').last().waitFor({timeout: 5000});
    await expect(this.page.locator('.tooltip').last())
      .toHaveText(expected);
  }

  // UI Validations

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

  // // async validateInterestRateEditable() {
  // //   await expect(this.interestRateTextbox).toBeVisible();
  // //   await expect(this.interestRateTextbox).toBeEditable();
  // // }


}
