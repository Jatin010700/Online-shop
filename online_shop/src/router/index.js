// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/homepage/HomePage.vue';
import Store from '../components/store/Store.vue';
import MyItem from '../components/user_account/Myitem.vue';
import Checkout from '../components/checkout/Checkout.vue';

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: HomePage,
   },
  { 
    path: '/Store',
    name: 'Store',
    component: Store,
  },
  {
    path: '/MyItem',
    name: 'MyItem',
    component: MyItem,
  },
  {
    path: '/CheckOut',
    name: 'CheckOut',
    component: Checkout,
  }
];

const router = createRouter({
  history: createWebHistory(), // Uses history mode for clean URLs
  routes,
});

export default router;
