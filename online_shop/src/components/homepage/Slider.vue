<script setup>
import { ref } from 'vue';
import Tab from './Tab.vue'

const images = ref([
  {
    imageURL: new URL('../../assets/mouse.jpg', import.meta.url).href,
    title: 'Mouse scarlet version 2.58',
  },
  {
    imageURL: new URL('../../assets/keyboard.jpg', import.meta.url).href,
    title: 'Keyboard razer scarlet version 1.4',
  },
  {
    imageURL: new URL('../../assets/game1.jpg', import.meta.url).href,
    title: 'Elden ring',
  },
  {
    imageURL: new URL('../../assets/mouse.jpg', import.meta.url).href,
    title: 'Mouse scarlet version 2.58',
  },
  {
    imageURL: new URL('../../assets/keyboard.jpg', import.meta.url).href,
    title: 'Keyboard razer scarlet version 1.4',
  }
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
            <v-carousel-item v-for="(image, i) in images" :key="i" class="wrapText">
              <p :class="'imageText-' + i">{{ image.title }}</p>
              <v-img :src="image.imageURL" height="100%" cover class="carousel-image"></v-img>
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

      .wrapText {
        position: relative;

        .imageText-0,
        .imageText-1,
        .imageText-2,
        .imageText-3,
        .imageText-4  {
          position: absolute;
          z-index: 1;
          transform: rotate(90deg);
        }

        .imageText-0,
        .imageText-3 {
          right: -50px;
          top: 70px;
        }

        .imageText-1,
        .imageText-4 {
          right: 15px;
          bottom: 10px;
          transform: rotate(0deg);
        }

        .imageText-2 {
          left: 10px;
          top: 10px;
          transform: rotate(0deg);
        }
      }
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