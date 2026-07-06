<template>
  <div>
    <!-- Hero -->
    <section class="relative py-24 bg-[var(--color-dark)]" aria-labelledby="about-heading">
      <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/callout.jpg')" />
      <div class="relative container-page text-center">
        <h1 id="about-heading" class="section-title text-white mb-4">{{ t('about.title') }}</h1>
        <p class="text-xl text-gray-300 max-w-xl mx-auto">{{ t('about.subtitle') }}</p>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20 bg-white dark:bg-[var(--color-dark)]">
      <div class="container-page max-w-3xl">
        <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {{ t('about.story1') }}
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {{ t('about.story2') }}
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ t('about.story3') }}
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-gray-50 dark:bg-[var(--color-dark-surface)]" aria-labelledby="values-heading">
      <div class="container-page">
        <h2 id="values-heading" class="section-title text-center text-gray-900 dark:text-white mb-12">
          {{ t('about.values') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="surface-elevated p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-neon)]/10 flex items-center justify-center text-3xl">🏆</div>
            <h3 class="text-xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-3">{{ t('about.value1Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ t('about.value1Desc') }}</p>
          </div>
          <div class="surface-elevated p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-neon)]/10 flex items-center justify-center text-3xl">🚴</div>
            <h3 class="text-xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-3">{{ t('about.value2Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ t('about.value2Desc') }}</p>
          </div>
          <div class="surface-elevated p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-neon)]/10 flex items-center justify-center text-3xl">🌍</div>
            <h3 class="text-xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-3">{{ t('about.value3Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ t('about.value3Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-[var(--color-dark)] text-center">
      <div class="container-page max-w-xl">
        <h2 class="text-3xl font-[var(--font-heading)] tracking-wider text-white mb-4">{{ t('hero.cta') }}</h2>
        <ABaseButton to="/products" variant="primary" size="lg" :aria-label="t('hero.cta')">
          {{ t('hero.cta') }}
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'About — URBAN RIDE',
})
</script>
