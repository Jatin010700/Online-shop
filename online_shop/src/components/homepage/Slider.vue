<script setup>
import { ref } from 'vue';
import Tab from './Tab.vue'

const images = ref([
  new URL('../../assets/mouse.jpg', import.meta.url).href,
  new URL('../../assets/keyboard.jpg', import.meta.url).href,
  new URL('../../assets/game1.jpg', import.meta.url).href,
  new URL('../../assets/mouse.jpg', import.meta.url).href,
  new URL('../../assets/keyboard.jpg', import.meta.url).href
]);

</script>

<template>
  <v-app class="sliderApp">
    <Tab/>
    <v-container class="sliderContainer">
      <v-lazy
      :min-height="200"
      :options="{'threshold':0.5}"
      transition="fade-transition">
        <v-carousel
          height="400"
          show-arrows="hover"
          cycle
          hide-delimiter-background
          delimiter-icon="mdi-circle"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right">
            <v-carousel-item v-for="(image, i) in images" :key="i">
              <v-img :src="image" height="100%" cover class="carousel-image"></v-img>
            </v-carousel-item>
        </v-carousel>
      </v-lazy>
    </v-container> 
  </v-app>
</template>

<style lang="scss" scoped>
.sliderApp {
    background-color: #191919;
    color: white;
    margin-right: 10px;

    
    .sliderContainer {
      max-width: 760px;
      margin-right: 0;
    }
}

:deep(.v-carousel .v-btn) {
  color: #191919;
}

:deep(.v-application__wrap) {
  min-height: 0;
  background-color: #191919;
}
</style>