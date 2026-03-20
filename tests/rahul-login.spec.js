const { test, expect } = require('@playwright/test');

test.describe('Rahul Shetty Academy - Login page', () => {
  const url = 'https://rahulshettyacademy.com/locatorspractice/';

  test('Page loads and basic elements are visible', async ({ page }) => {
    await page.goto(url);

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

    // Username + Password fields
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();

    // Sign In button
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('Invalid login shows an error message', async ({ page }) => {
    await page.goto(url);

    // Fill wrong creds
    await page.getByPlaceholder('Username').fill('wronguser');
    await page.getByPlaceholder('Password').fill('wrongpass');

    // Optional: checkboxes (if you want)
    await page.getByLabel('Remember my username').check();

    // Click Sign In
    await page.getByRole('button', { name: /sign in/i }).click();

    // Verify error (site shows a red message on failure)
    // We keep it flexible with regex in case wording changes.
    await expect(page.locator('p.error')).toBeVisible();
    await expect(page.locator('p.error')).toContainText(/incorrect|invalid|wrong/i);
  });

  test('Valid login (if you have correct creds) leads to success', async ({ page }) => {
    await page.goto(url);

    // TODO: replace with real creds if you have them
    const username = 'rahulshettyacademy';
    const password = 'learning';

    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);

    await page.getByRole('button', { name: /sign in/i }).click();

    // On success, there is typically a message or a logout button.
    // Use a strong assertion that matches what you see after login.
    await expect(page.locator('text=You are successfully logged in')).toBeVisible();
    await expect(page.getByRole('button', { name: /log out/i })).toBeVisible();
  });
});
