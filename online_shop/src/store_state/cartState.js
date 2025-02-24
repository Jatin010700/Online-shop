import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cartListState', () => {
    const cartList = ref([]);

    return {cartList}
});