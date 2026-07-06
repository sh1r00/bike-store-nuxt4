import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'
import { useDarkModeStore } from '~/stores/darkMode'

describe('ADarkModeToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useDarkModeStore().isDark = true
  })

  function mountToggle() {
    return mount(ADarkModeToggle, {
      global: {
        stubs: { AIcon: { template: '<span class="icon">{{ $attrs.name }}</span>', inheritAttrs: false } },
      },
    })
  }

  it('renders a button', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows sun icon when dark', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('.icon').text()).toBe('sun')
  })

  it('shows moon icon when light', () => {
    useDarkModeStore().isDark = false
    const wrapper = mountToggle()
    expect(wrapper.find('.icon').text()).toBe('moon')
  })

  it('calls toggle on click', async () => {
    useDarkModeStore().isDark = false
    const wrapper = mountToggle()
    await wrapper.find('button').trigger('click')
    expect(useDarkModeStore().isDark).toBe(true)
  })

  it('has aria-label', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').attributes('aria-label')).toBe('a11y.toggleDarkMode')
  })
})
