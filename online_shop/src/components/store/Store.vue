<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import axios from "axios";
import Search_Filter from './Search_Filter.vue';
import SpeedDial from './SpeedDial.vue';
import Footer from '../homepage/Footer.vue'
import { useWishListStore } from '../../store_state/wishListState';
import { useToast } from 'vue-toastification';
import { useCartStore } from '../../store_state/cartState';

const store = ref([]);
const allProducts = ref([]);
provide('products', allProducts);

const searchQuery = ref("");
const selectedFilters = ref([]);
const loading = ref(true);
const itemsToShow = ref(8);
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
      allProducts.value = res.data.store;
      store.value = res.data.store.slice(0, itemsToShow.value);
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("FRONT-END ERROR");
    }
  });

//SHOW MORE PRODUCT
const showMore = () => {
  itemsToShow.value += 8;
  store.value = allProducts.value.slice(0, itemsToShow.value);
};

// ALL PRODUCT CODE BLOCK
const filteredProducts = computed(() => {
  let filtered = allProducts.value;

  // CHECK IF SelectedFilters have DISCOUNT, LIMITED, NEW ITEMS
  
  // ERROR NOT WOKRING DUR PRICE SLIDER
  // const priceFilter = selectedFilters.value.find(filter => filter?.priceRange);
  // const priceFilter2 = selectedFilters.value.find(filter => filter?.priceRange2);
  
  const hasDiscountFilter = selectedFilters.value.includes("DISCOUNT");
  const hasLimitedFilter = selectedFilters.value.includes("LIMITED");
  const hasNewItemFilter = selectedFilters.value.includes("NEW ITEMS");

  if (hasDiscountFilter || hasLimitedFilter || hasNewItemFilter) {
    filtered = filtered.filter(item => 
      (hasDiscountFilter && item.discount !== null) ||
      (hasLimitedFilter && item.item_status === "LIMITED") ||
      (hasNewItemFilter && item.item_status === "NEW")
    );
  }

  // ERROR NOT WOKRING DUR PRICE SLIDER
  // if (priceFilter || priceFilter2) {
  //   filtered = filtered.filter(item => {
  //     const finalPrice = item.discount ? (item.price * (1 - item.discount / 100)) : item.price;
  //     const inRange1 = priceFilter ? (finalPrice >= priceFilter.priceRange[0] && finalPrice <= priceFilter.priceRange[1]) : false;
  //     const inRange2 = priceFilter2 ? (finalPrice >= priceFilter2.priceRange2[0] && finalPrice <= priceFilter2.priceRange2[1]) : false;

  //     return inRange1 || inRange2;
  //   });
  // }

  // SEARCH INPUT FILTER
  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered.slice(0, itemsToShow.value);
});

watch(searchQuery, () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});

// WISHLIST
const addItemToWishList = (productId) => {
  storeWishlist.addItemToWishList(productId, allProducts);
};

// CART
const addItemToCart = (productId) => {
  storeCart.addItemToCart(productId, allProducts);
};

// WHEN NO PRODUCT EXIST
const noResults = computed(() => {
  const hasFilters = selectedFilters.value.length > 0;
  return (searchQuery.value || hasFilters) && filteredProducts.value.length === 0;
});
//  WHEN PRODUCT IS 0 or LESS THAN 8
const nobtn = computed(() => filteredProducts.value.length === 0 || filteredProducts.value.length < 8)
</script>

<template>
  <Search_Filter 
    v-model:searchQuery="searchQuery" 
    v-model:selectedFilters="selectedFilters"/>
  <div v-if="noResults" class="no-results">
    NO PRODUCT FOUND
  </div>

  <MasonryWall
    :items="filteredProducts"
    :ssr="false"
    :column-width="300"
    :gap="20">
    <template #default="{ item }">
      <v-skeleton-loader v-if="loading" :loading="loading" type="image, article" />
    <v-card class="storeContainer">
        <v-img v-if="!loading" :src="item.image" height="200"></v-img>
        <p class="item-status" v-if="item.item_status && !loading || item.discount !== null  && !loading">
          {{ item.item_status || "-" + item.discount + "%" }}
        </p>
        <p v-if="!loading" class="item-stock">IN STOCK: {{ item.remaining_in_stock }}</p>
        <v-card-title v-if="!loading">{{ item.title }}</v-card-title>
        <p v-if="!loading" class="description">{{ item.description }}</p>
        <div v-if="!loading" class="wrapPrice">
          <p :class="{'priceDiscount': item.discount !== null}">${{ item.price }}</p>
          <p v-if="item.discount !== null">
            ${{ item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price || "No Discount" }}
          </p>
        </div>
        <SpeedDial 
          :clickWishList="() => addItemToWishList(item.id)" 
          :clickCart="() => addItemToCart(item.id)"
        />
      </v-card>
    </template>
  </MasonryWall>

  <div class="show-more-container">
    <v-btn @click="showMore" 
    v-if="!nobtn && itemsToShow < allProducts.length">
      Show More
    </v-btn>
  </div>

  <Footer/>
</template>

<style lang="scss" scoped>
.masonry-wall{
  width: 91.3%;
  margin-top: 7px;
  margin-left: 95px;
}

.v-card-title {
  white-space: normal;
}

.v-card {
  border-radius: 0!important;
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
}

.no-results {
  text-align: center;
  font-size: 3.2em;
  height: 63vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.v-skeleton-loader),
:deep(.v-skeleton-loader__heading),
:deep(.v-skeleton-loader__text) {
  border-radius: 0!important;
}

.show-more-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;

  .v-btn {
    border-radius: 0!important;
    font-size: 22px;
    background-color: white;
    color: #191919;
  }
}
</style>