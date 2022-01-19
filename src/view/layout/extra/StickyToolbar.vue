<template>
  <div>
    <!-- begin::Sticky Toolbar -->
    <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4 rounded-0">
      <!--li v-b-tooltip.hover.left="'Layout builder'" class="nav-item mb-2">
        <router-link :to="{ name: 'builder' }" class="btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-primary">
          <i class="flaticon2-gear" />
        </router-link>
      </li-->
      <li v-for="(item, i) in list" :key="i" v-b-tooltip.hover.left="item.title" class="nav-item">
        <a :href="item.href" class="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning" target="_blank">
          <i :class="item.icon" />
        </a>
      </li>
    </ul>
    <!-- end::Sticky Toolbar -->
  </div>
</template>

<script>
export default {
  name: 'StickyToolbar',
  computed: {
    list: function () {
      return [{ title: 'Terms of Service', href: `${process.env.VUE_APP_WEB_PHISCAL}/#/tnc`, icon: 'flaticon-attachment' }];
    }
  },
  data: function () {
    return {};
  },
};
</script>
