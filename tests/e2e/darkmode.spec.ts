import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle is present in header', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode" i]')
    await expect(toggle).toBeVisible()
  })

  test('dark mode is enabled by default', async ({ page }) => {
    await page.goto('/')

    // The HTML element should have the 'dark' class by default
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })

  test('toggling dark mode adds and removes dark class', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const toggle = page.locator('[aria-label*="mode" i]')

    // Default: dark mode is on (class contains 'dark')
    await expect(html).toHaveClass(/dark/)

    // Toggle off
    await toggle.click()
    await expect(html).not.toHaveClass(/dark/)

    // Toggle back on
    await toggle.click()
    await expect(html).toHaveClass(/dark/)
  })

  test('dark mode toggle does not crash the page', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode" i]')

    // Toggle off
    await toggle.click()
    // Verify header still visible
    await expect(page.locator('header')).toBeVisible()

    // Toggle back on
    await toggle.click()
    await expect(page.locator('header')).toBeVisible()
  })

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const toggle = page.locator('[aria-label*="mode" i]')

    // Toggle to light mode
    await toggle.click()
    await expect(html).not.toHaveClass(/dark/)

    // Navigate to another page
    await page.goto('/products')
    await expect(html).not.toHaveClass(/dark/)

    // Navigate to about
    await page.goto('/about')
    await expect(html).not.toHaveClass(/dark/)

    // Toggle back to dark
    await toggle.click()
    await expect(html).toHaveClass(/dark/)
  })

  test('page remains functional after rapid toggles', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode" i]')

    // Rapid toggle 5 times
    await toggle.click()
    await toggle.click()
    await toggle.click()
    await toggle.click()
    await toggle.click()

    // Header should still be visible
    await expect(page.locator('header')).toBeVisible()
  })
})
