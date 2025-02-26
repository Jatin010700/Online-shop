import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cartListState', {
    state: () => ({
        cartList: ref([]),
    }),
    actions: {
        increaseQty(productId) {
            const product = this.cartList.find((item) => item.id === productId);
            if (product) product.quantity += 1;
        },
        decreaseQty(productId) {
            const product = this.cartList.find((item) => item.id === productId);
            if (product && product.quantity > 1) {
              product.quantity -= 1;
            } else {
              this.cartList = this.cartList.filter((item) => item.id !== productId);
            }
        },
    }
});