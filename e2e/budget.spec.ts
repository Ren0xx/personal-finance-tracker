import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.afterEach(async ({ page }) => {
  await page.close();
});
test("creation and deletion of budget", async ({ page }) => {
  //----
  await page.getByLabel("Close Tour").click();
  await page.getByRole("link", { name: "Budgets" }).click();

  //Creating budgets
  await page.getByRole("button", { name: "Add Budget" }).click();
  await page.getByPlaceholder("Budget name").click();
  await page.getByPlaceholder("Budget name").fill("Test Budget");
  await page.getByPlaceholder("Description (optional)").click();
  await page.getByPlaceholder("Description (optional)").fill("desc test");
  await page.getByPlaceholder("Amount").click({
    clickCount: 3,
  });
  await page.getByPlaceholder("Amount").fill("15000");
  await page.getByRole("button", { name: "Oct 04, 2024 - Oct 04," }).click();
  await page
    .getByLabel("November")
    .getByRole("gridcell", { name: "5", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await page.getByRole("combobox").click();
  await page.getByLabel("fff").click();
  await page.getByRole("button", { name: "Create Budget" }).click();

  //Budget got right value
  await expect(page.getByRole("application").locator("path")).toBeVisible();
  await expect(page.getByRole("application")).toContainText("15000");

  //Deletion
  await page.getByRole("button", { name: "Delete Budget" }).click();
  await page.getByRole("combobox").click();
  await page.getByLabel("Test Budget").click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.getByRole("application").locator("path")).not.toBeVisible();
});
