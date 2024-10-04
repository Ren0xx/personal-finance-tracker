import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test("user has successfully logged in", async ({ page }) => {
  await page.locator("body").click();
  await page.getByRole("button").click();
});

test("creation and deletion of transaction", async ({ page }) => {
  await expect.soft(page.getByLabel("Close Tour")).toBeVisible();
  if (await page.getByLabel("Close Tour").isVisible()) {
    await page.getByLabel("Close Tour").click();
  }
  await page.goto("/transactions");
  await page.getByRole("button", { name: "Add New Transaction" }).click();
  await expect(
    page.getByRole("heading", { name: "Add Transaction" }),
  ).toBeVisible();
  await page.getByRole("combobox").click();
  await page.getByLabel("fff").click();
  await page.getByPlaceholder("Amount").click();
  await page.getByPlaceholder("Description (optional)").click();
  await page
    .getByPlaceholder("Description (optional)")
    .fill("Test transaction");
  await page.getByRole("button", { name: "Create Transaction" }).click();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("menuitem", { name: "Delete transaction" }).click();
});

test("deletion of transaction", async ({ page }) => {
  await expect.soft(page.getByLabel("Close Tour")).toBeVisible();
  await page.goto('http://localhost:3000/');
});
