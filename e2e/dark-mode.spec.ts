import { test, expect } from "@playwright/test";

test.describe("Dark Mode", () => {
  test("toggles dark mode on click", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle dark mode" }).first();
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("dark mode persists on reload", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle dark mode" }).first();
    await toggle.click();
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("toggles back to light mode", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle dark mode" }).first();
    await toggle.click();
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
