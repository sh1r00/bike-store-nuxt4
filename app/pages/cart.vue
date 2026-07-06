<template>
  <div class="py-12">
    <div class="container-page">
      <h1 class="section-title text-gray-900 dark:text-white mb-8">
        {{ t('cart.title') }}
      </h1>

      <!-- Empty Cart -->
      <div v-if="cart.items.length === 0" class="text-center py-20">
        <div class="text-6xl mb-6">🛒</div>
        <h2 class="text-2xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-2">
          {{ t('cart.empty') }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ t('cart.emptyDesc') }}
        </p>
        <ABaseButton to="/products" variant="primary" size="lg" :aria-label="t('cart.continueShopping')">
          {{ t('cart.continueShopping') }}
        </ABaseButton>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Items List -->
        <div class="lg:col-span-2 surface-elevated p-6">
          <ACartItem
            v-for="item in cart.items"
            :key="item.id"
            :item="item"
          />
        </div>

        <!-- Order Summary -->
        <div class="surface-elevated p-6 h-fit sticky top-24">
          <h3 class="text-xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-6">
            {{ t('cart.total') }}
          </h3>

          <div class="space-y-3">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{{ t('cart.subtotal') }}</span>
              <span class="tabular-nums">${{ cart.subtotal.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{{ t('cart.shipping') }}</span>
              <span v-if="cart.shipping === 0" class="text-green-500 font-semibold">{{ t('cart.freeShipping') }}</span>
              <span v-else class="tabular-nums">${{ cart.shipping.toLocaleString() }}</span>
            </div>
            <hr class="border-gray-200 dark:border-gray-700">
            <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
              <span>{{ t('cart.total') }}</span>
              <span class="tabular-nums text-[var(--color-neon)]">${{ cart.total.toLocaleString() }}</span>
            </div>
          </div>

          <p v-if="cart.shipping > 0" class="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {{ t('cart.freeShippingThreshold') }}
          </p>

          <ABaseButton
            variant="primary"
            size="lg"
            class="w-full mt-6"
            :aria-label="t('cart.checkout')"
            @click="showCheckoutAlert = true"
          >
            {{ t('cart.checkout') }}
          </ABaseButton>

          <!-- Demo Checkout Alert -->
          <Transition name="fade">
            <div v-if="showCheckoutAlert" class="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm text-center">
              <p class="font-semibold">Demo Mode</p>
              <p>This is a frontend template — no real checkout is configured.</p>
              <button
                type="button"
                class="mt-2 text-green-600 dark:text-green-400 underline hover:no-underline"
                @click="showCheckoutAlert = false"
              >
                Dismiss
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const { t } = useI18n()
const cart = useCartStore()
const showCheckoutAlert = ref(false)

useHead({
  title: `Cart — URBAN RIDE`,
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
