import { useCartStore } from '~/stores/cart'

export function useCart() {
  return useCartStore()
}
