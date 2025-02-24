<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import TabSpeedDial from '../store/TabSpeedDial.vue';
import { useWishListStore } from '../../store_state/wishListState';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useCartStore } from '../../store_state/cartState';

const products =ref([]);
const tab = ref(null);
const loading = ref(true);
const toast = useToast();

onMounted(async () => {
    try {
        const res = await axios.get("http://localhost:5000/products");
        products.value = res.data.products;
        setTimeout(() => {
            loading.value = false;
        }, 3000);
    } catch (err) {
        console.error(err);
    }
});

    // WISHLIST
const storeWishlist = useWishListStore();
const { wishlist } = storeToRefs(storeWishlist);

const addItemToWishList = (productId) => {
  const wishListProduct = products.value.find(product => product.id === productId);
  const isAlreadyInWishlist = wishlist.value.some(item => item.id === productId);

  if (isAlreadyInWishlist) {
    toast.error("Product already in wishlist", {
      position: "bottom-right",
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      timeout: 1500
    });
    return;
  }

  if (wishListProduct) {
    wishlist.value.push({
      id: wishListProduct.id,
      image: wishListProduct.image,
      title: wishListProduct.title,
      item_status: wishListProduct.item_status,
      discount: wishListProduct.discount,
      price: wishListProduct.price,
      remaining_in_stock: wishListProduct.remaining_in_stock,
    });
    toast("Product saved to wishlist", {
        position: "bottom-right",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        timeout: 1500
    });
  } else {
    toast.error("Adding product to wishlist FAILED!", {
        position: "bottom-right",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        timeout: 3000
      });
  }
};

// CART
const storeCart = useCartStore();
const { cartList } = storeToRefs(storeCart);

const addItemToCart = (productId) => {
  const cartProduct = products.value.find(product => product.id === productId);
  const isAlreadyInCart = cartList.value.some(item => item.id === productId);

  if (isAlreadyInCart) {
    toast.error("Product already in cart", {
      position: "bottom-right",
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      timeout: 1500
    });
    return;
  }

  if (cartProduct) {
    cartList.value.push({
      id: cartProduct.id,
      image: cartProduct.image,
      title: cartProduct.title,
      description: cartProduct.description,
      item_status: cartProduct.item_status,
      discount: cartProduct.discount,
      price: cartProduct.price,
      remaining_in_stock: cartProduct.remaining_in_stock,
    });
    toast("Product saved to cart", {
        position: "bottom-right",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        timeout: 1500
    });
  } else {
    toast.error("Adding product to cart FAILED!", {
        position: "bottom-right",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        timeout: 3000
      });
  }
};
</script>

