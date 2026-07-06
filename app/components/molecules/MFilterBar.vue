<template>
  <aside class="surface p-6" aria-label="Filters">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white">
        {{ t('products.filters') }}
      </h3>
      <button
        type="button"
        :aria-label="t('products.clearFilters')"
        class="text-sm text-[var(--color-neon)] hover:underline"
        @click="clearFilters"
      >
        {{ t('products.clearFilters') }}
      </button>
    </div>

    <!-- Category Filter -->
    <fieldset class="mb-6">
      <legend class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
        {{ t('products.category') }}
      </legend>
      <div class="space-y-2">
        <label
          v-for="cat in categories"
          :key="cat.value"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            :value="cat.value"
            :checked="modelValue.category === cat.value"
            :aria-label="cat.label"
            class="sr-only peer"
            @change="emit('update:modelValue', { ...modelValue, category: cat.value })"
          >
          <span class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-[var(--color-neon)] peer-checked:border-[var(--color-neon)] peer-checked:bg-[var(--color-neon)] transition-colors flex items-center justify-center">
            <span class="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform" />
          </span>
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {{ cat.label }}
          </span>
        </label>
      </div>
    </fieldset>

    <!-- Brand Filter -->
    <fieldset class="mb-6">
      <legend class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
        {{ t('products.brand') }}
      </legend>
      <div class="space-y-2">
        <label
          v-for="brand in brands"
          :key="brand"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            :value="brand"
            :checked="modelValue.brand === brand"
            :aria-label="brand"
            class="sr-only peer"
            @change="emit('update:modelValue', { ...modelValue, brand })"
          >
          <span class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-[var(--color-neon)] peer-checked:border-[var(--color-neon)] peer-checked:bg-[var(--color-neon)] transition-colors flex items-center justify-center">
            <span class="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform" />
          </span>
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {{ brand }}
          </span>
        </label>
      </div>
    </fieldset>

    <!-- Price Range -->
    <fieldset>
      <legend class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
        {{ t('products.priceRange') }}
      </legend>
      <div class="space-y-3">
        <input
          type="range"
          :min="0"
          :max="maxPrice"
          :value="modelValue.maxPrice"
          :aria-label="`${t('products.priceRange')}: $${modelValue.maxPrice}`"
          class="w-full accent-[var(--color-neon)]"
          @input="(e) => emit('update:modelValue', { ...modelValue, maxPrice: Number((e.target as HTMLInputElement).value) })"
        >
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>$0</span>
          <span class="font-bold text-[var(--color-neon)]">${{ modelValue.maxPrice.toLocaleString() }}</span>
        </div>
      </div>
    </fieldset>
  </aside>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/products'

export interface FilterState {
  category: string
  brand: string
  maxPrice: number
}

const props = defineProps<{
  modelValue: FilterState
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterState]
}>()

const { t } = useI18n()
const productsStore = useProductsStore()

const brands = computed(() => productsStore.uniqueBrands)
const maxPrice = computed(() => Math.max(...productsStore.products.map(p => p.price), 100))

const categories = [
  { value: '', label: t('products.all') },
  { value: 'mountain', label: t('home.mountain') },
  { value: 'road', label: t('home.road') },
  { value: 'electric', label: t('home.electric') },
]

function clearFilters() {
  emit('update:modelValue', { category: '', brand: '', maxPrice: maxPrice.value })
}
</script>
