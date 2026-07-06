import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '~/stores/cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const sampleProduct = {
    id: 'trail-blazer-x1',
    name: 'Trail Blazer X1',
    price: 2899,
    image: '/products/bike-1.webp',
  }

  it('starts with an empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toEqual([])
    expect(cart.itemCount).toBe(0)
    expect(cart.subtotal).toBe(0)
    expect(cart.total).toBe(49.99) // shipping kicks in when subtotal <= 999
  })

  it('addItem adds a new product to the cart', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].id).toBe('trail-blazer-x1')
    expect(cart.items[0].quantity).toBe(1)
    expect(cart.itemCount).toBe(1)
  })

  it('addItem increments quantity when adding the same product again', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.addItem(sampleProduct, 2)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(3)
    expect(cart.itemCount).toBe(3)
  })

  it('addItem supports custom initial quantity', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct, 5)
    expect(cart.items[0].quantity).toBe(5)
    expect(cart.itemCount).toBe(5)
  })

  it('removeItem removes an item from the cart', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.addItem({ id: 'aero-speedster', name: 'Aero Speedster', price: 4200, image: '/products/bike-3.webp' })
    expect(cart.items).toHaveLength(2)

    cart.removeItem('trail-blazer-x1')
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].id).toBe('aero-speedster')
    expect(cart.itemCount).toBe(1)
  })

  it('removeItem with non-existent id does nothing', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.removeItem('non-existent')
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].id).toBe('trail-blazer-x1')
  })

  it('updateQuantity changes quantity', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.updateQuantity('trail-blazer-x1', 3)
    expect(cart.items[0].quantity).toBe(3)
    expect(cart.itemCount).toBe(3)
  })

  it('updateQuantity to 0 removes the item', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.updateQuantity('trail-blazer-x1', 0)
    expect(cart.items).toHaveLength(0)
    expect(cart.itemCount).toBe(0)
  })

  it('updateQuantity to negative removes the item', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.updateQuantity('trail-blazer-x1', -1)
    expect(cart.items).toHaveLength(0)
    expect(cart.itemCount).toBe(0)
  })

  it('clearCart removes all items', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct)
    cart.addItem({ id: 'aero-speedster', name: 'Aero Speedster', price: 4200, image: '/products/bike-3.webp' })
    expect(cart.items).toHaveLength(2)

    cart.clearCart()
    expect(cart.items).toHaveLength(0)
    expect(cart.itemCount).toBe(0)
    expect(cart.subtotal).toBe(0)
  })

  it('computes subtotal correctly', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct, 2) // 2 * 2899 = 5798
    cart.addItem({ id: 'fixie-classic', name: 'Fixie Classic', price: 899, image: '/products/bike-12.webp' })
    // subtotal = 5798 + 899 = 6697
    expect(cart.subtotal).toBe(6697)
  })

  it('computes total with free shipping above $999', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct) // 2899 -> subtotal > 999, shipping = 0
    expect(cart.subtotal).toBe(2899)
    expect(cart.shipping).toBe(0)
    expect(cart.total).toBe(2899)
  })

  it('computes total with shipping when subtotal <= $999', () => {
    const cart = useCartStore()
    cart.addItem({ id: 'fixie-classic', name: 'Fixie Classic', price: 899, image: '/products/bike-12.webp' })
    expect(cart.subtotal).toBe(899)
    expect(cart.shipping).toBe(49.99)
    expect(cart.total).toBe(948.99)
  })

  it('itemCount reflects total quantity across all items', () => {
    const cart = useCartStore()
    cart.addItem(sampleProduct, 3)
    cart.addItem({ id: 'fixie-classic', name: 'Fixie Classic', price: 899, image: '/products/bike-12.webp' }, 2)
    expect(cart.itemCount).toBe(5)
  })

  it('handles empty cart totals', () => {
    const cart = useCartStore()
    expect(cart.subtotal).toBe(0)
    expect(cart.shipping).toBe(49.99)
    expect(cart.total).toBe(49.99)
  })
})
