
import { test, expect } from '@playwright/test';

test('TC-01: Verify mobile products can be sorted by name', async ({ page }) => {

  // Opening the TechPanda website
  await page.goto('http://live.techpanda.org/');

  // Checking heading home page text
  await expect(page.getByText('THIS IS DEMO SITE')).toBeVisible();

  // Verify the home page title
  await expect(page).toHaveTitle(/Home page/);

  // Click the MOBILE menu
  await page.getByRole('link', { name: 'MOBILE' }).click();

  // Checking the MOBILE page heading
  await expect(
    page.getByRole('heading', { name: 'MOBILE' })
  ).toBeVisible();

  // Locate the product sorting dropdown
  const sortDropdown = page.locator('select[title="Sort By"]').first();

  // Checking the dropdown is visible
  await expect(sortDropdown).toBeVisible();

  // Select Name and wait for sorting navigation
  await Promise.all([
    page.waitForNavigation(),
    sortDropdown.selectOption({ label: 'Name' }),
  ]);

  // Reading the product names after navigation
  const productNames = await page
    .locator('.products-grid .product-name a')
    .allTextContents();

  // Print the product names
  console.log('Product names:', productNames);

  // Checking products are sorted alphabetically
  const sortedProductNames = [...productNames].sort((a, b) =>
    a.localeCompare(b)
  );

  expect(productNames).toEqual(sortedProductNames);

  // Checking exactly three products are displayed
  expect(productNames).toHaveLength(3);

});
