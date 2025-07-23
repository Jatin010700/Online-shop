<script setup>
  import Navbar from '../navigation/Navbar.vue';
  import Header from './Header.vue'
  import Slider from './Slider.vue'
  import Footer from './Footer.vue'
  import Tab from './Tab.vue';
</script>

<template>
    <Header intro="Welcome To Our Shop!" msg="ONLINE SHOP" />
    <Navbar/>
    <Slider/>
    <Tab/>
    <Footer propFooterSub="custom-footer"/>
</template>

<style lang="scss" scoped>
.custom-footer {
  margin-top: 30px;
}
</style>