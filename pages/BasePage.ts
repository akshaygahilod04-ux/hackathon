import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async clickLinkByName(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  async fillTextbox(name: string, value: string) {
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
