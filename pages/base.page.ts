import { Page } from "@playwright/test";
import { Response } from "@playwright/test";
import { GotoOptions, BasicWait } from "../utils/global.types";

export class BasePage {
  public readonly _page: Page;

  public constructor(_page: Page) {
    this._page = _page;
  }

  public async goto(
    url: string,
    options: GotoOptions,
  ): Promise<Response | null> {
    return this._page.goto(url, options);
  }

  public async waitForLoadStage(
    option: BasicWait = "domcontentloaded",
  ): Promise<void> {
    await this._page.waitForLoadState(option);
  }

  public async url(): Promise<string> {
    return this._page.url();
  }
}
