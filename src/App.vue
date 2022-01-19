<template>
  <router-view />
</template>

<style lang="scss">
// 3rd party plugins css
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~perfect-scrollbar/css/perfect-scrollbar.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
@import '~line-awesome/dist/line-awesome/css/line-awesome.css';
@import 'asset/plugin/flaticon/flaticon.css';
@import 'asset/plugin/flaticon2/flaticon.css';
@import 'asset/plugin/keenthemes-icons/font/ki.css';

// Main style scss
@import '@/asset/sass/style.vue';
</style>

<style>
.cursor-pointer {
  cursor: pointer;
}
button:disabled {
  cursor: default !important;
}
label.required::after {
  content: '*';
  position: relative;
  font-size: inherit;
  color: #f1416c;
  padding-left: 0.25rem;
  font-weight: 700;
}
label.required::after {
  font-size: 18px;
  line-height: 14px;
}
.v-center {
  top: 50%;
  transform: translateY(-50%);
}
.h-center {
  left: 50%;
  transform: translateX(-50%);
}

.modal-footer .btn {
  border-radius: 0;
  margin: 0;
}
</style>
