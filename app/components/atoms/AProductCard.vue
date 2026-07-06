<template>
  <div class="group surface-elevated overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col cursor-pointer" @click="open = true">
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-[var(--color-dark-surface)]">
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span class="text-white font-bold text-lg font-[var(--font-heading)] tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {{ t('product.quickView') }}
        </span>
      </div>
      <div class="w-full h-full flex items-center justify-center text-3xl font-[var(--font-heading)] text-gray-400 dark:text-gray-600">
        {{ product.brand.charAt(0) }}
      </div>
    </div>
    <!-- Info -->
    <div class="p-4 flex flex-col gap-2 flex-1">
      <div class="flex items-center gap-1">
        <AIcon name="star" size="sm" class="text-yellow-500" />
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ product.rating }}</span>
      </div>
      <h3 class="text-lg font-bold font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white leading-tight">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{{ product.description }}</p>
      <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <span class="text-xl font-bold font-[var(--font-heading)] text-[var(--color-neon)]">${{ product.price.toLocaleString() }}</span>
        <span class="text-xs uppercase font-medium px-2 py-1 rounded-full" :class="product.inStock ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'">
          {{ product.inStock ? t('product.inStock') : t('product.outOfStock') }}
        </span>
      </div>
    </div>
  </div>

  <!-- Quick View Modal -->
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="open = false">
      <div class="bg-white dark:bg-[var(--color-dark-surface)] rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="relative p-6">
          <button @click="open = false" class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
            <AIcon name="close" />
          </button>
          <div class="flex items-center justify-center bg-gray-100 dark:bg-[var(--color-dark-elevated)] rounded-xl p-8 mb-6 min-h-[250px]">
            <span class="text-6xl font-[var(--font-heading)] text-gray-300 dark:text-gray-700">{{ product.brand.charAt(0) }}</span>
          </div>
          <h2 class="text-2xl font-bold font-[var(--font-heading)] text-gray-900 dark:text-white">{{ product.name }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ product.brand }} · {{ product.category }}</p>
          <p class="mt-4 text-gray-700 dark:text-gray-300">{{ product.description }}</p>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><span class="font-medium text-gray-500">Frame:</span> <span class="text-gray-900 dark:text-white">{{ product.specs?.frame || '—' }}</span></div>
            <div><span class="font-medium text-gray-500">Weight:</span> <span class="text-gray-900 dark:text-white">{{ product.specs?.weight || '—' }}</span></div>
            <div><span class="font-medium text-gray-500">Gears:</span> <span class="text-gray-900 dark:text-white">{{ product.specs?.gears || '—' }}</span></div>
            <div><span class="font-medium text-gray-500">Brakes:</span> <span class="text-gray-900 dark:text-white">{{ product.specs?.brakes || '—' }}</span></div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <span class="text-2xl font-bold font-[var(--font-heading)] text-[var(--color-neon)]">${{ product.price.toLocaleString() }}</span>
            <div class="flex gap-3">
              <NuxtLink :to="`/products/${product.id}`" class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">Full Details</NuxtLink>
              <button @click="addToCart" :disabled="!product.inStock" class="px-5 py-2.5 rounded-lg bg-[var(--color-neon)] text-[var(--color-dark)] font-bold text-sm hover:opacity-90 disabled:opacity-50">
                {{ t('product.addToCart') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { BikeProduct } from '~/data/products'
const props = defineProps<{ product: BikeProduct }>()
const { t } = useI18n()
const cart = useCart()
const open = ref(false)

const addToCart = () => {
  cart.addItem(props.product)
  open.value = false
}
</script>
