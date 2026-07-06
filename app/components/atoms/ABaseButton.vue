<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)] focus-visible:ring-offset-2 active:scale-95"
    :class="[variantClasses, disabled ? 'pointer-events-none opacity-50' : '']"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
    :class="variantClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const variantClasses = computed(() => {
  const base = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const sizeClass = base[props.size]

  switch (props.variant) {
    case 'primary':
      return `${sizeClass} bg-[var(--color-neon)] text-[var(--color-dark)] hover:bg-[var(--color-neon-dim)]`
    case 'secondary':
      return `${sizeClass} border-2 border-[var(--color-neon)] text-[var(--color-neon)] hover:bg-[var(--color-neon)] hover:text-[var(--color-dark)]`
    case 'ghost':
      return `${sizeClass} text-gray-600 dark:text-gray-400 hover:text-[var(--color-neon)] hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)]`
    default:
      return sizeClass
  }
})
</script>
