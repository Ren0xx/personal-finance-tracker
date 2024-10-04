import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.afterEach(async ({ page }) => {
  await page.close();
});
test("creation and deletion of category", async ({ page }) => {
  if (await page.getByLabel("Close Tour").isVisible()) {
    await page.getByLabel("Close Tour").click();
  }
  await page.getByRole("link", { name: "Categories" }).click();
  await page.getByRole("button", { name: "Add Category" }).click();
  await page.getByPlaceholder("Category name").fill("test");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Delete Category" }).click();
  await page.getByRole("combobox").click();
  await page.getByLabel("test").click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
