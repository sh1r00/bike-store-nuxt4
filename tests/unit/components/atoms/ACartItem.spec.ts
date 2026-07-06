import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '~/stores/cart'
import type { CartItem } from '~/stores/cart'
import ACartItem from '~/components/atoms/ACartItem.vue'

const sampleItem: CartItem = {
  id: 'trail-blazer-x1',
  name: 'Trail Blazer X1',
  price: 2899,
  image: '/products/bike-1.webp',
  quantity: 2,
}

describe('ACartItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const cart = useCartStore()
    cart.addItem(
      { id: 'trail-blazer-x1', name: 'Trail Blazer X1', price: 2899, image: '/products/bike-1.webp' },
      2,
    )
  })

  it('renders the item name', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    expect(wrapper.text()).toContain('Trail Blazer X1')
  })

  it('renders the item price', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    expect(wrapper.text()).toContain('$2,899')
  })

  it('renders the line total (price × quantity)', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    // 2899 * 2 = 5798
    expect(wrapper.text()).toContain('$5,798')
  })

  it('displays the quantity', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    expect(wrapper.text()).toContain('2')
  })

  it('has aria-live="polite" on quantity span', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    const liveSpan = wrapper.find('[aria-live="polite"]')
    expect(liveSpan.exists()).toBe(true)
    expect(liveSpan.text()).toBe('2')
  })

  it('calls cart.updateQuantity with item.quantity - 1 on minus click', async () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    const buttons = wrapper.findAll('button')
    // First button is minus (decrease)
    const minusBtn = buttons[0]
    await minusBtn.trigger('click')
    const cart = useCartStore()
    expect(cart.items[0].quantity).toBe(1)
  })

  it('calls cart.updateQuantity with item.quantity + 1 on plus click', async () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    const buttons = wrapper.findAll('button')
    // Second button is plus (increase)
    const plusBtn = buttons[1]
    await plusBtn.trigger('click')
    const cart = useCartStore()
    expect(cart.items[0].quantity).toBe(3)
  })

  it('calls cart.removeItem on trash click', async () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    const buttons = wrapper.findAll('button')
    // Third button is trash (remove)
    const trashBtn = buttons[2]
    await trashBtn.trigger('click')
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
  })

  it('has aria-labels on quantity buttons containing item name', () => {
    const wrapper = mount(ACartItem, {
      props: { item: sampleItem },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-label')).toBe('Decrease quantity of Trail Blazer X1')
    expect(buttons[1].attributes('aria-label')).toBe('Increase quantity of Trail Blazer X1')
    expect(buttons[2].attributes('aria-label')).toBe('Remove Trail Blazer X1 from cart')
  })
})
