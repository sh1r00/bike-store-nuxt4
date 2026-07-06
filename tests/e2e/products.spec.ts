import { test, expect } from '@playwright/test'

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
    // Ensure page is loaded
    await expect(page.locator('h1')).toBeVisible()
  })

  test('product grid renders with items', async ({ page }) => {
    // Product cards use aria-label with "View details for"
    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
    // The bike store has 12 products; all should render when no filters applied
    expect(count).toBe(12)
  })

  test('product cards show essential info', async ({ page }) => {
    const firstCard = page.locator('a[aria-label*="View details for"]').first()

    // Should show product name (h3 element)
    await expect(firstCard.locator('h3')).toBeVisible()

    // Should show price with $ sign
    await expect(firstCard.locator('text=/\\$[\\d,]+/')).toBeVisible()

    // Should show rating
    await expect(firstCard.locator('text=/\\d\\.\\d/')).toBeVisible()
  })

  test('category filter filters products', async ({ page }) => {
    // Find the filter sidebar
    const filtersPanel = page.locator('#filters-panel')

    // Select Mountain category — the radio has aria-label matching the category name
    const mountainRadio = filtersPanel.locator('input[aria-label*="Mountain" i]')
    await mountainRadio.check({ force: true })

    // Result count text should update
    await expect(page.locator('text=/\\d+ bikes found/')).toBeVisible()

    // Product cards should now be fewer than 12
    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(12)
  })

  test('brand filter filters products', async ({ page }) => {
    const filtersPanel = page.locator('#filters-panel')

    // Select RidgeLine brand — radio has aria-label matching brand name
    const brandRadio = filtersPanel.locator('input[aria-label="RidgeLine"]')
    await brandRadio.check({ force: true })

    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(12)
  })

  test('price range slider is present', async ({ page }) => {
    const filtersPanel = page.locator('#filters-panel')
    const priceSlider = filtersPanel.locator('input[type="range"]')
    await expect(priceSlider).toBeVisible()

    const maxVal = await priceSlider.getAttribute('max')
    expect(Number(maxVal)).toBeGreaterThan(0)
  })

  test('clear filters resets all filters', async ({ page }) => {
    const filtersPanel = page.locator('#filters-panel')

    // Apply a category filter first
    const mountainRadio = filtersPanel.locator('input[aria-label*="Mountain" i]')
    await mountainRadio.check({ force: true })
    await page.waitForTimeout(300)

    // Click clear filters
    const clearBtn = filtersPanel.locator('button[aria-label*="Clear" i]')
    await clearBtn.click()

    // Should be back to all 12 products
    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBe(12)
  })

  test('sort dropdown changes product order', async ({ page }) => {
    const sortSelect = page.locator('#sort-select')
    await expect(sortSelect).toBeVisible()

    // Default is 'newest'
    expect(await sortSelect.inputValue()).toBe('newest')

    // Change to price-low
    await sortSelect.selectOption('price-low')

    // All 12 cards should still be present
    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBe(12)

    // First card should be the cheapest (Fixie Classic at $899)
    const firstPriceText = await productCards.first().locator('text=/\\$[\\d,]+/').last().textContent()
    expect(firstPriceText).toContain('899')
  })

  test('navigating to product detail page works', async ({ page }) => {
    const firstCard = page.locator('a[aria-label*="View details for"]').first()
    // Get the product name from the card before clicking
    const productName = await firstCard.locator('h3').textContent()
    await firstCard.click()

    // Should be on a product detail page
    await expect(page).toHaveURL(/\/products\/[\w-]+/)

    // Should show product name heading
    await expect(page.locator('h1')).toBeVisible()
  })

  test('mobile filter toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/products')

    // Mobile filter toggle button
    const filterToggle = page.locator('button[aria-controls="filters-panel"]')
    await expect(filterToggle).toBeVisible()

    // Filters panel should be hidden by default on mobile
    const filtersPanel = page.locator('#filters-panel')
    await expect(filtersPanel).not.toBeVisible()

    // Click to show filters
    await filterToggle.click()
    await expect(filtersPanel).toBeVisible()

    // Click again to hide
    await filterToggle.click()
    await expect(filtersPanel).not.toBeVisible()
  })

  test('category query param pre-selects filter', async ({ page }) => {
    await page.goto('/products?category=road')

    // Should show fewer than all products
    const productCards = page.locator('a[aria-label*="View details for"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(12)
  })
})
