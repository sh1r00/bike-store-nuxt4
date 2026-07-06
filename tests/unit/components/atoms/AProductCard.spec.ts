import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AProductCard from '~/components/atoms/AProductCard.vue'
import { useCartStore } from '~/stores/cart'
import type { BikeProduct } from '~/data/products'

const product: BikeProduct = {
  id: 'test-1', name: 'Test Bike', brand: 'TestBrand', price: 2999,
  category: 'mountain', rating: 4.5, inStock: true,
  description: 'A great bike for testing.', images: [],
  specs: { frame: 'Aluminum', weight: '12kg', gears: '21', brakes: 'Disc' },
}

describe('AProductCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountCard() {
    return mount(AProductCard, {
      props: { product },
      global: {
        stubs: { AIcon: { template: '<span class="icon" />' }, NuxtLink: { template: '<a><slot /></a>', props: ['to'] }, Teleport: { template: '<div><slot /></div>' } },
      },
    })
  }

  it('renders the product name', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Test Bike')
  })

  it('renders the product price', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('$2,999')
  })

  it('shows In Stock when in stock', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('product.inStock')
  })

  it('clicking opens modal', async () => {
    const wrapper = mountCard()
    expect(wrapper.text()).not.toContain('Full Details')
    await wrapper.find('.cursor-pointer').trigger('click')
    // Modal content should now be visible
    expect(wrapper.text()).toContain('Full Details')
  })

  it('modal has add to cart button', async () => {
    const wrapper = mountCard()
    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.text()).toContain('product.addToCart')
  })
})
