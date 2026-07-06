<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
// Initialize dark mode
const { isDark } = useDarkModeStore()

useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : ''),
  },
})
</script>
