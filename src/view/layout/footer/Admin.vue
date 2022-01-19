<template>
  <!-- begin:: Footer -->
  <div class="footer py-4 d-flex flex-lg-column" id="footer">
    <!--begin::Container-->
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span v-if="currentTenant.website === null" class="text-dark-75">
          {{ currentEntity === false ? '' : `${currentEntity.trademark}` }}
        </span>
        <a v-if="currentTenant.website !== null" :href="currentTenant.website" class="text-dark-75 text-hover-primary" target="_blank">
          {{ currentEntity === false ? '' : `${currentEntity.trademark}` }}
        </a>
        <span class="text-muted font-weight-bold mr-2"> {{ new Date().getFullYear() }} </span>
        <a class="text-dark-75 text-hover-primary">Nishe </a>
        <span class="text-muted font-weight-bold mr-2">Market</span>
      </div>
      <!--end::Copyright-->
      <!--begin::Nav-->
      <div class="nav nav-dark order-1 order-md-2">
        <a href="https://www.phiscal.site/#/tnc" target="_blank" class="nav-link px-3">Terms</a>
        <a href="https://www.phiscal.site/#/contactus" target="_blank" class="nav-link pl-3 pr-0">Contact Us</a>
      </div>
      <!--end::Nav-->
    </div>
    <!--end::Container-->
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',
  computed: {
    ...mapGetters(['layoutConfig']),
    ...mapGetters('auth', ['currentTenant', 'currentEntity']),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig('footer.width') === 'fluid';
    }
  }
};
</script>
