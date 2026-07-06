<template>
  <div class="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-800">
    <!-- Item image placeholder -->
    <div class="w-20 h-20 rounded-lg bg-gray-100 dark:bg-[var(--color-dark-elevated)] flex items-center justify-center flex-shrink-0">
      <span class="text-xs font-bold text-gray-400">{{ item.name.split(' ')[0] }}</span>
    </div>

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <h4 class="font-bold font-[var(--font-heading)] text-lg tracking-wider text-gray-900 dark:text-white truncate">
        {{ item.name }}
      </h4>
      <p class="text-[var(--color-neon)] font-bold mt-1">${{ item.price.toLocaleString() }}</p>

      <!-- Quantity controls -->
      <div class="flex items-center gap-2 mt-3">
        <button
          type="button"
          :aria-label="`Decrease quantity of ${item.name}`"
          class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
          @click="cart.updateQuantity(item.id, item.quantity - 1)"
        >
          <AIcon name="minus" size="sm" />
        </button>
        <span class="w-10 text-center font-semibold tabular-nums" aria-live="polite">{{ item.quantity }}</span>
        <button
          type="button"
          :aria-label="`Increase quantity of ${item.name}`"
          class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
          @click="cart.updateQuantity(item.id, item.quantity + 1)"
        >
          <AIcon name="plus" size="sm" />
        </button>
      </div>
    </div>

    <!-- Price & Remove -->
    <div class="flex flex-col items-end justify-between">
      <button
        type="button"
        :aria-label="`Remove ${item.name} from cart`"
        class="text-gray-400 hover:text-red-500 transition-colors p-1"
        @click="cart.removeItem(item.id)"
      >
        <AIcon name="trash" size="sm" />
      </button>
      <p class="font-bold text-lg tabular-nums text-gray-900 dark:text-white mt-auto">
        ${{ (item.price * item.quantity).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/stores/cart'
import { useCartStore } from '~/stores/cart'

defineProps<{
  item: CartItem
}>()

const cart = useCartStore()
</script>
