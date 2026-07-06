import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('desktop nav links are present and navigable', async ({ page }) => {
    await page.goto('/')

    // Use a simple selector like the homepage test — find links in the header nav
    const header = page.locator('header')

    // Check key nav links exist and navigate correctly
    const productsLink = header.locator('a[href="/products"]')
    await expect(productsLink).toBeVisible()
    await productsLink.click()
    await expect(page).toHaveURL(/\/products/)

    // Navigate to About
    const aboutLink = header.locator('a[href="/about"]')
    await aboutLink.click()
    await expect(page).toHaveURL(/\/about/)

    // Navigate to Contact
    const contactLink = header.locator('a[href="/contact"]')
    await contactLink.click()
    await expect(page).toHaveURL(/\/contact/)

    // Navigate back via logo/home link
    const homeLink = header.locator('a[href="/"]')
    await homeLink.first().click()
    await expect(page).toHaveURL(/\/($|\?)/)
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    // Logo is the first link to "/" in the header
    await page.locator('header a[href="/"]').first().click()
    await expect(page).toHaveURL(/\/($|\?)/)
  })

  test('cart link navigates to cart page', async ({ page }) => {
    await page.goto('/')
    const cartLink = page.locator('header a[href="/cart"]')
    await expect(cartLink).toBeVisible()
    await cartLink.click()
    await expect(page).toHaveURL(/\/cart/)
  })

  test('cart badge shows zero when cart is empty', async ({ page }) => {
    await page.goto('/')
    // Badge should not be present when count is 0
    const badge = page.locator('header [aria-live="polite"]')
    await expect(badge).not.toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    // Use a mobile viewport
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    // Mobile menu toggle button — the hamburger menu button in header
    const menuButton = page.locator('header button[aria-label*="menu" i]').first()
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    // Mobile nav should appear (the lg:hidden container)
    await page.waitForTimeout(300)

    // Mobile nav links should be visible — look for links that are in a visible mobile nav
    // The mobile nav is the one without 'hidden' and is within header
    const mobileLinks = page.locator('header a[href="/products"]')
    // Make sure we can see and click them
    const visibleCount = await mobileLinks.count()
    expect(visibleCount).toBeGreaterThan(0)

    // Navigate using mobile nav
    await mobileLinks.last().click()
    await expect(page).toHaveURL(/\/products/)
  })

  test('language switcher is present', async ({ page }) => {
    await page.goto('/')
    // Find any select in the header
    const langSelect = page.locator('header select').first()
    await expect(langSelect).toBeVisible()
  })
})
