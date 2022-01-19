<template>
  <div>
    <!--begin::Content header-->
    <div class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-0 px-10">
      <div>
        <span class="font-weight-bold font-size-3 text-dark-60"> Don't have an account yet? </span>
        <router-link :to="{ name: 'signup' }" class="font-weight-bold font-size-3 ml-2"> Get Account</router-link>
      </div>
      <div>
        <span class="font-weight-bold font-size-3 text-dark-60"> Forgot Password? </span>
        <a href="https://www.phiscal.site/#/forgot" class="font-weight-bold font-size-3 ml-2"> Perform Reset!</a>
      </div>
    </div>
    <!--end::Content header-->
    <!--begin::Signup-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Sign In</h3>
        <p class="text-muted font-weight-semi-bold">User your Phiscal account to log into your Nishe subscription</p>
      </div>
      <!--begin::Form-->
      <b-form class="form" @submit.stop.prevent="onSubmit">
        <div role="alert" v-bind:class="{ show: errors.length }" class="alert fade alert-danger">
          <div class="alert-text" v-for="(error, i) in errors" :key="i">
            {{ error }}
          </div>
        </div>

        <b-form-group label="Email Address" label-for="email-input">
          <b-form-input
            id="email-input"
            type="email"
            class="form-control bg-secondary h-auto py-3 px-4 rounded-0"
            placeholder="username@domain.tld"
            aria-describedby="email-input-feedback"
            :state="validateState('email')"
            v-model="$v.form.email.$model"
            @input="delayTouch($v.form.email)"
          />
          <b-form-invalid-feedback id="email-input-feedback">
            <span v-if="!$v.form.email.required">Please supply your login Email Account.</span>
            <span v-if="!$v.form.email.email">Invalid Email Address.</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Password" label-for="password-input">
          <b-form-input
            id="password-input"
            type="password"
            class="form-control bg-secondary h-auto py-3 px-4 rounded-0"
            placeholder="supersecretphrase"
            aria-describedby="password-input-feedback"
            :state="validateState('password')"
            v-model="$v.form.password.$model"
            @input="delayTouch($v.form.password)"
          />
          <b-form-invalid-feedback :state="validateState('password')" id="password-input-feedback">
            Password is at least 8 charactors.
          </b-form-invalid-feedback>
        </b-form-group>

        <!--begin::Action-->
        <div class="form-group d-flex flex-wrap justify-content-between align-items-center">
          <b-form-checkbox
            size="lg"
            class="text-dark-60 text-hover-primary my-3 mr-2 cursor-pointer"
            switch
            @change="
              ($v) => {
                form.remember = $v;
              }
            "
          >
            <b> Remember Me </b>
          </b-form-checkbox>
          <b-button
            type="submit"
            :disabled="busy"
            :class="{ 'spinner spinner-light spinner-right': busy }"
            class="btn btn-dark font-weight-bold px-9 py-2 my-2 font-size-4"
            squared
            >Sign In</b-button
          >
        </div>
        <!--end::Action-->
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signup-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { email, minLength, required } from 'vuelidate/lib/validators';

import { SIGNIN } from '@/core/store/module/rest/auth';

const touchMap = new WeakMap();

export default {
  mixins: [validationMixin],
  name: 'SignIn',
  computed: {
    ...mapGetters('auth', ['authenticated'])
  },
  data: function () {
    return { form: { email: null, password: null, remember: false }, errors: [], busy: false };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      remember: {}
    }
  },
  mounted: function () {
    if (this.authenticated) {
      this.$router.push({ name: 'monitor' });
    }
    this.errors = this.$route.params.errors || [];
  },
  methods: {
    ...mapActions('auth', [SIGNIN]),
    validateState: function (name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    delayTouch: function ($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 3000));
    },
    resetForm: function () {
      this.form = { email: null, password: null };
      this.$nextTick().then(() => {
        this.$v.$reset();
      });
    },
    onSubmit: async function () {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.busy = true;
      await this[SIGNIN](this.form)
        .then(() => this.$router.push({ name: 'monitor' }))
        .catch((ex) => {
          this.errors = ex;
        });
      this.busy = false;
    }
  }
};
</script>
