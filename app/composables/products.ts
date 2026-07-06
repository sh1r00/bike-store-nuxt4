import { useProductsStore } from '~/stores/products'

export function useProducts() {
  return useProductsStore()
}
