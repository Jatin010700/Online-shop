<script setup>
import { ref, watchEffect } from 'vue';
import { useWishListStore } from '../../store_state/wishListState';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCartStore } from '../../store_state/cartState';

const drawer = ref(true);

const storeWishlist = useWishListStore();
const { wishlist } = storeToRefs(storeWishlist);

const storeCart = useCartStore();
const { cartList } = storeToRefs(storeCart);

const route = useRoute();

const store = ref([
    { title: 'STORE PAGE 1', link: '/Store' },
    { title: 'STORE PAGE 2', link: '/Store' },
    { title: 'STORE PAGE 3', link: '/Store' },
    { title: 'STORE PAGE 4', link: '/Store' },
])

const account = ref([
    { title: 'My wishlist', link: '/MyItem', icon: "mdi-heart", value: false },
    { title: 'My cart', link: '/MyItem', icon: "mdi-cart", value: false },
    { title: 'Settings', link: '/', icon: "mdi-cog", value: false },
]);

watchEffect(() => {
  account.value[0].value = wishlist.value.length > 0;
  account.value[1].value = cartList.value.length > 0;
});

const isActive = (to) => route.path === to;
</script>
<template>
    <v-app class="drawerApp">
        <v-navigation-drawer v-model="drawer" location="left" class="NavDrawer" expand-on-hover rail rail-width="68">
            <v-list>
                <v-btn variant="text" :class="{ 'active-link': isActive('/'), 'inactive-link': !isActive('/') }">
                    <router-link to="/" class="link">
                        <v-list-item title="Home" prepend-icon="mdi-home" ></v-list-item>
                    </router-link>
                </v-btn>
                <v-menu
                transition="slide-x-transition"
                open-on-hover
                location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" v-bind="props" :class="{ 'active-link': isActive('/MyItem'), 'inactive-link': !isActive('/MyItem') }">
                            <router-link to="/MyItem" class="link">
                                <v-list-item title="Account" prepend-icon="mdi-account"></v-list-item>
                            </router-link>
                        </v-btn>
                    </template>
                        <v-list class="custom-menu">
                            <v-list-item
                            v-for="(item, index) in account"
                            :key="index">
                            <v-btn variant="text">
                                <v-badge v-if="item.value" dot color="#FE5253">
                                    <v-icon :icon="item.icon" size="x-large"></v-icon>
                                </v-badge>
                                <v-icon v-if="!item.value" :icon="item.icon" size="x-large"></v-icon>
                                <router-link :to="item.link" class="link" >
                                    {{ item.title }}
                                </router-link>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu 
                transition="slide-x-transition"
                open-on-hover
                location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" v-bind="props" :class="{ 'active-link': isActive('/Store'), 'inactive-link': !isActive('/Store') }">
                            <router-link to="/Store" class="link">
                                <v-list-item title="Store" prepend-icon="mdi-store"></v-list-item>
                            </router-link>
                        </v-btn>
                    </template>
                        <v-list class="custom-menu">
                            <v-list-item
                            v-for="(item, index) in store"
                            :key="index">
                            <v-btn variant="text" prepend-icon="mdi-store">
                                <router-link :to="item.link" class="link">
                                    {{ item.title }}
                                </router-link>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-btn variant="text" :class="{ 'active-link': isActive('/CheckOut'), 'inactive-link': !isActive('/CheckOut') }">
                    <router-link to="/CheckOut" class="link">
                        <v-list-item title="Cart" prepend-icon="mdi-cart"></v-list-item>
                    </router-link>
                </v-btn>

                <v-btn variant="text" class="logOutBtn">
                    <v-icon icon="mdi-power"></v-icon>
                </v-btn>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<style lang="scss" scoped>
.drawerApp {
    :deep(.v-application__wrap) {
        min-height: 0;
    }

    .NavDrawer {
        :deep(.v-list-item-title) {
            font-size: 24px;
            // color: #191919;
        }

        .v-btn.v-btn--density-default {
            height: auto;
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-radius: 0;
        }
        
        .link {
            width: 225px;
            display: flex;
        }

        :deep(.v-list-item) {
            padding: 0;
        }

        :deep(.v-list-item__prepend > .v-icon) {
            // color: #191919;
            opacity: 1;
            font-size: 35px;
        }

        .logOutBtn {
            position: absolute;
            bottom: 0;
            font-size: 30px;
            justify-content: center!important;
        }
    }

    .v-list {
        padding: 0;
        height: 100%;
    }
    
    :deep(.v-navigation-drawer--left) {
        border-right-width: 0!important;
    }
    
}

.custom-menu {
    border-radius: 0 !important;
    box-shadow: none !important;
    width: 225px;
    padding: 0;

    .v-list-item  {
        padding: 0;
    }

    .v-btn--size-default {
        border-radius: 0;
        width: 100%;
        padding: 4px 20px;
        height: auto;
        display: flex;
        justify-content: space-between;
    }

    .v-list-item--one-line {
        padding-inline: 0!important;
    }

    a {
        color: #191919;
        display: inline-block;
        width: 225px;
        padding: 10px;
    }

    .v-list-item--density-default {
        min-height: 0;
    }
}

.active-link {
    background-color: #191919!important;
    transition: 0.5s;

    :deep(.v-list-item__prepend > .v-icon),
    :deep(.v-list-item-title) {
        color: white;
    }
  }

  .inactive-link {
    background-color: white!important;
    transition: 0.5s;

    :deep(.v-list-item__prepend > .v-icon),
    :deep(.v-list-item-title) {
        color: #191919;
    }
  }
</style>