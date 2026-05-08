import { test, expect } from "@playwright/test";

test.describe("Favorites", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("toggling favorite shows toast notification", async ({ page }) => {
    const heartBtn = page.getByRole("button", { name: /Add .* to favorites/ }).first();
    await heartBtn.click();
    await expect(page.getByText("Added to favorites")).toBeVisible();
  });

  test("favorite count updates in navbar", async ({ page }) => {
    const heartBtn = page.getByRole("button", { name: /Add .* to favorites/ }).first();
    await heartBtn.click();
    await page.waitForTimeout(500);
    // On mobile open hamburger to see the badge
    const hamburger = page.getByRole("button", { name: "Open menu" });
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(200);
    }
    await expect(page.locator('[data-testid="fav-badge"]').filter({ hasText: "1" }).last()).toBeVisible();
  });

  test("unfavoriting shows removal toast", async ({ page }) => {
    const heartBtn = page.getByRole("button", { name: /Add .* to favorites/ }).first();
    await heartBtn.click();
    await page.waitForTimeout(500);
    const removeBtn = page.getByRole("button", { name: /Remove .* from favorites/ }).first();
    await removeBtn.click();
    await expect(page.getByText("Removed from favorites")).toBeVisible();
  });
});
