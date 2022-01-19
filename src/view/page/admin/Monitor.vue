<template>
  <div>
    <b-alert v-for="(error, i) in errors" :key="i" show dismissible variant="danger">{{ error }}</b-alert>
    <!--begin::Dashboard-->
    <b-row>
      <b-col col-xl="12">
        <Feed :title="feed.title" :message="feed.message" />
      </b-col>
    </b-row>
    <!--end::Dashboard-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SET_BREADCRUMB } from '@/core/store/module/template/breadcrumbs';
import { ADD_BODY_CLASSNAME, REMOVE_BODY_CLASSNAME } from '@/core/store/module/template/htmlclass.js';
import Feed from '@/view/content/widget/Feed.vue';

export default {
  name: 'Monitor',
  components: { Feed },
  computed: {
    ...mapGetters('auth', ['currentTenant', 'currentUser', 'currentEntity'])
  },
  data: function () {
    return { feed: { title: null, message: null }, errors: [] };
  },
  mounted: function () {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Monitor' }]);
    if (this.currentEntity === false) {
      switch (this.currentUser.tenants.length) {
        case 0:
          this.feed.title = 'No Business Subscribed';
          this.feed.message = 'Subscription currently has no activity.';
          break;
        default:
          this.feed.title = 'No Business Selected';
          this.feed.message = "There's currently no statistics to present.";
          break;
      }
    } else {
      this.feed.title = 'No Activity';
      this.feed.message = "There's currently no statistics to present.";
    }
    this.errors = this.$route.params.errors || [];

    this.$nextTick().then(() => {
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
    });
  }
};
</script>
