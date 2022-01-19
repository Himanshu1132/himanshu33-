<template>
  <div>
    <Loader v-if="loaderEnabled" v-bind:logo="loaderLogo" />

    <header class="section-header">
      <Header />
      <Subheader v-if="false" />
    </header>
    <router-view />
    <!--Footer /-->
  </div>
</template>

<style>
@import '../../asset/css/ui.css';
@import '../../asset/css/responsive.css';
</style>

<script>
import { mapGetters } from 'vuex';
import { ADD_BODY_CLASSNAME } from '@/core/store/module/template/htmlclass';
import HtmlClass from '@/core/service/htmlclass';
import Loader from '@/view/content/Loader.vue';
import Header from '@/view/layout/header/mall/Header';
import Subheader from '@/view/layout/header/mall/Subheader';
/* import Footer from '@/view/layout/footer/Mall'; */
export default {
  name: 'Mall',
  components: {
    Loader,
    Header,
    Subheader
    /* Footer */
  },
  computed: {
    ...mapGetters(['layoutConfig']),

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo: function () {
      return process.env.BASE_URL + this.layoutConfig('loader.logo');
    },

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled: function () {
      return !/false/.test(this.layoutConfig('loader.type'));
    }
  },
  beforeMount: function () {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading');

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  }
};
</script>
