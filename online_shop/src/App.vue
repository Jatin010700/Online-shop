<script setup>
  import Footer from './components/homepage/Footer.vue'
  import Drawer from './components/navigation/Drawer.vue'
</script>

<template>
    <Drawer/>
      <router-view></router-view>
    <Footer/>
</template>