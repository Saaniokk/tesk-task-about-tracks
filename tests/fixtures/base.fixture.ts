import { test as baseTest } from "@playwright/test";

import { BasePage } from "../../pages/base.page";
import { MainPage } from "../../pages/main.page";

export type BaseTestFixture = {
  basePage: BasePage;
  mainPage: MainPage;
};

export const test = baseTest.extend<BaseTestFixture>({
  basePage: [
    async ({ page }, use): Promise<void> => {
      await use(new BasePage(page));
      await page.close();
    },
    { scope: "test" },
  ],
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
    await page.close();
  },
});
