<template>
  <div>
    <div v-if="products.length === 0" class="text-center py-16 surface rounded-xl">
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-4">{{ t('products.noResults') }}</p>
      <ABaseButton variant="secondary" :aria-label="t('products.clearFilters')" @click="emit('clear-filters')">
        {{ t('products.clearFilters') }}
      </ABaseButton>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BikeProduct } from '~/data/products'

defineProps<{
  products: BikeProduct[]
}>()

const emit = defineEmits<{
  'clear-filters': []
}>()

const { t } = useI18n()
</script>
