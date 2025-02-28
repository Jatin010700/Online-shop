import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWishListStore } from './wishlistState';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useCartStore = defineStore('cartListState', {
    state: () => ({
        cartList: ref([]),
    }),
    getters: {
        wishlistState() {
            const wishlistStore = useWishListStore();
            return wishlistStore.wishlist
        }
    },
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
        addItemToCart(productId, allProducts) {
            const cartProduct = allProducts.value.find(product => product.id === productId);
            const isAlreadyInCart = this.cartList.some(item => item.id === productId);

            // CHECK IF PRODUCT IS ALREADY IN CART
            if (isAlreadyInCart) {
              toast.error("Product already in cart", { timeout: 1500 });
              return;
            }

            if (cartProduct) {
              this.cartList.push({ ...cartProduct});

              const productName = cartProduct.title;
              toast(`${productName} Added to your cart`, { timeout: 1500 });
            } else {
              toast.error("FAILED! to add product", { timeout: 3000 });
            }
        },
        addItemFromWishListToCart(productId) {
            const wishlistStore = useWishListStore();
            const wishListProduct = wishlistStore.wishlist.find(product => product.id === productId);
            const isAlreadyInCart = this.cartList.some(item => item.id === productId);

            if (isAlreadyInCart) {
                toast.error("Product already in cart", { timeout: 1500 });
                return;
            }

            if (wishListProduct) {
                this.cartList.push({ ...wishListProduct });

                const productName = wishListProduct.title;
                toast(`${productName} Added to your cart`, { timeout: 1500 });
            } else {
                toast.error("FAILED! to add product", { timeout: 3000 });
            }
        },
        removeFromCart(productId) {
            this.cartList = this.cartList.filter((item) => item.id !== productId);
            toast.error("Removed from cart", { timeout: 3000 });
        }
    }
});