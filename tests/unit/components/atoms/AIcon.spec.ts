import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '~/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders with default size md', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search' },
    })
    const span = wrapper.find('span')
    expect(span.classes()).toContain('w-6')
    expect(span.classes()).toContain('h-6')
  })

  it('renders search icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders cart icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'cart' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders sun icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'sun' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders moon icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'moon' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders chevron-left icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'chevron-left' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders chevron-right icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'chevron-right' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders star icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'star' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders trash icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'trash' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders plus icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'plus' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders minus icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'minus' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders x icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'x' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders menu icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'menu' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders location icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'location' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders arrow-right icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'arrow-right' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders envelope icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'envelope' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders phone icon SVG', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'phone' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies aria-hidden="true"', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search' },
    })
    expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
  })

  it('renders with sm size', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search', size: 'sm' },
    })
    expect(wrapper.find('span').classes()).toContain('w-4')
    expect(wrapper.find('span').classes()).toContain('h-4')
  })

  it('renders with lg size', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search', size: 'lg' },
    })
    expect(wrapper.find('span').classes()).toContain('w-8')
    expect(wrapper.find('span').classes()).toContain('h-8')
  })

  it('renders with xl size', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'search', size: 'xl' },
    })
    expect(wrapper.find('span').classes()).toContain('w-12')
    expect(wrapper.find('span').classes()).toContain('h-12')
  })
})
