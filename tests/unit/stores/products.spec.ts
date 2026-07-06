import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '~/stores/products'
import type { BikeProduct } from '~/data/products'

describe('products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has 12 seed products', () => {
    const store = useProductsStore()
    expect(store.products).toHaveLength(12)
  })

  it('all products have required fields', () => {
    const store = useProductsStore()
    for (const product of store.products) {
      expect(product.id).toBeTruthy()
      expect(product.name).toBeTruthy()
      expect(['mountain', 'road', 'electric']).toContain(product.category)
      expect(product.brand).toBeTruthy()
      expect(product.price).toBeGreaterThan(0)
      expect(product.description).toBeTruthy()
      expect(product.specs.frame).toBeTruthy()
      expect(product.specs.fork).toBeTruthy()
      expect(product.specs.drivetrain).toBeTruthy()
      expect(product.specs.brakes).toBeTruthy()
      expect(product.specs.wheels).toBeTruthy()
      expect(product.specs.weight).toBeTruthy()
      expect(product.images).toHaveLength(1)
      expect(product.rating).toBeGreaterThanOrEqual(1)
      expect(product.rating).toBeLessThanOrEqual(5)
      expect(typeof product.inStock).toBe('boolean')
      expect(typeof product.featured).toBe('boolean')
    }
  })

  it('featuredProducts returns only featured items', () => {
    const store = useProductsStore()
    const featured = store.featuredProducts
    expect(featured.length).toBeGreaterThan(0)
    for (const p of featured) {
      expect(p.featured).toBe(true)
    }
  })

  it('featuredProducts count matches seed data', () => {
    const store = useProductsStore()
    const seedFeaturedCount = store.products.filter((p: BikeProduct) => p.featured).length
    expect(store.featuredProducts).toHaveLength(seedFeaturedCount)
  })

  it('mountainBikes returns only mountain category', () => {
    const store = useProductsStore()
    for (const p of store.mountainBikes) {
      expect(p.category).toBe('mountain')
    }
  })

  it('roadBikes returns only road category', () => {
    const store = useProductsStore()
    for (const p of store.roadBikes) {
      expect(p.category).toBe('road')
    }
  })

  it('electricBikes returns only electric category', () => {
    const store = useProductsStore()
    for (const p of store.electricBikes) {
      expect(p.category).toBe('electric')
    }
  })

  it('category filters are non-overlapping and cover all products', () => {
    const store = useProductsStore()
    const total = store.mountainBikes.length + store.roadBikes.length + store.electricBikes.length
    expect(total).toBe(store.products.length)
  })

  it('getProductById returns the correct product', () => {
    const store = useProductsStore()
    const product = store.getProductById('trail-blazer-x1')
    expect(product).not.toBeNull()
    expect(product!.name).toBe('Trail Blazer X1')
    expect(product!.brand).toBe('RidgeLine')
    expect(product!.price).toBe(2899)
  })

  it('getProductById returns null for unknown id', () => {
    const store = useProductsStore()
    expect(store.getProductById('nonexistent')).toBeNull()
  })

  it('getRelatedProducts returns products of same category', () => {
    const store = useProductsStore()
    const related = store.getRelatedProducts('trail-blazer-x1')
    expect(related.length).toBeGreaterThan(0)
    for (const p of related) {
      expect(p.category).toBe('mountain')
      expect(p.id).not.toBe('trail-blazer-x1')
    }
  })

  it('getRelatedProducts respects the limit parameter', () => {
    const store = useProductsStore()
    const related = store.getRelatedProducts('trail-blazer-x1', 2)
    expect(related.length).toBeLessThanOrEqual(2)
  })

  it('getRelatedProducts returns empty array for unknown product', () => {
    const store = useProductsStore()
    expect(store.getRelatedProducts('nonexistent')).toEqual([])
  })

  it('uniqueBrands returns deduplicated brand list', () => {
    const store = useProductsStore()
    const brands = store.uniqueBrands
    expect(brands).toContain('RidgeLine')
    expect(brands).toContain('Veloce')
    expect(brands).toContain('NovaRide')
    // Should be deduplicated
    expect(new Set(brands).size).toBe(brands.length)
  })

  it('all products have valid image paths', () => {
    const store = useProductsStore()
    for (const product of store.products) {
      expect(product.images[0]).toMatch(/^\/products\/bike-\d+\.webp$/)
    }
  })

  it('all products have unique IDs', () => {
    const store = useProductsStore()
    const ids = store.products.map((p: BikeProduct) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
