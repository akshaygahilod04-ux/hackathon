import { test } from '@playwright/test';
import { CarLoanPage } from '../pages/CarLoanPage';
import { navigateToCalculator } from '../utils/navigationUtils';
import carLoanData from '../data/carLoanData.json';

test.describe('Car Loan EMI Validations', () => {

  let carLoanPage: CarLoanPage;

  test.beforeEach(async ({ page }) => {
    await navigateToCalculator(page, 'Car Loan EMI - New Calculator');
    carLoanPage = new CarLoanPage(page);
    
  });

  // =========================
  // Functional Tests
  // =========================

  test('@Smoke Validate EMI', async () => {
    await carLoanPage.enterLoanDetails(
      carLoanData.valid.loanAmount,
      carLoanData.valid.tenure,
      carLoanData.valid.interestRate
    );
    await carLoanPage.validateEMI(carLoanData.valid.expected.emi);
  });

  test('@Regression Validate Total Amount', async () => {
    await carLoanPage.enterLoanDetails(
      carLoanData.valid.loanAmount,
      carLoanData.valid.tenure,
      carLoanData.valid.interestRate
    );
    await carLoanPage.validateTotalAmount(carLoanData.valid.expected.total);
  });

  test('@Regression Validate Fixed EMI', async () => {
    await carLoanPage.enterLoanDetails(
      carLoanData.valid.loanAmount,
      carLoanData.valid.tenure,
      carLoanData.valid.interestRate
    );
    await carLoanPage.validateFixedEMI(carLoanData.valid.expected.fixedEmi);
  });

  test('@Regression Validate Principal', async () => {
    await carLoanPage.enterLoanDetails(
      carLoanData.valid.loanAmount,
      carLoanData.valid.tenure,
      carLoanData.valid.interestRate
    );
    await carLoanPage.validatePrincipal(carLoanData.valid.expected.principal);
  });

  // =========================
  // Negative Test
  // =========================

  test('@Sanity Invalid Loan Amount Tooltip', async () => {
    await carLoanPage.loanAmountTextbox.fill(carLoanData.invalid.loanAmount);
    await carLoanPage.validateInvalidLoanAmountTooltip(
      "Please enter a value between 1,00,000 and 19,00,000."
    );
  });

  // =========================
  // UI Tests
  // =========================

  test('@Smoke Validate Page Title', async () => {
    await carLoanPage.validateTitle();
  });

  test('@Smoke Validate Loan Amount Editable', async () => {
    await carLoanPage.validateLoanAmountEditable();
  });

  test('@Smoke Validate Loan Tenure Editable', async () => {
    await carLoanPage.validateLoanTenureEditable();
  });

  test('@Smoke Validate Interest Rate Editable', async () => {
    await carLoanPage.validateInterestRateEditable();
  });

  test('@Sanity Validate Apply Now Redirection', async ({ context }) => {
    await carLoanPage.validateApplyNowNavigation(context);
  });

});