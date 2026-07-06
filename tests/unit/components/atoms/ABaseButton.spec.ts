import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a <button> when no "to" prop is provided', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Click me' },
    })
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('Click me')
    expect(btn.attributes('type')).toBe('button')
  })

  it('renders a NuxtLink when "to" prop is provided', () => {
    const wrapper = mount(ABaseButton, {
      props: { to: '/products' },
      slots: { default: 'Products' },
    })
    // NuxtLink is stubbed as <a>
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/products')
    expect(link.text()).toBe('Products')
  })

  it('applies the disabled attribute', () => {
    const wrapper = mount(ABaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeDefined()
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(ABaseButton, {
      props: { ariaLabel: 'Save changes' },
      slots: { default: 'Save' },
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-label')).toBe('Save changes')
  })

  it('renders with type="submit"', () => {
    const wrapper = mount(ABaseButton, {
      props: { type: 'submit' },
      slots: { default: 'Submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('defaults to "primary" variant with "md" size', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'OK' },
    })
    const btn = wrapper.find('button')
    // Default variant is primary, size is md
    expect(btn.classes()).toContain('px-6')
    expect(btn.classes()).toContain('py-3')
  })

  it('applies "secondary" variant classes', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secondary' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('border-2')
  })

  it('applies "ghost" variant classes', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'ghost' },
      slots: { default: 'Ghost' },
    })
    const btn = wrapper.find('button')
    // Ghost has text-gray-600 dark:text-gray-400
    expect(btn.classes()).toContain('text-gray-600')
  })

  it('applies size classes for "sm"', () => {
    const wrapper = mount(ABaseButton, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-sm')
  })

  it('applies size classes for "lg"', () => {
    const wrapper = mount(ABaseButton, {
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-lg')
  })
})
