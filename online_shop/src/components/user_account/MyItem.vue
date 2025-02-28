<script setup>
    import { ref, computed } from 'vue';
    import { useWishListStore } from '../../store_state/wishListState';
    import { storeToRefs } from 'pinia';
    import { useCartStore } from '../../store_state/cartState';

    const tab = ref("WISHLIST");

    const storeWishlist = useWishListStore();
    const { wishlist } = storeToRefs(storeWishlist);

    const storeCart = useCartStore();
    const { cartList } = storeToRefs(storeCart);

    const option3 =ref([]);
    const setting =ref([]);

    // Ensure MasonryWall refreshes with computed data
    const filteredWishlist = computed(() => wishlist.value);
    const filteredCart = computed(() => cartList.value);
    const filteredOption3 = computed(() => option3.value);
    const filteredSetting = computed(() => setting.value);

    const tabTitle = ref([
        { title: "WISHLIST", data: filteredWishlist },
        { title: "CART", data: filteredCart },
        { title: "OPTION3", data: filteredOption3 },
        { title: "SETTING", data: filteredSetting },
    ]);

    // REMOVE FROM WISHLIST
    const removeFromWishList = (productId) => {
        storeWishlist.removeFromWishList(productId);
    };

    // REMOVE FROM CART
    const removeFromCart = (productId) => {
        storeCart.removeFromCart(productId);
    };

    // ADD TO CART
    const addItemToCart = (productId) => {
        storeCart.addItemFromWishListToCart(productId);
    };

    // WHEN NO PRODUCT EXIST
    const noWishlist = computed(() => wishlist.value.length === 0);
    const noCart = computed(() => cartList.value.length === 0);
    const noContent = computed(() => option3.value.length === 0 || setting.value.length === 0);
</script>

<template>
    <v-container class="ItemContainer">
        <v-card>
            <v-card-title class="text-right">
                <h1 class="font-weight-bold ">
                    Welcome, "username"
                </h1>
            </v-card-title>
            <v-tabs v-model="tab" grow fixed-tabs class="sticky-tabs">
                <v-tab 
                    v-for="item in tabTitle" 
                    :key="item.title" 
                    :value="item.title"
                    :class="{ 'active-tab': tab === item.title }">
                    <v-badge v-if="item.title === 'WISHLIST' || item.title === 'CART'" 
                    color="#FE5253" 
                    :content="item.title === 'WISHLIST' ? wishlist.length :
                    item.title === 'CART' ? cartList.length : ''">
                        {{ item.title }}
                    </v-badge>
                    <template v-else>
                        {{ item.title }}
                    </template>
                    </v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item 
                    v-for="item in tabTitle" 
                    :key="item.title" 
                    :value="item.title">
                    <div v-if="item.title === 'WISHLIST' && noWishlist" class="no-results">
                        WISHLIST EMPTY
                    </div>
                    <div v-if="item.title === 'CART' && noCart" class="no-results">
                        CART EMPTY
                    </div>
                    <div v-if="(item.title === 'OPTION3' || item.title === 'SETTING') && noContent" class="no-results">
                        NO CONTENT
                    </div>
                        <MasonryWall
                            :items="item.data"
                            :ssr="false"
                            :column-width="300"
                            :gap="20"
                            class="wishlist-masonry">
                        <template #default="{ item }">
                            <v-card class="storeContainer">
                                <v-img :src="item.image" height="200"></v-img>
                                <p class="item-status" v-if="item.item_status || item.discount !== null">
                                {{ item.item_status || "-" + item.discount + "%" }}
                                </p>
                                <p class="item-stock">IN STOCK: {{ item.remaining_in_stock }}</p>
                                <v-card-title>{{ item.title }}</v-card-title>
                                <p class="description">{{ item.description }}</p>
                                <div class="wrapPrice">
                                    <p :class="{'priceDiscount': item.discount !== null}">${{ item.price }}</p>
                                    <p v-if="item.discount !== null">
                                        ${{ item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price || "No Discount" }}
                                    </p>
                                </div>
                                <!-- REMOVE WISHLIST BUTTON AND ADD TO CART BUTTON -->
                                <v-speed-dial
                                    location="top center"
                                    transition="scale-transition"
                                    open-on-hover
                                    v-if="tab === 'WISHLIST' && wishlist.includes(item)">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-fab
                                        v-bind="activatorProps"
                                        size="large"
                                        icon="$close"
                                        class="closeBTN"
                                        @click="() => removeFromWishList(item.id)"></v-fab>
                                    </template>
                                    <!-- CART REMOVE BUTTON -->
                                    <v-btn @click="() => addItemToCart(item.id)" key="2" icon="$cart" class="bg-black text-white">
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </v-speed-dial>
                                <v-btn v-if="tab === 'CART' && cartList.includes(item)" @click="() => removeFromCart(item.id)" icon="$close" class="bg-black text-white closeBTN">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card>
                        </template>
                    </MasonryWall>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
    </v-container>
</template>

<style lang="scss" scoped>
.ItemContainer {
    padding: 0;
    margin-right: 0;
    margin-left: 68px;
    max-width: 1315px;

    .v-card {
        border-radius: 0;
    }

    .v-tabs-window {
        background-color: #191919;
        color: white;
        padding: 20px;
    }

    .v-card-title {
        line-height: inherit;
        text-transform: uppercase;
        padding: 18px 20px;
    }

    .v-tab.v-btn {
        font-size: 24px;
        height: 50px;
        max-width: 306px!important;
    }

    .v-card--variant-elevated {
        box-shadow: none;
    }

    :deep(.v-badge__badge) {
        letter-spacing: 1px;
        font-family: "Teko", serif;
        bottom: calc(100% - 20px)!important;
        left: calc(100% - 0px)!important;
        border-radius: 0;
        font-weight: bold;
        font-size: 14px;
    }

    .v-slide-group {
        overflow: auto;
    }

    .v-card {
        overflow: inherit;
    }

    .sticky-tabs {
        position: sticky !important;
        top: 0;
        z-index: 100;
        background: white;
        // box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .active-tab {
        background-color: #191919 !important;
        color: white !important;
    }

    :deep(.v-slide-group__content) {
        gap: 18px!important;
    }

    :deep(.v-slide-group__content > *:first-child) {
        margin-inline-start: 19px;
    }
}

.storeContainer {
  position: relative;

  .v-card-title {
    font-size: 24px;
    padding: 0 20px;
  }

  .item-status,
  .item-stock {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #191919;
    color: white;
    padding: 5px 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-right: 1px solid white;
  }

  .item-stock {
    top: 40px;
  }

  .description {
    width: 100%;
    padding: 0 20px;
  }

  .wrapPrice {
    padding: 20px;
    font-size: 20px;
    display: flex;
    gap: 10px;

    .priceDiscount {
      text-decoration: line-through;
      opacity: 0.5;
      font-size: 20px;
    }
  }

  .closeBTN {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
}

.no-results {
    background-color: #191919;
    color: white;
    text-align: center;
    font-size: 3.2em;
    height: 63vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.v-btn--icon) {
    border-radius: 0!important;
    color: white;
    background: #191919;
    width: 48px;
    height: 48px;
}

.v-btn--icon{
    border-radius: 0!important;
}

:deep(.v-skeleton-loader),
:deep(.v-skeleton-loader__heading),
:deep(.v-skeleton-loader__text) {
  border-radius: 0!important;
}
</style>