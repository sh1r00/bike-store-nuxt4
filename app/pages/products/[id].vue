<template>
  <div>
    <!-- Back link -->
    <div class="container-page py-4">
      <NuxtLink to="/products" class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--color-neon)] transition-colors">
        <AIcon name="chevron-left" size="sm" />
        {{ t('products.title') }}
      </NuxtLink>
    </div>

    <!-- Product Not Found -->
    <div v-if="!product" class="container-page py-20 text-center">
      <h2 class="section-title text-gray-900 dark:text-white mb-4">Bike Not Found</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
      <ABaseButton to="/products" variant="primary" aria-label="Go to catalog">
        {{ t('cart.continueShopping') }}
      </ABaseButton>
    </div>

    <!-- Product Detail -->
    <div v-else class="pb-20">
      <div class="container-page">
        <!-- Product Hero -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <!-- Gallery -->
          <div class="flex items-center justify-center bg-gray-100 dark:bg-[var(--color-dark-surface)] rounded-xl p-8 min-h-[400px]">
            <div class="w-full aspect-square max-w-md flex items-center justify-center text-6xl font-[var(--font-heading)] text-gray-300 dark:text-gray-700">
              {{ product.brand.charAt(0) }}
            </div>
          </div>

          <!-- Details -->
          <div class="flex flex-col gap-6">
            <div>
              <span class="text-sm uppercase tracking-wider text-[var(--color-neon)] font-semibold">{{ product.category }}</span>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mt-2">
                {{ product.name }}
              </h1>
              <p class="text-sm text-gray-500 mt-1">{{ product.brand }}</p>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex gap-0.5">
                <AIcon v-for="n in 5" :key="n" name="star" size="sm" :class="n <= Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'" />
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.rating }} / 5</span>
            </div>

            <!-- Price -->
            <p class="text-4xl font-bold font-[var(--font-heading)] text-[var(--color-neon)]">
              ${{ product.price.toLocaleString() }}
            </p>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Stock Status -->
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="product.inStock ? 'bg-green-500' : 'bg-red-500'" />
              <span class="text-sm font-semibold" :class="product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ product.inStock ? t('product.inStock') : t('product.outOfStock') }}
              </span>
            </div>

            <!-- Add to Cart -->
            <div class="flex items-center gap-4">
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  type="button"
                  :aria-label="`Decrease quantity`"
                  class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
                  :disabled="quantity <= 1"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  <AIcon name="minus" size="sm" />
                </button>
                <span class="w-12 text-center font-bold tabular-nums text-gray-900 dark:text-white" aria-live="polite">{{ quantity }}</span>
                <button
                  type="button"
                  :aria-label="`Increase quantity`"
                  class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
                  @click="quantity++"
                >
                  <AIcon name="plus" size="sm" />
                </button>
              </div>

              <ABaseButton
                variant="primary"
                size="lg"
                :disabled="!product.inStock"
                :aria-label="addedToCart ? t('product.addedToCart') : t('product.addToCart')"
                @click="addToCart"
              >
                {{ addedToCart ? t('product.addedToCart') : t('product.addToCart') }}
              </ABaseButton>
            </div>
          </div>
        </div>

        <!-- Specs -->
        <section class="mb-16" aria-labelledby="specs-heading">
          <h2 id="specs-heading" class="text-3xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-6">
            {{ t('product.specs') }}
          </h2>
          <div class="surface-elevated p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div v-for="(value, key) in product.specs" :key="key" class="text-center">
              <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{{ t(`product.${key}`) }}</p>
              <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ value }}</p>
            </div>
          </div>
        </section>

        <!-- Related Products -->
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" class="text-3xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-6">
            {{ t('product.related') }}
          </h2>
          <MProductGrid :products="relatedProducts" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/products'
const route = useRoute()
const { t } = useI18n()
const productsStore = useProductsStore()
const cart = useCart()

const quantity = ref(1)
const addedToCart = ref(false)

const productId = computed(() => route.params.id as string)
const product = computed(() => productsStore.getProductById(productId.value))
const relatedProducts = computed(() => productsStore.getRelatedProducts(productId.value, 4))

useHead({
  title: computed(() => product.value ? `${product.value.name} — URBAN RIDE` : 'Product — URBAN RIDE'),
})

function addToCart() {
  if (!product.value) return
  cart.addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0] || '',
  }, quantity.value)

  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}
</script>
