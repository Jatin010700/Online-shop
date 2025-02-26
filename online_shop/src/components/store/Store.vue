<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import axios from "axios";
import Search_Filter from './Search_Filter.vue';
import TabSpeedDial from './TabSpeedDial.vue';
import Footer from '../homepage/Footer.vue'
import { useWishListStore } from '../../store_state/wishListState';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useCartStore } from '../../store_state/cartState';

const store = ref([]);
const allProducts = ref([]);
provide('products', allProducts);

const searchQuery = ref("");
const selectedFilters = ref([]);

const productId = ref([]);

const loading = ref(true);
const itemsToShow = ref(8);
const toast = useToast();

// PRODUCT API
onMounted(async () => {
  try {
      const res = await axios.get("http://localhost:5000/products");
      allProducts.value = res.data.store;
      store.value = res.data.store.slice(0, itemsToShow.value);
      productId.value = allProducts.value.findIndex(product => product.id);
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    } catch (err) {
      console.error(err);
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
const storeWishlist = useWishListStore();
const { wishlist } = storeToRefs(storeWishlist);

const addItemToWishList = (productId) => {
  const wishListProduct = allProducts.value.find(product => product.id === productId);
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
      description: wishListProduct.description,
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
  const cartProduct = allProducts.value.find(product => product.id === productId);
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
      quantity: cartProduct.quantity,
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

// WHEN NO PRODUCT EXIST
const noResults = computed(() => searchQuery.value && filteredProducts.value.length === 0);
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
        <TabSpeedDial 
          :clickWishList="() => addItemToWishList(item.id)" 
          :clickCart="() => addItemToCart(item.id)"
          />
      </v-card>
    </template>
  </MasonryWall>

  <div class="show-more-container">
    <v-btn 
    @click="showMore" 
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