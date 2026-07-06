import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { bikeProducts } from '~/data/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref(bikeProducts)

  const featuredProducts = computed(() => products.value.filter(p => p.featured))

  const mountainBikes = computed(() => products.value.filter(p => p.category === 'mountain'))
  const roadBikes = computed(() => products.value.filter(p => p.category === 'road'))
  const electricBikes = computed(() => products.value.filter(p => p.category === 'electric'))

  function getProductById(id: string) {
    return products.value.find(p => p.id === id) || null
  }

  function getRelatedProducts(productId: string, limit = 4) {
    const product = getProductById(productId)
    if (!product) return []
    return products.value
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit)
  }

  const uniqueBrands = computed(() => [...new Set(products.value.map(p => p.brand))])

  return {
    products,
    featuredProducts,
    mountainBikes,
    roadBikes,
    electricBikes,
    getProductById,
    getRelatedProducts,
    uniqueBrands,
  }
})
