import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishListStore = defineStore('wishlistState', {
    state: () => ({
        wishlist: ref([]),
    }),
});