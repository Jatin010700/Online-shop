<script setup>
  import { ref, computed, inject } from 'vue';
  import Navbar from '../navigation/Navbar.vue';
  import { useToast } from "vue-toastification";

  const dialog = ref(false);
  const slider = ref([0, 0]);
  const slider2 = ref([0, 0]);
  // amentities is for chips group
  const amenities = ref([]);
  const toast = useToast();

  const props = defineProps(["searchQuery", "selectedFilters"]);
  const emit = defineEmits(["update:searchQuery", "update:selectedFilters"]);

  // REMINDER: provide and inject to manage to state across component
  // GET all prodcut from store component
  const products = inject('products');

  const sliderPriceDecimal = (sliderRef) => computed({
    get: () => sliderRef.value.map(num => Number(num).toFixed(2)),
    set: (values) => {
      sliderRef.value = values.map(value => parseFloat(value));
    },
  });

  const sliderPrice1 = sliderPriceDecimal(slider);
  const sliderPrice2 = sliderPriceDecimal(slider2);

  // FILTER discount from product
  const discounts = products.value
    .filter(product => product.discount !== null)
    .map(product => product.discount);

  // FILTER item_status with LIMITED from product
  const limited = products.value
    .filter(product => product.item_status === "LIMITED")
    .map(product => product.item_status);

  // FILTER item_status with NEW ITEM from product
  const newItem = products.value
    .filter(product => product.item_status === "NEW")
    .map(product => product.item_status);

  // FILTER CHECKBOX
  const items = ref([
    { title: 'NEW ITEMS', value: newItem.length > 0 ? newItem : false },
    { title: 'DISCOUNT', value: discounts.length > 0 ? discounts : false },
    { title: 'LIMITED', value: limited.length > 0 ? limited : false },
    { title: 'ITEM 4', value: false },
    { title: 'ITEM 5', value: false },
    { title: 'ITEM 6', value: false },
  ]);

  // FILTER CHIPS
  const lists = ref([
    { text: 'GAMES', value: false },
    { text: 'LIMITED', value: limited.length > 0 ? limited : false },
    { text: 'TELEVISION', value: false },
    { text: 'ACCESSORIES', value: false },
    { text: 'GADJETS', value: false },
    { text: 'PC PARTS', value: false },
    { text: 'ITEM 4', value: false },
    { text: 'ITEM 5', value: false },
    { text: 'ITEM 6', value: false },
    { text: 'ITEM 7', value: false },
    { text: 'ITEM 8', value: false },
    { text: 'ITEM 9', value: false },
    { text: 'ITEM 10', value: false },
    { text: 'ITEM 11', value: false },
    { text: 'ITEM 12', value: false },
    { text: 'ITEM 13', value: false },
    { text: 'ITEM 14', value: false },
    { text: 'ITEM 15', value: false },
    { text: 'ITEM 16', value: false },
    { text: 'ITEM 17', value: false },
    { text: 'ITEM 18', value: false },
  ]);

  // ERROR: NOT WORKING FOR PRICE SLIDER
  // const priceRange = computed(() => {
  //   return [sliderPrice1.value[0], sliderPrice1.value[1]];
  // });
  // const priceRange2 = computed(() => {
  //   return [sliderPrice2.value[0], sliderPrice2.value[1]];
  // });

  // SAVE BUTTON
  const handleSave = (e) => {
    e.preventDefault();

    // Filter selected filters where value is true (checkbox is checked)
    const selectedFilters = [
      ...items.value.filter(item => item.value).map(item => item.title),
      ...amenities.value,
      // ERROR: NOT WORKING FOR PRICE SLIDER
      // ...priceRange.value.length ? [priceRange.value] : [],
      // ...priceRange2.value.length ? [priceRange2.value] : []
      // { priceRange: [sliderPrice1.value[0], sliderPrice1.value[1]] },
      // { priceRange2: [sliderPrice2.value[0], sliderPrice2.value[1]] }
    ];

    // Check if no filters are selected
    if (selectedFilters.length === 0) {
        toast.error("Please select at least one option before saving", { timeout: 3000 });
    } else {
      // Emit the selected filters if any checkbox is checked
      emit("update:selectedFilters", selectedFilters);
      dialog.value = false;
    }
  };

  // RESET CHECKBOX
  const handleReset = () => {
    // Reset all items to false (unchecked)
    items.value.forEach(item => {
      item.value = false;
    });

    //Reset chip group
    amenities.value = [];

    //Reset slider
    slider.value = [0, 0];
    slider2.value = [0, 0];

    // Emit the reset state (empty array)
    emit("update:selectedFilters", []);
    dialog.value = false;
  };

  const clearSearch = () => {
    emit('update:searchQuery', '');
  };
</script>

<template>
    <v-container class="searchContainer">
      <div class="wrapSearch">
        <v-text-field
          :modelValue="searchQuery"
          @update:modelValue="emit('update:searchQuery', $event)"
          label="Search..."
          density="compact"
          variant="outlined"
          class="searchInput"
          hide-details
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-close"
          @click:append-inner="clearSearch"
        />

        <!-- filter -->
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            transition="dialog-top-transition"
            fullscreen
            persistent
            no-click-animation>
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
                    text="RESET"
                    variant="text"
                    class="bg-white text-black"
                    @click="handleReset">
                </v-btn>
                <v-btn
                    text="Save"
                    variant="text"
                    class="bg-black"
                    @click="handleSave">
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
                    <v-checkbox-btn 
                      :modelValue="item.value"
                      @update:modelValue="item.value = $event; handleSave();"
                      color="bg-black">
                    </v-checkbox-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
              </div>
            </v-list>

            <div class="wrapSlider">
              <v-range-slider
                v-model="slider"
                class="align-center"
                hide-details
                thumb-color="#191919"
                color="#191919"
                thumb-label>
                <template v-slot:append>
                  <span style="width: 100px; text-align: center;">{{ sliderPrice1[0] }} - {{ sliderPrice1[1] }}</span>
                </template>
              </v-range-slider>
              <v-range-slider
                  v-model="slider2"
                  class="align-center"
                  hide-details
                  thumb-color="#191919"
                  color="#191919"
                  thumb-label>
                  <template v-slot:append>
                    <span style="width: 100px; text-align: center;">{{ sliderPrice2[0] }} - {{ sliderPrice2[1] }}</span>
                  </template>
              </v-range-slider>
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

    <Navbar propNavbarContainer="classPropNavContainer"/>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.searchContainer {
    padding: 16px 0;
    margin-right: 0;
    max-width: 1285px;

    .wrapSearch {
        display: flex;
        align-items: center;
        gap: 20px;

        :deep(.v-field) {
            border-radius: 0!important;
            font-size: 24px;
        }
    }

    .v-main {
        height: auto!important;
        background-color: #191919;
    }

    .v-card, .v-btn {
        border-radius: 0!important;
        font-size: 20px;
        color: #191919;
        height: 52px;
    }
}

.classPropNavContainer {
    margin: 0;
    height: 0;
}

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

:deep(.v-slide-group__content) {
  max-width: none;
}

.v-text-field {
    width: 81px!important;
}

:deep(.v-selection-control__input > .v-icon) {
  opacity: 1;
}

:deep(.v-slider-thumb__surface) {
  border-radius: 0;
  transform: rotate(45deg);
}
.wrapCheckbox-Slider {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wrapSlider {
    width: 70%;
  }
}

:deep(.v-slider > .v-input__append) {
  margin: 0 20px;
}
</style>