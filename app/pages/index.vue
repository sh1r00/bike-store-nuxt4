<template>
  <div>
    <!-- Hero Carousel -->
    <section class="relative h-[70vh] md:h-[85vh] overflow-hidden" aria-label="Featured hero carousel">
      <div class="absolute inset-0 bg-[var(--color-dark)]">
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-dark)] via-[var(--color-dark)]/80 to-transparent z-10" />
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/callout.jpg'); opacity: 0.4" />
      </div>

      <div class="relative z-20 container-page h-full flex flex-col justify-center">
        <div class="max-w-2xl">
          <h1 class="section-title text-white mb-4">
            {{ t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            {{ t('hero.subtitle') }}
          </p>
          <div class="flex flex-wrap gap-4">
            <ABaseButton to="/products" variant="primary" size="lg" :aria-label="t('hero.cta')">
              {{ t('hero.cta') }}
              <AIcon name="arrow-right" size="sm" />
            </ABaseButton>
            <ABaseButton to="/about" variant="secondary" size="lg" :aria-label="t('about.title')">
              {{ t('about.title') }}
            </ABaseButton>
          </div>
        </div>
      </div>

      <!-- Hero indicator dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        <span class="w-3 h-3 rounded-full bg-[var(--color-neon)]" />
        <span class="w-3 h-3 rounded-full bg-white/30" />
        <span class="w-3 h-3 rounded-full bg-white/30" />
      </div>
    </section>

    <!-- Categories -->
    <section class="py-20 bg-white dark:bg-[var(--color-dark)]" aria-labelledby="categories-heading">
      <div class="container-page">
        <h2 id="categories-heading" class="section-title text-center text-gray-900 dark:text-white mb-12">
          {{ t('home.categories') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.name"
            :to="`/products?category=${cat.key}`"
            :aria-label="`Shop ${cat.name} bikes`"
            class="group relative h-64 rounded-xl overflow-hidden bg-[var(--color-dark)]"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/40 to-transparent z-10" />
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              :style="{ backgroundImage: `url('${cat.image}')`, opacity: 0.6 }" />
            <div class="relative z-20 h-full flex flex-col justify-end p-6">
              <h3 class="text-2xl md:text-3xl font-[var(--font-heading)] tracking-wider text-white group-hover:text-[var(--color-neon)] transition-colors">
                {{ cat.name }}
              </h3>
              <p class="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {{ cat.count }} {{ cat.count === 1 ? 'bike' : 'bikes' }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-gray-50 dark:bg-[var(--color-dark-surface)]" aria-labelledby="featured-heading">
      <div class="container-page">
        <div class="flex items-center justify-between mb-12">
          <h2 id="featured-heading" class="section-title text-gray-900 dark:text-white">
            {{ t('home.featured') }}
          </h2>
          <ABaseButton to="/products" variant="ghost" size="sm" :aria-label="t('home.viewAll')">
            {{ t('home.viewAll') }}
            <AIcon name="chevron-right" size="sm" />
          </ABaseButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <AProductCard
            v-for="product in productsStore.featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-white dark:bg-[var(--color-dark)]" aria-labelledby="testimonials-heading">
      <div class="container-page">
        <h2 id="testimonials-heading" class="section-title text-center text-gray-900 dark:text-white mb-12">
          {{ t('home.testimonials') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(test, i) in testimonials" :key="i" class="surface-elevated p-6 text-center">
            <div class="flex justify-center gap-0.5 mb-4">
              <AIcon v-for="n in 5" :key="n" name="star" size="sm" :class="n <= test.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'" />
            </div>
            <p class="text-gray-600 dark:text-gray-400 italic mb-4">"{{ test.quote }}"</p>
            <p class="font-bold text-gray-900 dark:text-white font-[var(--font-heading)] tracking-wider text-lg">{{ test.name }}</p>
            <p class="text-sm text-gray-500">{{ test.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-20 bg-[var(--color-dark)]" aria-labelledby="newsletter-heading">
      <div class="container-page max-w-2xl text-center">
        <h2 id="newsletter-heading" class="section-title text-white mb-4">
          {{ t('home.newsletter') }}
        </h2>
        <p class="text-gray-400 mb-8">
          {{ t('home.newsletterDesc') }}
        </p>
        <form class="flex flex-col sm:flex-row gap-3" @submit.prevent>
          <label for="newsletter-email" class="sr-only">{{ t('home.newsletterPlaceholder') }}</label>
          <input
            id="newsletter-email"
            type="email"
            required
            :placeholder="t('home.newsletterPlaceholder')"
            :aria-label="t('home.newsletterPlaceholder')"
            class="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-neon)] transition-colors"
          >
          <ABaseButton type="submit" variant="primary" :aria-label="t('home.newsletterBtn')">
            {{ t('home.newsletterBtn') }}
          </ABaseButton>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/products'

const { t } = useI18n()
const productsStore = useProductsStore()

useHead({
  title: 'URBAN RIDE — Premium Bikes for Urban Explorers',
})

const categories = computed(() => [
  { key: 'mountain', name: t('home.mountain'), image: '/products/1.jpg', count: productsStore.mountainBikes.length },
  { key: 'road', name: t('home.road'), image: '/products/5.jpg', count: productsStore.roadBikes.length },
  { key: 'electric', name: t('home.electric'), image: '/products/9.jpg', count: productsStore.electricBikes.length },
])

const testimonials = [
  { rating: 5, quote: 'Best bike I have ever owned. The Trail Blazer X1 handles everything I throw at it.', name: 'Marcus Chen', title: 'Mountain Biker' },
  { rating: 5, quote: 'My Volt Surge makes my daily commute something I actually look forward to.', name: 'Sarah Kim', title: 'Urban Commuter' },
  { rating: 4, quote: 'The build quality is exceptional. URBAN RIDE really cares about their craft.', name: 'James Rodriguez', title: 'Road Cyclist' },
]
</script>
