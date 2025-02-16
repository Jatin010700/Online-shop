<script setup>
import { ref, computed } from 'vue';

const dialog = ref(false);

const slider = ref(0);
const slider2 = ref(0);
const max2 = ref(1000);

const amenities = ref([]);

const sliderPriceDecimal = (sliderRef) => computed({
  get: () => Number(sliderRef.value).toFixed(2),
  set: (value) => {
    sliderRef.value = parseFloat(value);
  },
});

const sliderPrice1 = sliderPriceDecimal(slider);
const sliderPrice2 = sliderPriceDecimal(slider2)

const items = ref([
  { title: 'NEW ITEMS', value: false },
  { title: 'DISCOUNT', value: false },
  { title: 'LIMITED', value: false },
  { title: 'ITEM 4', value: false },
  { title: 'ITEM 5', value: false },
  { title: 'ITEM 6', value: false },
]);

const lists = ref([
  { text: 'GAMES' },
  { text: 'COMPUTED' },
  { text: 'TELEVISION' },
  { text: 'ACCESSORIES' },
  { text: 'GADJETS' },
  { text: 'PC PARTS' },
  { text: 'ITEM 4' },
  { text: 'ITEM 5' },
  { text: 'ITEM 6' },
  { text: 'ITEM 7' },
  { text: 'ITEM 8' },
  { text: 'ITEM 9' },
  { text: 'ITEM 10' },
  { text: 'ITEM 11' },
  { text: 'ITEM 12' },
  { text: 'ITEM 13' },
  { text: 'ITEM 14' },
  { text: 'ITEM 15' },
  { text: 'ITEM 16' },
  { text: 'ITEM 17' },
  { text: 'ITEM 18' },
]);
</script>

<template>
     <div class="text-center">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        fullscreen>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            size="small"
            text="FILTER"
            v-bind="activatorProps"
          ></v-btn>
        </template>

        <v-card>
          <v-toolbar>
            <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            <v-toolbar-title>FILTER</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn
                    text="Save"
                    variant="text"
                    class="bg-black"
                    @click="dialog = false">
                </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <div class="wrapCheckbox-Slider">

            <v-list lines="two">
              <div class="checkboxGrid">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :title="item.title"
                  @click="item.value = !item.value"
                >
                <template v-slot:prepend>
                  <v-list-item-action start>
                    <v-checkbox-btn v-model="item.value" color="bg-black"></v-checkbox-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
              </div>
            </v-list>

            <div class="wrapSlider">

              <v-slider
              v-model="slider"
                class="align-center"
                hide-details
                thumb-color="#191919"
                color="#191919"
                thumb-label>
                <template v-slot:append>
                    <v-text-field
                    v-model="sliderPrice1"
                    density="compact"
                    style="width: 70px"
                    hide-details
                    single-line
                    variant="outlined"
                    ></v-text-field>
                </template>
                </v-slider>
  
              <v-slider
                  v-model="slider2"
                  :max="max2"
                  class="align-center"
                  hide-details
                  thumb-color="#191919"
                  color="#191919"
                  thumb-label>
              <template v-slot:append>
                  <v-text-field
                      v-model="sliderPrice2"
                      density="compact"
                      style="width: 70px"
                      hide-details
                      single-line
                      variant="outlined">
                  </v-text-field>
              </template>
              </v-slider>
            </div>
          </div>

        <v-chip-group
          v-model="amenities"
          column
          multiple
          selected-class="bg-black">
            <v-chip
              v-for="(list, index) in lists"
              :key="index"
              :value="list.text"
              variant="outlined"
              filter>
              {{ list.text }}
            </v-chip>
        </v-chip-group>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.v-card, .v-btn {
    border-radius: 0!important;
    font-size: 20px;
    color: #191919;
    height: 52px;
}

.sliderTitle {
    width: 7%;
}

.v-toolbar {
  background-color: white;
  
  .v-btn,
  .v-toolbar-title {
    font-size: 24px;
  }
}

.v-list--two-line {
    .checkboxGrid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr)
    }
}

:deep(.v-overlay__content) {
    height: 50%!important;
}

:deep(.v-slider-thumb__label) {
  border-radius: 0 !important;
}

:deep(.v-field),
:deep(.v-slider-track),
:deep(.v-chip) {
    border-radius: 0 !important;
}

.v-chip-group {
    padding: 20px 18px;
}

.v-input--horizontal {
    margin-inline: 0;
}

.v-text-field {
    width: 81px!important;
}

:deep(.v-selection-control__input > .v-icon) {
  opacity: 1;
}

.wrapCheckbox-Slider {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wrapSlider {
    width: 70%;
  }
}
</style>