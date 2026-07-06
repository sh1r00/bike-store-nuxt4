<template>
  <header class="sticky top-0 z-50 bg-white/95 dark:bg-[var(--color-dark)]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" role="banner">
    <div class="container-page">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" aria-label="URBAN RIDE Home" class="flex items-center gap-2 shrink-0">
          <span class="text-2xl lg:text-3xl font-[var(--font-heading)] tracking-widest text-gray-900 dark:text-white">
            URBAN<span class="text-[var(--color-neon)]">RIDE</span>
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          <NuxtLink to="/" class="nav-link" active-class="nav-link-active">{{ t('nav.home') }}</NuxtLink>
          <NuxtLink to="/products" class="nav-link" active-class="nav-link-active">{{ t('nav.products') }}</NuxtLink>
          <NuxtLink to="/about" class="nav-link" active-class="nav-link-active">{{ t('nav.about') }}</NuxtLink>
          <NuxtLink to="/contact" class="nav-link" active-class="nav-link-active">{{ t('nav.contact') }}</NuxtLink>
        </nav>

        <!-- Right: search, cart, dark mode, language, mobile menu -->
        <div class="flex items-center gap-3">
          <!-- Search (desktop) -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[var(--color-dark-elevated)] border border-transparent focus-within:border-[var(--color-neon)] transition-colors">
            <AIcon name="search" size="sm" class="text-gray-400" />
            <input
              type="search"
              :placeholder="t('nav.search')"
              :aria-label="t('nav.search')"
              class="bg-transparent border-none outline-none text-sm w-32 lg:w-48 text-gray-900 dark:text-white placeholder-gray-400"
            >
          </div>

          <!-- Dark Mode -->
          <ADarkModeToggle />

          <!-- Language Switcher -->
          <select
            :aria-label="t('a11y.language')"
            class="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)]"
            :value="locale"
            @change="(e) => setLocale((e.target as HTMLSelectElement).value)"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="am">AM</option>
          </select>

          <!-- Cart -->
          <NuxtLink
            to="/cart"
            :aria-label="`${t('nav.cart')}: ${cart.itemCount} items`"
            class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
          >
            <AIcon name="cart" size="md" />
            <span
              v-if="cart.itemCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[var(--color-neon)] text-[var(--color-dark)] text-xs font-bold"
              aria-live="polite"
            >
              {{ cart.itemCount > 99 ? '99+' : cart.itemCount }}
            </span>
          </NuxtLink>

          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[var(--color-dark-elevated)] transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <AIcon :name="mobileMenuOpen ? 'x' : 'menu'" size="md" />
          </button>
        </div>
      </div>

      <!-- Mobile Nav Drawer -->
      <Transition name="slide">
        <nav
          v-if="mobileMenuOpen"
          class="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4"
          aria-label="Mobile navigation"
        >
          <div class="flex flex-col gap-3">
            <NuxtLink to="/" class="nav-link text-lg" @click="mobileMenuOpen = false">{{ t('nav.home') }}</NuxtLink>
            <NuxtLink to="/products" class="nav-link text-lg" @click="mobileMenuOpen = false">{{ t('nav.products') }}</NuxtLink>
            <NuxtLink to="/about" class="nav-link text-lg" @click="mobileMenuOpen = false">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink to="/contact" class="nav-link text-lg" @click="mobileMenuOpen = false">{{ t('nav.contact') }}</NuxtLink>
            <!-- Mobile search -->
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[var(--color-dark-elevated)]">
              <AIcon name="search" size="sm" class="text-gray-400" />
              <input
                type="search"
                :placeholder="t('nav.search')"
                :aria-label="t('nav.search')"
                class="bg-transparent border-none outline-none text-sm w-full text-gray-900 dark:text-white placeholder-gray-400"
              >
            </div>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '~/stores/cart'

const { locale, t, setLocale } = useI18n()
const cart = useCartStore()
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply text-sm font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-[var(--color-neon)] dark:hover:text-[var(--color-neon)] transition-colors duration-200 py-1;
}

.nav-link-active {
  @apply text-[var(--color-neon)] border-b-2 border-[var(--color-neon)];
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
