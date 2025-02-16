<script setup>
import { ref } from 'vue';

const drawer = ref(true);
</script>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
<template>
    <v-app class="drawerApp">
        <v-navigation-drawer v-model="drawer" location="left" class="NavDrawer" expand-on-hover rail rail-width="68">
            <v-list>
                <v-btn variant="text">
                    <router-link to="/" class="link">
                        <v-list-item title="Home" prepend-icon="mdi-home"></v-list-item>
                    </router-link>
                </v-btn>
                <v-menu 
                transition="slide-x-transition"
                open-on-hover
                location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" v-bind="props">
                            <router-link to="/Store" class="link">
                                <v-list-item title="Store" prepend-icon="mdi-store"></v-list-item>
                            </router-link>
                        </v-btn>
                    </template>
                        <v-list class="custom-menu">
                            <v-list-item
                            v-for="(item, index) in items"
                            :key="index">
                            <router-link to="/Store"  class="link">
                                <v-list-item title="Other page" prepend-icon="mdi-circle-small"></v-list-item>
                            </router-link>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn variant="text" class="link">
                    <router-link>
                        <v-list-item title="Cart" prepend-icon="mdi-cart"></v-list-item>
                    </router-link>
                </v-btn>
            </v-list>
            <v-btn variant="text" class="logOutBtn">
                <v-icon icon="mdi-power"></v-icon>
            </v-btn>
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
            color: #191919;
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
            color: #191919;
            opacity: 1;
            font-size: 35px;
        }

        .logOutBtn {
            position: absolute;
            bottom: 10px;
            font-size: 24px;
            justify-content: center!important;
        }
    }
}

.custom-menu {
    border-radius: 0 !important;
    box-shadow: none !important;

    a {
        color: #191919!important;
    }
}
</style>