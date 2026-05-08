import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders navbar with logo", async ({ page }) => {
    await expect(page.locator("nav").getByText("MORENT")).toBeVisible();
  });

  test("renders hero banners", async ({ page }) => {
    await expect(page.getByText("The Best Platform for Car Rental")).toBeVisible();
    await expect(page.getByText("Easy way to rent a car at a low price")).toBeVisible();
  });

  test("renders popular cars section", async ({ page }) => {
    await expect(page.getByText("Popular Car")).toBeVisible();
    const cards = page.locator("[data-testid='car-card']");
    await expect(cards.first()).toBeVisible();
  });

  test("renders recommendation cars section", async ({ page }) => {
    await expect(page.getByText("Recommendation Car")).toBeVisible();
  });

  test("renders footer", async ({ page }) => {
    await expect(page.getByText("MORENT").last()).toBeVisible();
  });
});
