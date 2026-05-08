import { test, expect } from "@playwright/test";

test.describe("Checkout Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/checkout");
  });

  test("shows billing info section", async ({ page }) => {
    await expect(page.getByText("Billing Info").first()).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Rent Now/i });
    await submitBtn.click();
    const errors = page.locator("p.text-red-500, [role='alert']");
    await expect(errors.first()).toBeVisible();
  });

  test("accepts valid billing info", async ({ page }) => {
    await page.getByLabel("Name").fill("John Doe");
    await page.getByLabel("Phone Number").fill("+1 555 123 4567");
    await page.getByLabel("Address").fill("123 Main St");
    await page.getByLabel("Town / City").fill("New York");
    await page.getByLabel("Name").blur();
    const errors = page.locator(".text-red-500");
    await expect(errors).toHaveCount(0);
  });

  test("payment method selection works", async ({ page }) => {
    await expect(page.getByText("Credit Card")).toBeVisible();
    await expect(page.locator('input[placeholder="1234 5678 9012 3456"]')).toBeVisible();
    const paypalBtn = page.getByRole("button", { name: /paypal/i });
    await paypalBtn.click();
    await expect(page.locator('input[placeholder="1234 5678 9012 3456"]')).not.toBeVisible();
  });
});
