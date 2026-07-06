<template>
  <div>
    <!-- Hero -->
    <section class="relative py-24 bg-[var(--color-dark)]" aria-labelledby="contact-heading">
      <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/callout.jpg')" />
      <div class="relative container-page text-center">
        <h1 id="contact-heading" class="section-title text-white mb-4">{{ t('contact.title') }}</h1>
        <p class="text-xl text-gray-300 max-w-xl mx-auto">{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <!-- Contact Form + Info -->
    <section class="py-20 bg-white dark:bg-[var(--color-dark)]">
      <div class="container-page grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="surface-elevated p-8">
          <form v-if="!formSent" class="space-y-5" @submit.prevent="submitForm">
            <div>
              <label for="contact-name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {{ t('contact.name') }}
              </label>
              <input
                id="contact-name"
                v-model="formData.name"
                type="text"
                required
                :aria-label="t('contact.name')"
                :aria-required="true"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[var(--color-dark-surface)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-neon)] transition-colors"
              >
            </div>

            <div>
              <label for="contact-email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {{ t('contact.email') }}
              </label>
              <input
                id="contact-email"
                v-model="formData.email"
                type="email"
                required
                :aria-label="t('contact.email')"
                :aria-required="true"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[var(--color-dark-surface)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-neon)] transition-colors"
              >
            </div>

            <div>
              <label for="contact-message" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {{ t('contact.message') }}
              </label>
              <textarea
                id="contact-message"
                v-model="formData.message"
                rows="5"
                required
                :aria-label="t('contact.message')"
                :aria-required="true"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[var(--color-dark-surface)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-neon)] transition-colors resize-none"
              />
            </div>

            <ABaseButton type="submit" variant="primary" size="lg" class="w-full" :aria-label="t('contact.send')">
              {{ t('contact.send') }}
            </ABaseButton>
          </form>

          <!-- Success -->
          <div v-else class="text-center py-8">
            <div class="text-5xl mb-4">✅</div>
            <h3 class="text-2xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-2">
              {{ t('contact.sent') }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              {{ t('contact.sentDesc') }}
            </p>
            <ABaseButton variant="secondary" :aria-label="'Send another message'" @click="formSent = false; formData = { name: '', email: '', message: '' }">
              Send Another
            </ABaseButton>
          </div>
        </div>

        <!-- Store Locator -->
        <div>
          <h2 class="text-2xl font-[var(--font-heading)] tracking-wider text-gray-900 dark:text-white mb-6">
            {{ t('contact.storeLocator') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ t('contact.storeLocatorDesc') }}
          </p>

          <div class="surface-elevated overflow-hidden mb-4">
            <div class="h-48 bg-gray-200 dark:bg-[var(--color-dark-surface)] flex items-center justify-center">
              <AIcon name="location" size="xl" class="text-gray-400" />
            </div>
          </div>

          <div class="space-y-3 text-gray-600 dark:text-gray-400">
            <div class="flex items-start gap-3">
              <AIcon name="location" size="sm" class="mt-0.5 text-[var(--color-neon)] shrink-0" />
              <span>{{ t('contact.address') }}</span>
            </div>
            <div class="flex items-start gap-3">
              <AIcon name="phone" size="sm" class="mt-0.5 text-[var(--color-neon)] shrink-0" />
              <span>{{ t('contact.phone') }}</span>
            </div>
            <div class="flex items-start gap-3">
              <AIcon name="envelope" size="sm" class="mt-0.5 text-[var(--color-neon)] shrink-0" />
              <span>hello@urbanride.com</span>
            </div>
            <div class="flex items-start gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span class="text-sm">{{ t('contact.hours') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Contact — URBAN RIDE',
})

const formSent = ref(false)
const formData = reactive({
  name: '',
  email: '',
  message: '',
})

function submitForm() {
  // Demo: just show success
  formSent.value = true
}
</script>
