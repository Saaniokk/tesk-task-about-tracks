import { MainPage } from "../../pages/main.page";
import { Urls } from "../../utils/urls.enum";
import { test } from "../fixtures/base.fixture";


export async function openLink(mainPage: MainPage): Promise<void> {
  return test.step("Login with credentials", async () => {
    // Go to Login page and log in
    await mainPage.goto(Urls.MainPage, { waitUntil: "load" });
  });
}
