<template>
  <div class="d-flex flex-column flex-root" v-if="authenticated">
    <!-- begin:: Header Mobile -->
    <HeaderMobile />
    <!-- end:: Header Mobile -->

    <Loader v-if="loaderEnabled" v-bind:logo="loaderLogo" />

    <!-- begin::Body -->
    <div class="d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <Aside v-if="asideEnabled" />
      <!-- end:: Aside Left -->

      <div id="wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Content -->
        <div id="content" class="content d-flex flex-column flex-column-fluid">
          <!-- begin:: Content Head -->
          <Subheader v-if="subheaderDisplay" v-bind:breadcrumbs="breadcrumbs" v-bind:title="pageTitle" />
          <!-- end:: Content Head -->

          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid': contentFluid,
                container: !contentFluid
              }"
            >
              <transition name="fade-in-up">
                <router-view />
              </transition>
            </div>
          </div>
          <!-- end:: Content Body -->
        </div>
        <Footer />
        <!-- end:: Content -->
      </div>
    </div>
    <!-- end::Body -->
    <StickyToolbar />
    <ScrollTop />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ADD_BODY_CLASSNAME } from '@/core/store/module/template/htmlclass';
import Aside from '@/view/layout/aside/Aside.vue';
import Footer from '@/view/layout/footer/Admin.vue';
import HeaderMobile from '@/view/layout/header/admin/HeaderMobile.vue';
import HtmlClass from '@/core/service/htmlclass';
import Loader from '@/view/content/Loader.vue';
import ScrollTop from '@/view/layout/extra/ScrollTop';
import StickyToolbar from '@/view/layout/extra/StickyToolbar.vue';
import Subheader from '@/view/layout/header/admin/Subheader.vue';

export default {
  name: 'Admin',
  components: { Aside, Footer, HeaderMobile, Loader, ScrollTop, StickyToolbar, Subheader },
  beforeMount: function () {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading');

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted: function () {
    // check if current user is authenticated
    if (!this.authenticated) {
      this.$router.push({ name: 'login' });
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated']),
    ...mapGetters(['breadcrumbs', 'layoutConfig', 'pageTitle']),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled: function () {
      return !/false/.test(this.layoutConfig('loader.type'));
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid: function () {
      return this.layoutConfig('content.width') === 'fluid';
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo: function () {
      return process.env.BASE_URL + this.layoutConfig('loader.logo');
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled: function () {
      return !!this.layoutConfig('aside.self.display');
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay: function () {
      // return !!this.layoutConfig("toolbar.display");
      return true;
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay: function () {
      return !!this.layoutConfig('subheader.display');
    }
  }
};
</script>
