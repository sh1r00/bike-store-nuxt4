import { test, expect } from '@playwright/test'

test.describe('Cart', () => {
  test('empty cart shows empty state', async ({ page }) => {
    await page.goto('/cart')

    // Empty cart message
    await expect(page.locator('h2')).toContainText(/empty/i)

    // Continue shopping button
    const continueBtn = page.locator('a[aria-label*="Continue" i]')
    await expect(continueBtn).toBeVisible()
  })

  test('add to cart from product detail page', async ({ page }) => {
    await page.goto('/products/trail-blazer-x1')

    // Should see the product detail
    await expect(page.locator('h1')).toContainText('Trail Blazer X1')

    // Click "Add to Cart"
    const addBtn = page.locator('button[aria-label*="Add to Cart" i]').first()
    await expect(addBtn).toBeEnabled()
    await addBtn.click()

    // Button should change to "Added to Cart!" 
    await expect(page.locator('button[aria-label*="Added to Cart" i]')).toBeVisible()

    // Navigate to cart
    await page.goto('/cart')

    // Cart should contain the item name
    await expect(page.locator('h4')).toContainText('Trail Blazer X1')
  })

  test('add to cart with quantity greater than 1', async ({ page }) => {
    await page.goto('/products/fixie-classic')

    // Increase quantity to 3
    await page.locator('button[aria-label="Increase quantity"]').click()
    await page.locator('button[aria-label="Increase quantity"]').click()

    // Add to cart
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()

    // Navigate to cart
    await page.goto('/cart')

    // Quantity should be 3
    await expect(page.locator('[aria-live="polite"]').first()).toHaveText('3')
  })

  test('cart shows correct subtotal, shipping, and total', async ({ page }) => {
    // Add Trail Blazer X1 ($2,899)
    await page.goto('/products/trail-blazer-x1')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()

    await page.goto('/cart')

    // Check subtotal ($2,899)
    await expect(page.locator('text=/\\$2,899/').first()).toBeVisible()

    // Shipping should be free (subtotal > $999)
    await expect(page.locator('text=/free/i').first()).toBeVisible()

    // Total should also be $2,899 (free shipping)
    await expect(page.locator('text=/\\$2,899/').last()).toBeVisible()
  })

  test('shipping is applied when subtotal is under threshold', async ({ page }) => {
    // Add Fixie Classic ($899) which is under $999 free shipping threshold
    await page.goto('/products/fixie-classic')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()

    await page.goto('/cart')

    // Shipping should show $49.99
    await expect(page.locator('text=/\\$49\\.99/')).toBeVisible()

    // Free shipping threshold message
    await expect(page.locator('text=/free shipping/i')).toBeVisible()
  })

  test('increase quantity updates totals', async ({ page }) => {
    await page.goto('/products/fixie-classic')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()
    await page.goto('/cart')

    // Initial subtotal is $899
    await expect(page.locator('text=/\\$899/').first()).toBeVisible()

    // Click increase quantity (locate by aria-label)
    await page.locator('button[aria-label*="Increase quantity" i]').first().click()

    // Subtotal should update to $1,798 (2 × $899)
    await expect(page.locator('text=/\\$1,798/').first()).toBeVisible()

    // Shipping should now be free (subtotal > $999)
    await expect(page.locator('text=/free/i').first()).toBeVisible()
  })

  test('decrease quantity to zero removes item', async ({ page }) => {
    await page.goto('/products/fixie-classic')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()
    await page.goto('/cart')

    // Decrease quantity (from 1 to 0 → remove)
    await page.locator('button[aria-label*="Decrease quantity" i]').first().click()

    // Should show empty cart
    await expect(page.locator('h2')).toContainText(/empty/i)
  })

  test('remove item from cart via trash button', async ({ page }) => {
    await page.goto('/products/trail-blazer-x1')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()
    await page.goto('/cart')

    // Item should be present
    await expect(page.locator('h4')).toContainText('Trail Blazer X1')

    // Click remove button (aria-label contains "Remove")
    await page.locator('button[aria-label*="Remove" i]').first().click()

    // Cart should be empty
    await expect(page.locator('h2')).toContainText(/empty/i)
  })

  test('cart badge updates after adding item', async ({ page }) => {
    await page.goto('/products/trail-blazer-x1')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()

    // Navigate to home
    await page.goto('/')

    // Cart badge should show 1
    const badge = page.locator('header [aria-live="polite"]')
    await expect(badge).toHaveText('1')
  })

  test('checkout button shows demo alert', async ({ page }) => {
    await page.goto('/products/fixie-classic')
    await page.locator('button[aria-label*="Add to Cart" i]').first().click()
    await page.goto('/cart')

    // Click checkout
    await page.locator('button[aria-label*="Checkout" i]').click()

    // Demo mode alert should appear
    await expect(page.locator('text=Demo Mode')).toBeVisible()
  })
})