<template>
    <v-app class="TabApp">
        <v-container class="tabContainer">
            <v-lazy
            :min-height="400"
            :options="{'threshold':1}"
            transition="fade-transition">
                <v-card>
                <v-tabs
                    v-model="tab"
                    align-tabs="left"
                    bg-color="primary">
                    <v-tab value="one" class="tabHeader">New Items</v-tab>
                    <v-tab value="two" class="tabHeader">Discount</v-tab>
                    <v-tab value="three" class="tabHeader">Seasonal</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one" class="wrapContent">
                    <v-card
                        v-for="(product, i) in products.slice(0, 4)" :key="i"
                        class="tabCard"
                        max-width="344"
                        link>
                        <v-skeleton-loader v-if="loading" :loading="loading" type="image, article"/>
                            <v-img v-if="!loading" :src="product.image" height="75%" cover></v-img>
                            <p v-if="!loading" class="item-status">{{ product.item_status }}</p>
                            <v-card-title v-if="!loading" class="title">{{ product.title }}</v-card-title>
                            <v-card-subtitle v-if="!loading" class="price">${{ product.price || "No Price" }}</v-card-subtitle>
                            <TabSpeedDial 
                                :clickWishList="() => addItemToWishList(product.id)"
                                :clickCart="() => addItemToCart(product.id)" 
                            />
                    </v-card>
                    </v-tabs-window-item>
            
                    <v-tabs-window-item value="two"  class="wrapContent">
                        <v-card
                            v-for="(product, i) in products.slice(4, 8)" :key="i"
                            class="tabCard"
                            max-width="344"
                            link>
                        <v-img :src="product.image" height="75%" cover></v-img>
                        <p class="item-status">-{{ product.discount }}%</p>
                        <v-card-title class="title">{{ product.title }}</v-card-title>
                        <div class="wrapDiscount">
                            <v-card-subtitle :class="{'priceDiscount': product.discount !== null}">${{ product.price || "No Price" }}</v-card-subtitle>
                            <v-card-subtitle class="price">
                                ${{ product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price || "No Discount" }}
                            </v-card-subtitle>
                        </div>
                        <TabSpeedDial 
                            :clickWishList="() => addItemToWishList(product.id)"
                            :clickCart="() => addItemToCart(product.id)" 
                        />
                    </v-card>
                    </v-tabs-window-item>
            
                    <v-tabs-window-item value="three"  class="wrapContent">
                        <v-card
                            v-for="(product, i) in products.slice(8, 12)" :key="i"
                            class="tabCard"
                            max-width="344"
                            link>
                        <v-img :src="product.image" height="75%" cover></v-img>
                        <p class="item-status">{{ product.item_status }}</p>
                        <p class="item-stock">IN STOCK: {{ product.remaining_in_stock }}</p>
                        <v-card-title class="title">{{ product.title }}</v-card-title>
                        <v-card-subtitle class="price">${{ product.price || "No Price" }}</v-card-subtitle>
                        <TabSpeedDial 
                            :clickWishList="() => addItemToWishList(product.id)"
                            :clickCart="() => addItemToCart(product.id)" 
                        />
                    </v-card>
                    </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
                </v-card>
            </v-lazy>
        </v-container>
    </v-app>
  </template>

<style lang="scss" scoped>
.TabApp {
    position: absolute;
    bottom: -275px;
    width: 100%!important;

    .tabContainer {
        max-width: 1350px;
        margin-left: 20px;

        .tabHeader {
            font-size: 30px;
        }

        .tabSpeedDial {
            position: absolute;
            right: 5px;
            bottom: 5px;
            height: auto !important;

            :deep(button) {
                background-color: #191919;
                color: white;
            }
        }

        .wrapContent {
            display: flex;
            gap: 20px;
            width: 95%;
            margin-left: 65px;
    
            .tabCard {
                background: white;
                height: 325px;
                box-shadow: none;
                border-radius: 0;
                width: 25%;
                position: relative;

                .title {
                    font-size: 24px;
                    text-transform: uppercase;
                    padding: 0.2rem 1rem;
                }

                .price, .priceDiscount {
                    font-size: 24px;
                    opacity: 1;
                    color: #191919;
                }

                .price {
                    padding-left: 1rem!important;
                }

                .wrapDiscount {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .price {
                        padding-left: 0!important;
                    }


                    .priceDiscount {
                        text-decoration: line-through;
                        opacity: 0.5;
                        font-size: 20px;
                        padding-left: 1rem!important;
                    }
                }

                .item-status,
                .item-stock {
                    position: absolute;
                    top: 10px;
                    right: 0;
                    background-color: white;
                    color: #191919;
                    padding: 5px 10px;
                    z-index: 1;
                }
                
                .item-stock {
                    top: 38px;
                }

            }
        }
    }
    :deep(.v-skeleton-loader),
    :deep(.v-skeleton-loader__heading),
    :deep(.v-skeleton-loader__text) {
        border-radius: 0!important;
    }

    :deep(.bg-primary),
    :deep(.v-card-text) {
        background-color: #191919 !important;
        padding: 0;
    }

    :deep(.v-card) {
        border-radius: 0;
    }

    :deep(.v-tab.v-tab.v-btn){
        min-width: 164.5px;
    }

    :deep(.v-card--variant-elevated) {
        box-shadow: none;
    }

    :deep(.v-window__container) {
        margin-top: 95px;
    }

    :deep(.v-slide-group__content) {
        margin-left: 65px;
    }

    :deep(.v-skeleton-loader__image) {
        height: 167px;
    }
    
    .v-card-subtitle {
        padding: 0!important;
    }
}
</style>