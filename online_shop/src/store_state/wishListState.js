import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useWishListStore = defineStore('wishlistState', {
    state: () => ({
        wishlist: ref([]),
    }),
    actions: {
        addItemToWishList(productId, allProducts) {
            const wishListProduct = allProducts.value.find(product => product.id === productId);
            const isAlreadyInWishlist = this.wishlist.some(item => item.id === productId);

            // CHECK IF PRODUCT IS ALREADY IN WISHLIST
            if (isAlreadyInWishlist) {
                toast.error("Product already in wishlist", { timeout: 1500 });
                return;
            }

            if (wishListProduct) {
                this.wishlist.push({ ...wishListProduct });

                const productName = wishListProduct.title;
                toast(`${productName} Added to your wishlist`, { timeout: 1500 });
            } else {
                toast.error("FAILED! to add product", { timeout: 3000 });
            }
        },
        removeFromWishList(productId) {
            this.wishlist = this.wishlist.filter((item) => item.id !== productId);
            toast.error("Removed from wishlist", { timeout: 3000 });
        },
    }
});