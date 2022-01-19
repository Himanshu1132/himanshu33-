<template>
  <section>
    <b-row class="justify-content-center" no-gutters>
      <b-alert class="mt-5 rounded-0" show variant="secondary">
        <h4 class="alert-heading">
          A verification email has been sent to address <u>{{ email }}</u>
        </h4>
        <p>
          If you misspelled your <b>email address</b> by accident, please
          <b-btn class="text-danger" variant="link" @click="revert" squared>click here</b-btn> to undo signup and start over.
        </p>
        <hr />
        <p class="mb-0">
          Please log into your mailbox, and locate the verification email delivered from Phiscal, to activate account and continue with
          process..
        </p>
        <p class="mb-0">If you can't find the verification mail in your inbox, please check your spam/junk mail.</p>
        <p class="mb-0">Gmail might catalogue this mail under the "Promotions" tab.</p>
      </b-alert>
      <b-img class="w-100" style="margin-top: -64px" src="asset/img/bg/waves.png" />
    </b-row>
  </section>
</template>
<script>
import { mapActions } from 'vuex';
import { RM_USER } from '@/core/store/module/rest/auth';
import { router } from '@/router';

export default {
  name: 'NewAccount',
  data() {
    return {
      email: null,
      snack: {
        multiLine: true,
        active: false
      },
      errors: []
    };
  },
  mounted() {
    this.email = this.$route.params.email;
    if (typeof this.email !== 'string' || this.email.trim().length < 1) {
      router.push('/');
    }
  },
  methods: {
    ...mapActions('auth', [RM_USER]),
    async revert() {
      await this[RM_USER]()
        .then(() => {
          router.push('/signup');
        })
        .catch((errors) => {
          this.errors = errors;
          this.snack.active = true;
        });
    }
  }
};
</script>
<style scoped>
.h1 {
  font-size: 28px !important;
}

@media screen and (min-width: 768px) {
  .h1 {
    font-size: 52px !important;
  }
}
</style>
