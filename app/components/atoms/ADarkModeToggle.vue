<template>
  <button
    type="button"
    :aria-label="t('a11y.toggleDarkMode')"
    class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[var(--color-dark-elevated)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)]"
    @click="toggle"
  >
    <AIcon :name="isDark ? 'sun' : 'moon'" size="md" />
  </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'

const { isDark, toggle } = useDarkModeStore()
const { t } = useI18n()
</script>
