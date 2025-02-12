// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../homepage/HomePage.vue';
import Store from '../store/Store.vue';

const routes = [
  { path: '/', 
    name: 'Home', 
    component: HomePage,
   },
  { path: '/Store',
    name: 'Store',
    component: Store,
  },
];

const router = createRouter({
  history: createWebHistory(), // Uses history mode for clean URLs
  routes,
});

export default router;
