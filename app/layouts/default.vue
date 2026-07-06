<template>
  <div class="flex flex-col min-h-screen">
    <a href="#main-content" class="skip-link" aria-label="Skip to main content">
      {{ t('a11y.skipToContent') }}
    </a>

    <OHeader />

    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>

    <OFooter />
  </div>
</template>

<script setup lang="ts">
import OHeader from '~/components/organisms/OHeader.vue'
import OFooter from '~/components/organisms/OFooter.vue'

const { t } = useI18n()
</script>
