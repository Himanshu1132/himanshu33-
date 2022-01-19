<template>
  <b-container class="py-5">
    <b-overlay :show="busy" spinner-type="grow" rounded="sm">
      <b-jumbotron bg-variant="secondary" text-variant="dark" border-variant="dark" class="rounded-0">
        <template #header><b-skeleton type="input" width="45%" /></template>

        <template #lead> <b-skeleton /><b-skeleton /> </template>

        <hr class="my-4" />
        <b-skeleton />
      </b-jumbotron>
    </b-overlay>
  </b-container>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_AUTH } from '@/core/store/module/rest/auth';
export default {
  name: 'Redirect',
  data: function () {
    return { busy: true };
  },
  mounted: function () {
    switch (this.$route.params.source) {
      case 'registration':
        this[SET_AUTH](this.$route.params.artifact);
        this.$router.push({ name: 'industry' });
        break;
    }
  },
  methods: {
    ...mapMutations('auth', [SET_AUTH])
  }
};
</script>
