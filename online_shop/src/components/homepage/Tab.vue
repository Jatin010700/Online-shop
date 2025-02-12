<script setup>
    import { ref } from 'vue';
    import TabSpeedDial from './TabSpeedDial.vue';

    

    const cards = ref([
        {
            image: new URL('../../assets/mouse.jpg', import.meta.url).href,
            discount: '-50%',
            title: 'Hover and click me',
            subtitle: 'Same looks, no anchor',
        },
        {
            image: new URL('../../assets/game1.jpg', import.meta.url).href,
            discount: '-50%',
            title: 'Hover and click me',
            subtitle: 'Same looks, no anchor',
        },
        {
            image: new URL('../../assets/keyboard.jpg', import.meta.url).href,
            discount: '-50%',
            title: 'Hover and click me',
            subtitle: 'Same looks, no anchor',
            cardProps: { subtitle: 'Same looks, no anchor', title: 'Hover and click me' },
        },
        {
            image: new URL('../../assets/mouse.jpg', import.meta.url).href,
            discount: '-50%',
            title: 'Hover and click me',
            subtitle: 'Same looks, no anchor',
            cardProps: { subtitle: 'Same looks, no anchor', title: 'Hover and click me' },
        },
    ]);
</script>

<script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>

<template>
    <v-app class="TabApp">
        <v-container class="tabContainer">
            <v-lazy
            :min-height="400"
            :options="{'threshold':1}"
            transition="fade-transition">
                <v-card>
                <v-tabs
                    v-model="tab"
                    align-tabs="left"
                    bg-color="primary">
                    <v-tab value="one" class="tabHeader">New Items</v-tab>
                    <v-tab value="two" class="tabHeader">Discount</v-tab>
                    <v-tab value="three" class="tabHeader">Limited</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one" class="wrapContent">
                    <v-card
                        v-for="(item, index) in cards.slice(0, 4)" :key="index"
                        class="tabCard"
                        max-width="344"
                        link>
                        <v-img :src="item.image" height="75%" cover></v-img>
                        <p class="discount">{{ item.discount }}</p>
                        <v-card-title>{{ item.title }}</v-card-title>
                        <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
                        <TabSpeedDial/>
                    </v-card>
                    </v-tabs-window-item>
            
                    <v-tabs-window-item value="two"  class="wrapContent">
                        <v-card
                        v-for="(item, index) in cards.slice(0, 4)" :key="index"
                        class="tabCard"
                        max-width="344"
                        link>
                        <v-img :src="item.image" height="75%" cover></v-img>
                        <p class="discount">{{ item.discount }}</p>
                        <v-card-title>{{ item.title }}</v-card-title>
                        <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
                        <TabSpeedDial/>
                    </v-card>
                    </v-tabs-window-item>
            
                    <v-tabs-window-item value="three"  class="wrapContent">
                            <v-card
                            v-for="(item, index) in cards.slice(0, 4)" :key="index"
                            class="tabCard"
                            max-width="344"
                            link>
                            <v-img :src="item.image" height="75%" cover></v-img>
                            <p class="discount">{{ item.discount }}</p>
                            <v-card-title>{{ item.title }}</v-card-title>
                            <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
                            <TabSpeedDial/>
                        </v-card>
                    </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
                </v-card>
            </v-lazy>
        </v-container>
    </v-app>
  </template>

<style lang="scss" scoped>
.TabApp {
    position: absolute;
    bottom: -275px;
    width: 100%!important;

    .tabContainer {
        max-width: 1350px;
        margin-left: 20px;

        .tabHeader {
            font-size: 30px;
        }

        .tabSpeedDial {
            position: absolute;
            right: 5px;
            bottom: 5px;
            height: auto !important;

            :deep(button) {
                background-color: #191919;
                color: white;
            }
        }

        .wrapContent {
            display: flex;
            gap: 20px;
            width: 95%;
            margin-left: 65px;
    
            .tabCard {
                background: white;
                height: 325px;
                box-shadow: none;
                border-radius: 0;
                width: 25%;
                position: relative;

                .discount {
                    position: absolute;
                    top: 10px;
                    right: 0;
                    background-color: white;
                    color: #191919;
                    padding: 5px 10px;
                    z-index: 10;
                }
            }
        }
    }

    :deep(.bg-primary),
    :deep(.v-card-text) {
        background-color: #191919 !important;
        padding: 0;
    }

    :deep(.v-card) {
        border-radius: 0;
    }

    :deep(.v-tab.v-tab.v-btn){
        min-width: 164.5px;
    }

    :deep(.v-card--variant-elevated) {
        box-shadow: none;
    }

    :deep(.v-window__container) {
        margin-top: 95px;
    }

    :deep(.v-slide-group__content) {
        margin-left: 65px;
    }
}
</style>