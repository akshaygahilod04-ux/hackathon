import { test } from '@playwright/test';
import { HomeLoanPage } from '../pages/HomeLoanPage';
import { navigateToCalculator } from '../utils/navigationUtils';
import homeLoanData from '../data/homeLoanData.json';


test.describe('Home Loan EMI Validations', () => {

  let homeLoanPage: HomeLoanPage;

  test.beforeEach(async ({ page }) => {
    await navigateToCalculator(page, 'Home Loan EMI Calculator');
    homeLoanPage = new HomeLoanPage(page);
  
  });

  // Functional Tests

  test('@Smoke Validate EMI', async () => {
    await homeLoanPage.enterLoanDetails(
      homeLoanData.valid.loanAmount,
      homeLoanData.valid.tenure,
      homeLoanData.valid.interestRate
    );
    await homeLoanPage.validateEMI(homeLoanData.valid.expected.emi);

  });

  test('@Regression Validate Total Amount', async () => {
    await homeLoanPage.enterLoanDetails(
      homeLoanData.valid.loanAmount,
      homeLoanData.valid.tenure,
      homeLoanData.valid.interestRate
    );
    await homeLoanPage.validateTotalAmount(homeLoanData.valid.expected.total);
  });

  test('@Regression Validate Fixed EMI', async () => {
    await homeLoanPage.enterLoanDetails(
      homeLoanData.valid.loanAmount,
      homeLoanData.valid.tenure,
      homeLoanData.valid.interestRate
    );
    await homeLoanPage.validateFixedEMI(homeLoanData.valid.expected.fixedEmi);
  });

  test('@Regression Validate Principal', async () => {
    await homeLoanPage.enterLoanDetails(
      homeLoanData.valid.loanAmount,
      homeLoanData.valid.tenure,
      homeLoanData.valid.interestRate
    );
    await homeLoanPage.validatePrincipal(homeLoanData.valid.expected.principal);
  });

  // Negative Tests

  test('@Sanity Invalid Loan Amount Tooltip', async () => {
    await homeLoanPage.loanAmountTextbox.fill(homeLoanData.invalid.loanAmount);
    await homeLoanPage.validateInvalidLoanAmountTooltip(
      ' Please enter a value between 1,00,000 and 10,00,00,000.'
    );
  });

  test('@Sanity Invalid Loan Tenure Tooltip', async () => {
    await homeLoanPage.loanTenureTextbox.fill(homeLoanData.invalid.tenure);
    await homeLoanPage.validateInvalidTenureTooltip(
      'Please enter a value between 1 and 50.'
    );
  });

  test('@Sanity Invalid Interest Rate Tooltip', async () => {
    await homeLoanPage.interestRateTextbox.fill(homeLoanData.invalid.interestRate);
    await homeLoanPage.validateInvalidInterestRateTooltip(
      'Please enter a value between 0.5 and 15.'
    );
  });
 
  // UI Tests
  test('@Smoke Validate Page Title', async () => {
    await homeLoanPage.validateTitle();
  });

})