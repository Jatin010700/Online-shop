<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import SpeedDial from '../store/SpeedDial.vue';
import { useWishListStore } from '../../store_state/wishListState';
import { useToast } from 'vue-toastification';
import { useCartStore } from '../../store_state/cartState';

const allProducts = ref([]);
const tab = ref(null);
const loading = ref(true);
const toast = useToast();
const storeCart = useCartStore();
const storeWishlist = useWishListStore();

// PRODUCT API
const LOCAL_URL = import.meta.env.VITE_LOCAL_PRODUCT_URL
const VERCEL_URL = import.meta.env.VITE_VERCEL_URL;
const apiKey = import.meta.env.VITE_PUBLIC_KEY;

onMounted(async () => {
    try {
        const res = await axios.get(
            `${VERCEL_URL}products`,
            // `${LOCAL_URL}`,
            {
            headers: {
                "x-api-key": apiKey,
            },
        });
        allProducts.value = res.data.products;
        setTimeout(() => {
            loading.value = false;
        }, 3000);
    } catch (err) {
        console.error(err);
        toast.error("SERVER ERROR");
    }
});

// WISHLIST
const addItemToWishList = (productId) => {
  storeWishlist.addItemToWishList(productId, allProducts);
};

// CART
const addItemToCart = (productId) => {
  storeCart.addItemToCart(productId, allProducts);
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
                        v-for="(product, i) in allProducts.slice(0, 4)" :key="i"
                        class="tabCard"
                        max-width="344"
                        link>
                        <v-skeleton-loader v-if="loading" :loading="loading" type="image, article"/>
                            <v-img v-if="!loading" :src="product.image" height="75%" cover></v-img>
                            <p v-if="!loading" class="item-status">{{ product.item_status }}</p>
                            <v-card-title v-if="!loading" class="title">{{ product.title }}</v-card-title>
                            <v-card-subtitle v-if="!loading" class="price">${{ product.price || "No Price" }}</v-card-subtitle>
                            <SpeedDial
                                v-if="!loading"
                                :clickWishList="() => addItemToWishList(product.id)"
                                :clickCart="() => addItemToCart(product.id)" 
                            />
                    </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two"  class="wrapContent">
                        <v-card
                            v-for="(product, i) in allProducts.slice(4, 8)" :key="i"
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
                        <SpeedDial 
                            :clickWishList="() => addItemToWishList(product.id)"
                            :clickCart="() => addItemToCart(product.id)" 
                        />
                    </v-card>
                    </v-tabs-window-item>
            
                    <v-tabs-window-item value="three"  class="wrapContent">
                        <v-card
                            v-for="(product, i) in allProducts.slice(8, 12)" :key="i"
                            class="tabCard"
                            max-width="344"
                            link>
                        <v-img :src="product.image" height="75%" cover></v-img>
                        <p class="item-status">{{ product.item_status }}</p>
                        <p class="item-stock">IN STOCK: {{ product.remaining_in_stock }}</p>
                        <v-card-title class="title">{{ product.title }}</v-card-title>
                        <v-card-subtitle class="price">${{ product.price || "No Price" }}</v-card-subtitle>
                        <SpeedDial 
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