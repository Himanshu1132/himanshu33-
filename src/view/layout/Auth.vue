<template>
  <div class="d-flex flex-column flex-root">
    <div class="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white">
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-15"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <!--begin: Aside Container -->
        <div class="d-flex flex-row-fluid flex-column justify-content-between">
          <!--begin: Aside header -->
          <span class="flex-column-auto">
            <router-link to="/">
              <img src="asset/img/logo/Nishe-letter-4.png" class="h-50" />
            </router-link>
          </span>
          <!--end: Aside header -->
          <!--begin: Aside content -->
          <div class="flex-column-fluid d-flex flex-column justify-content-center">
            <h3 class="font-size-h1 mt-10 mb-5 text-white">Welcome to the Nishe Market!</h3>
            <p class="font-weight-lighter text-white opacity-80">The E-Commerce Module to the Phiscal Project.</p>
          </div>
          <!--end: Aside content -->
          <!--begin: Aside footer for desktop -->
          <div class="d-none flex-column-auto d-lg-flex justify-content-between mt-15">
            <div class="opacity-70 font-weight-bold text-white">&copy; {{ new Date().getFullYear() }} - Nishe</div>
            <div class="d-flex">
              <a href="https://www.phiscal.site/#/tnc" class="text-white">Terms</a>
              <a href="https://www.phiscal.site/#/contactus" class="text-white ml-10">Contact Us</a>
            </div>
          </div>
          <!--end: Aside footer for desktop -->
        </div>
        <!--end: Aside Container -->
      </div>
      <!--end::Aside-->
      <!--begin::Content-->
      <div class="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
        <div class="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
          <router-view />
        </div>
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import '@/asset/sass/page/login/login-1.scss';
</style>
<script>
export default {
  name: 'Ath',
  computed: {
    backgroundImage() {
      return 'asset/img/bg/bg-7.jpg';
    }
  }
};
</script>
