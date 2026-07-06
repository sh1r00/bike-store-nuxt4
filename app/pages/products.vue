<template>
  <div class="py-12">
    <div class="container-page">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 class="section-title text-gray-900 dark:text-white">
          {{ t('products.title') }}
        </h1>

        <!-- Sort -->
        <div class="flex items-center gap-2">
          <label for="sort-select" class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ t('products.sortBy') }}:</label>
          <select
            id="sort-select"
            v-model="sortBy"
            :aria-label="t('products.sortBy')"
            class="text-sm bg-white dark:bg-[var(--color-dark-surface)] border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)]"
          >
            <option value="newest">{{ t('products.sortNewest') }}</option>
            <option value="price-low">{{ t('products.sortPriceLow') }}</option>
            <option value="price-high">{{ t('products.sortPriceHigh') }}</option>
            <option value="rating">{{ t('products.sortRating') }}</option>
          </select>
        </div>
      </div>

      <!-- Mobile Filter Toggle -->
      <button
        type="button"
        class="lg:hidden w-full mb-4 py-3 px-4 surface flex items-center justify-between text-gray-900 dark:text-white"
        @click="showFilters = !showFilters"
        :aria-expanded="showFilters"
        aria-controls="filters-panel"
      >
        <span class="font-semibold">{{ t('products.filters') }}</span>
        <AIcon :name="showFilters ? 'chevron-left' : 'chevron-right'" size="sm" />
      </button>

      <div class="flex gap-8">
        <!-- Filters Sidebar -->
        <div id="filters-panel" class="w-64 shrink-0" :class="showFilters ? 'block' : 'hidden lg:block'">
          <MFilterBar v-model="filters" />
        </div>

        <!-- Products -->
        <div class="flex-1 min-w-0">
          <p v-if="filteredAndSorted.length > 0" class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ filteredAndSorted.length }} {{ t('products.results') }}
          </p>

          <MProductGrid
            :products="filteredAndSorted"
            @clear-filters="resetFilters"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/products'
import type { FilterState } from '~/components/molecules/MFilterBar.vue'

const { t } = useI18n()
const productsStore = useProductsStore()

useHead({
  title: 'All Bikes — URBAN RIDE',
})

const sortBy = ref('newest')
const showFilters = ref(false)

const maxDefaultPrice = computed(() => Math.max(...productsStore.products.map(p => p.price), 100))

const filters = ref<FilterState>({
  category: '',
  brand: '',
  maxPrice: maxDefaultPrice.value,
})

// Read query param for category
const route = useRoute()
onMounted(() => {
  const cat = route.query.category as string
  if (cat && ['mountain', 'road', 'electric'].includes(cat)) {
    filters.value.category = cat
  }
})

const filteredAndSorted = computed(() => {
  let result = productsStore.products.filter(p => {
    if (filters.value.category && p.category !== filters.value.category) return false
    if (filters.value.brand && p.brand !== filters.value.brand) return false
    if (p.price > filters.value.maxPrice) return false
    return true
  })

  switch (sortBy.value) {
    case 'price-low':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
    default:
      // Keep original order as newest
      break
  }

  return result
})

function resetFilters() {
  filters.value = { category: '', brand: '', maxPrice: maxDefaultPrice.value }
  sortBy.value = 'newest'
}
</script>
