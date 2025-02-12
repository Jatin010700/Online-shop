<script setup>
import { ref } from 'vue';

const drawer = ref(true);
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
                <v-btn variant="text">
                    <router-link to="/Store"  class="link">
                        <v-list-item title="Store" prepend-icon="mdi-store"></v-list-item>
                    </router-link>
                </v-btn>
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
            bottom: 0;
            font-size: 24px;
            justify-content: center!important;
        }
    }
}
</style>