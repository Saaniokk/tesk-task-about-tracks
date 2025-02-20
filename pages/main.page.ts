import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class MainPage extends BasePage {

  // MainPage locators
  public searchField: Locator = this._page.locator("//input[@class='MuiInputBase-input MuiOutlinedInput-input css-1pk1fka']");
  public trackSummerBreeze: Locator = this._page.locator("//p[contains(text(), 'Summer Breeze')]");
  public trackAutumnLeaves: Locator = this._page.locator("//p[contains(text(), 'Autumn Leaves')]");
  public trackWinterWinds: Locator = this._page.locator("//p[contains(text(), 'Winter Winds')]");
  public trackSpringDance: Locator = this._page.locator("//p[contains(text(), 'Spring Dance')]");
  public trackRainyMood: Locator = this._page.locator("//p[contains(text(), 'Rainy Mood')]");
  public plusButton: Locator = this._page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-colorPrimary css-hktlod']");
  public yourPlaylistBlock: Locator = this._page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-sg94qv']");
  public trackInYourPlaylist: (trackName: string) => Locator = (trackName: string) => this._page.locator(`//div[@class='MuiGrid-root MuiGrid-container css-adtkzx']//p[contains(text(), '${trackName}') and contains(@class, 'MuiTypography-body1')]`);
  public playListDuration: Locator = this._page.locator('#playlist-duration')


  // MainPage methods
  public async fillSearchField(track_name: string): Promise<void> {
    await this.searchField.fill(track_name);
  }

  // Method to convert duration in "mm:ss" to seconds
  public convertDurationToSeconds(duration: string): number {
    const [minutes, seconds] = duration.split(':').map(Number);
    return (minutes * 60) + seconds;
  }
}
