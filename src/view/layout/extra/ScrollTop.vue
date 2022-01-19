<template>
  <!-- begin::Scrolltop -->
  <div id="scrolltop" ref="scrolltop" class="scrolltop">
    <span class="svg-icon">
      <inline-svg src="asset/img/svg/icon/navigation/Up-2.svg" />
    </span>
  </div>
  <!-- end::Scrolltop -->
</template>

<script>
import LayoutScrolltop from '@/asset/js/layout/extended/scrolltop.js';

export default {
  name: 'ScrollTop',
  mounted() {
    // Init Scrolltop
    LayoutScrolltop.init(this.$refs['scrolltop']);
  }
};
</script>
