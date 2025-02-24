import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishListStore = defineStore('wishlistState', () => {
    const wishlist = ref([]);

    return {wishlist}
});