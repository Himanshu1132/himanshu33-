<template>
  <section class="header-main border-bottom">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xl-2 col-lg-3 col-md-12 text-center">
          <router-link to="/" class="brand-wrap">
            <img src="asset/img/logo/Good-Timing.png" height="16" />
          </router-link>
          <!-- brand-wrap.// -->
        </div>
        <div class="col-xl-6 col-lg-5 col-md-6">
          <form @submit.stop.prevent class="search-header">
            <div class="input-group w-100">
              <select class="custom-select border-right" value="shops">
                <option value="shops">Shops</option>
                <option value="individuals">Individuals</option>
                <option value="products">Products</option>
              </select>
              <input type="text" class="form-control" />

              <div class="input-group-append">
                <button
                  class="btn btn-white text-secondary border-top-0 border-right-0 border-bottom-0"
                  type="submit"
                  v-b-popover.hover.top="'Feature will premier with Launch'"
                >
                  <i class="fa fa-search" /> Search
                </button>
              </div>
            </div>
          </form>
          <!-- search-wrap .end// -->
        </div>
        <!-- col.// -->
        <div class="col-xl-4 col-lg-4 col-md-6">
          <div class="widgets-wrap float-md-right text-center">
            <div v-if="!authenticated" class="widget-header mr-3">
              <router-link
                :to="{ name: 'signin' }"
                class="widget-view cursor-pointer"
                v-b-popover.hover.top="'Use your Phiscal Account'"
                title="Sign In"
              >
                <div class="icon-area">
                  <i class="las la-sign-in-alt" />
                </div>
                <small class="text"> Log In </small>
              </router-link>
            </div>
            <div v-if="!authenticated" class="widget-header mr-3">
              <router-link :to="{ name: 'signup' }" class="widget-view cursor-pointer" title="Sign Up">
                <div class="icon-area">
                  <i class="las la-user-plus" />
                </div>
                <small class="text"> Get Account </small>
              </router-link>
            </div>
            <div v-if="authenticated" class="widget-header mr-3">
              <router-link :to="{ name: 'monitor' }" class="widget-view">
                <div class="icon-area">
                  <i class="las la-server" />
                </div>
                <small class="text"> Workspace </small>
              </router-link>
            </div>
            <div v-if="authenticated" class="widget-header mr-3">
              <a class="widget-view cursor-pointer">
                <div class="icon-area">
                  <i class="las la-sign-out-alt" />
                </div>
                <small class="text"> Sign Out </small>
              </a>
            </div>
          </div>
          <!-- widgets-wrap.// -->
        </div>
        <!-- col.// -->
      </div>
      <!-- row.// -->
    </div>
    <!-- container.// -->
  </section>
  <!-- header-main .// -->
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', ['authenticated'])
  }
};
</script>
