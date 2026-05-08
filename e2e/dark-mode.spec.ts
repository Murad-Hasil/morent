import { test, expect } from "@playwright/test";

async function getDarkModeToggle(page: import("@playwright/test").Page) {
  // On mobile the hamburger must be opened first to access the toggle
  const hamburger = page.getByRole("button", { name: "Open menu" });
  if (await hamburger.isVisible()) await hamburger.click();
  return page.getByRole("button", { name: "Toggle dark mode" }).last();
}

test.describe("Dark Mode", () => {
  test("toggles dark mode on click", async ({ page }) => {
    await page.goto("/");
    const toggle = await getDarkModeToggle(page);
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("dark mode persists on reload", async ({ page }) => {
    await page.goto("/");
    const toggle = await getDarkModeToggle(page);
    await toggle.click();
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("toggles back to light mode", async ({ page }) => {
    await page.goto("/");
    const toggle = await getDarkModeToggle(page);
    await toggle.click();
    const toggle2 = await getDarkModeToggle(page);
    await toggle2.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
