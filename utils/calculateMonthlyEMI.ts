import { expect, Page } from '@playwright/test';

/**
   * Calculates monthly EMI manually using the EMI formula
   * EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
   * where P = Principal loan amount, r = Monthly interest rate, n = Number of months
   */
  export function calculateMonthlyEMI(loanAmount: number, tenureYears: number, interestRatePercent: number): number {
    const principal = loanAmount;
    const monthlyInterestRate = interestRatePercent / (12 * 100);
    const numberOfMonths = tenureYears * 12;
    
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
    
    const emi = numerator / denominator;
    return Math.round(emi);
  }
