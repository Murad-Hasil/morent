import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates to cars listing page", async ({ page }) => {
    await page.goto("/cars");
    await expect(page).toHaveTitle(/Browse Cars/);
    await expect(page.locator("aside")).toBeVisible();
  });

  test("navigates to car detail page", async ({ page }) => {
    await page.goto("/cars/detail");
    await expect(page).toHaveTitle(/— Morent/);
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("navigates to checkout page", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page).toHaveTitle(/Checkout/);
  });

  test("navigates to dashboard page", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test("Rent Now button navigates to checkout", async ({ page }) => {
    await page.goto("/");
    const rentButton = page.getByRole("button", { name: "Rent Now" }).first();
    await rentButton.click();
    await expect(page).toHaveURL("/checkout");
  });
});
