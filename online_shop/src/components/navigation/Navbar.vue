<script setup>
import { ref, defineProps} from 'vue';
import { useRoute } from 'vue-router';
import Login from '../userAccount/login.vue';

const route = useRoute();

defineProps({ propNavbarContainer: String });

const items = ref([
  {
    title: 'Home',
    disabled: false,
    to: '/',
  },
  {
    title: 'Store',
    disabled: false,
    to: '/Store',
  },
  {
    title: 'Cart',
    disabled: false,
    to: '/',
  },
]);

const isActive = (to) => route.path === to;
</script>

<template>
  <v-app :class="['navbarContainer', propNavbarContainer]">
    <v-container class="navBarSub">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            :class="{ 'active-link': isActive(item.to), 'inactive-link': !isActive(item.to) }"
            exact>
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-circle-small"></v-icon>
        </template>
      </v-breadcrumbs>
      <Login/>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
.navbarContainer {
  margin: 16px 0 0 auto;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  width: 55%;
  max-width: 800px;
  background-color: transparent;
  z-index: 1;
  height: 90px;
  min-height: 0;

  :deep(.v-application__wrap) {
    flex-direction: unset;
    min-height: 0;
  }

  .navBarSub {
    background-color: #191919;
    color: white;
    font-size: 24px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-right: 8px;
    padding: 0;
    min-height: 0;

    .btn {
        font-size: 24px;
    }
  }

  .active-link {
    color: white !important;
  }

  .inactive-link {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
