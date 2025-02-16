<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from "axios";

import Search from './Search.vue';
import TabSpeedDial from '../homepage/TabSpeedDial.vue';
import Footer from '../homepage/Footer.vue'

const store = ref([]);
const allProducts = ref([]);
const loading = ref(true);
const itemsToShow = ref(8);
const searchQuery = ref("");

onMounted(async () => {
  try {
      const res = await axios.get("http://localhost:3000/products");
      allProducts.value = res.data.store;
      store.value = res.data.store.slice(0, itemsToShow.value);;
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

//SEARCH INPUT
const filteredProducts = computed(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 3000);
  if (!searchQuery.value) {
    return allProducts.value.slice(0, itemsToShow.value);
  }
    return allProducts.value.filter(item => 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>
<template>
  <Search v-model="searchQuery"/>
  <MasonryWall
    :items="filteredProducts"
    :ssr="false"
    :column-width="300"
    :gap="20"
  >
    <template #default="{ item }">
      <v-skeleton-loader v-if="loading" :loading="loading" type="image, article">
      <v-card class="storeContainer">
        <v-img :src="item.image" height="200"></v-img>
        <p class="item-status" v-if="item.item_status && !loading || item.discount !== null  && !loading">
          {{ item.item_status || "-" + item.discount + "%" }}
        </p>
        <p class="item-stock">IN STOCK: {{ item.remaining_in_stock }}</p>
        <v-card-title>{{ item.title }}</v-card-title>
        <p class="description">{{ item.description }}</p>
        <div class="wrapPrice">
          <p>${{ item.price }}</p>
          <p class="priceDiscount" v-if="item.discount !== null">
            ${{ item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price || "No Discount" }}
          </p>
        </div>
        <TabSpeedDial/>
      </v-card>
    </v-skeleton-loader>

    <v-card class="storeContainer">
        <v-img v-if="!loading" :src="item.image" height="200"></v-img>
        <p class="item-status" v-if="item.item_status && !loading || item.discount !== null  && !loading">
          {{ item.item_status || "-" + item.discount + "%" }}
        </p>
        <p v-if="!loading" class="item-stock">IN STOCK: {{ item.remaining_in_stock }}</p>
        <v-card-title v-if="!loading">{{ item.title }}</v-card-title>
        <p v-if="!loading" class="description">{{ item.description }}</p>
        <div v-if="!loading" class="wrapPrice">
          <p>${{ item.price }}</p>
          <p class="priceDiscount" v-if="item.discount !== null">
            ${{ item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price || "No Discount" }}
          </p>
        </div>
        <TabSpeedDial/>
      </v-card>
    </template>
  </MasonryWall>

  <div class="show-more-container" v-if="itemsToShow < allProducts.length">
    <v-btn @click="showMore">Show More</v-btn>
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