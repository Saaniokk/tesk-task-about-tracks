import { test } from "./fixtures/base.fixture.ts";
import { openLink } from "./steps/sharedSteps.step.ts";
import { expect } from "@playwright/test";

test.describe("Flow for create your own unique playlist", () => {
  test.beforeEach(async ({ mainPage }) => {
    await openLink(mainPage);
  });

  test("Search Functionality", async ({ mainPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "1" });

    // Array of tracks with names and locators
    const tracksToCheck = [
      { name: "Summer Breeze", locator: mainPage.trackSummerBreeze },
      { name: "Autumn Leaves", locator: mainPage.trackAutumnLeaves },
      { name: "Winter Winds", locator: mainPage.trackWinterWinds },
      { name: "Spring Dance", locator: mainPage.trackSpringDance },
      { name: "Rainy Mood", locator: mainPage.trackRainyMood }
    ];

    for (const track of tracksToCheck) {
      // Enter the track name in the search field
      await mainPage.fillSearchField(track.name);

      // Checking that only this track is displayed
      await expect.soft(track.locator).toBeVisible();

      // Checking that other tracks are hidden
      for (const otherTrack of tracksToCheck) {
        if (otherTrack.name !== track.name) {
          await expect(otherTrack.locator).not.toBeVisible();
        }
      }

      // Clearing the search field before the next check
      await mainPage.searchField.fill('');
    }
  });

  test("Add Track Using + Button", async ({ mainPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "2" });

    // Array of track names
    const trackNames = ["Summer Breeze", "Autumn Leaves", "Winter Winds", "Spring Dance", "Rainy Mood"];

    for (let i = 0; i < trackNames.length; i++) {
      const trackName = trackNames[i];

      // Press “+” for adding track
      await mainPage.plusButton.nth(i).click();

      // Waiting for the “Your Playlist” block to appear
      await expect.soft(mainPage.yourPlaylistBlock).toBeVisible();

      // Check that the track has appeared in the “Your Playlist” list
      const addedTrack = mainPage.trackInYourPlaylist(trackName).nth(1);
      await expect(addedTrack).toBeVisible();
    }
  });

  test("Verify Total Duration of the Playlist in Seconds", async ({ mainPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "3" });

    // Array of track names
    const trackNames = ["Summer Breeze", "Autumn Leaves", "Winter Winds", "Spring Dance", "Rainy Mood"];
    // Array of track Durations
    const trackDurations = ["03:35", "03:15", "03:20", "04:00", "03:00"];

    for (let i = 0; i < trackNames.length; i++) {

      await mainPage.plusButton.nth(i).click();

      
    }
    // Total Duration in second counted on UI
    const totalDurationByCode = await mainPage.playListDuration.innerText();
    // Retrieve the displayed total duration and check for equality
    const expectedTotalDuration = trackDurations.map(duration => mainPage.convertDurationToSeconds(duration)).reduce((total, seconds) => total + seconds)
    await expect(Number(totalDurationByCode)).toEqual(expectedTotalDuration);
  })
});
