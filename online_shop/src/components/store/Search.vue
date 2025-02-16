<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import Navbar from '../navigation/navbar.vue'
import Filter from './Filter.vue';

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <v-container class="searchContainer">
      <div class="wrapSearch">
        <v-text-field
          :modelValue="modelValue"
          @update:modelValue="emit('update:modelValue', $event)"
          label="Search..."
          density="compact"
          variant="outlined"
          class="searchInput"
          hide-details
          prepend-inner-icon="mdi-magnify"
        />
      <Filter/>
      <Navbar propNavbarContainer="propNavContainer"/>
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

.propNavContainer {
    margin: 0;
    height: 0;
}
</style>