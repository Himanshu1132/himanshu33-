<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<style lang="scss">
// Main style scss
@import '@/asset/sass/style.vue';
</style>

<script>
import Header from '@/view/layout/header/Skeletal.vue';

export default {
  name: 'Lockedout',
  components: { Header }
};
</script>
