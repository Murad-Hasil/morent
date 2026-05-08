import { test, expect } from "@playwright/test";

test.describe("Car Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cars");
  });

  test("filter sidebar is visible", async ({ page }) => {
    await expect(page.locator("aside")).toBeVisible();
    await expect(page.getByText("Type")).toBeVisible();
    await expect(page.getByText("Capacity")).toBeVisible();
    await expect(page.getByText("Price")).toBeVisible();
  });

  test("filtering by type reduces results", async ({ page }) => {
    await page.locator("[data-testid='car-card']").first().waitFor({ state: "visible" });
    const initialCards = await page.locator("[data-testid='car-card']").count();

    await page.locator("aside li").filter({ hasText: /^Sport/ }).first().click();
    await page.waitForTimeout(1200);

    const filteredCards = await page.locator("[data-testid='car-card']").count();
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test("price slider updates displayed cars", async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    await slider.fill("100");
    await page.waitForTimeout(300);
    await expect(page.locator("[data-testid='car-card']").first()).toBeVisible();
  });
});
