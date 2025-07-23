<script setup>
import { ref } from 'vue';

const images = ref([
  {
    imageURL: new URL('../../assets/mouse.webp', import.meta.url).href,
    title: 'Mouse scarlet version 2.58',
  },
  {
    imageURL: new URL('../../assets/keyboard.webp', import.meta.url).href,
    title: 'Keyboard razer scarlet version 1.4',
  },
  {
    imageURL: new URL('../../assets/game.webp', import.meta.url).href,
    title: 'Elden ring',
  },
  {
    imageURL: new URL('../../assets/mouse.webp', import.meta.url).href,
    title: 'Mouse scarlet version 2.58',
  },
  {
    imageURL: new URL('../../assets/keyboard.webp', import.meta.url).href,
    title: 'Keyboard razer scarlet version 1.4',
  }
]);

</script>

<template>
  <v-app class="sliderApp">
    <v-container class="sliderContainer">
      <div class="sliderLeft">
        <h1>FEATURED ITEMS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quos sunt ratione dolor exercitationem minima quas itaque saepe 
          quasi architecto vel! Accusantium, 
          vero sint recusandae cum tempora nemo commodi soluta deleniti.
        </p>
      </div>
  <div class="sliderRight">
    <v-lazy
    :min-height="200"
    :options="{'threshold':0.5}"
    transition="fade-transition">
      <v-carousel
        height="400"
        cycle
        show-arrows="hover"
        hide-delimiter-background
        delimiter-icon="mdi-square"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right">
          <v-carousel-item v-for="(image, i) in images" :key="i" class="wrapText">
            <p :class="'imageText-' + i">{{ image.title }}</p>
            <v-img :src="image.imageURL" height="100%" cover class="carousel-image"></v-img>
          </v-carousel-item>
      </v-carousel>
    </v-lazy>
  </div>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
.sliderApp {
    background-color: #191919;
    color: white;
    padding-right: 30px;
    margin-left: 100px;

    .sliderContainer {
      padding: 0;
      display: flex;
      align-items: center;

      .sliderLeft {
        width: 80%;

        h1 {
          font-size: 50px;
        }

        p {
          width: 60%;
        }
      }

      .sliderRight {
        width: 100%;
      }

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

:deep(.v-carousel__controls__item .v-icon) {
  transform: rotate(45deg);
}

:deep(.v-carousel__controls__item) {
  border-radius: 0!important;

  &:hover {
    transform: rotate(45deg);
  }
}

:deep(.v-btn--icon) {
  border-radius: 0!important;
}

@media (min-width: 1280px) {
    .v-container {
        max-width: none;
    }
}
</style>