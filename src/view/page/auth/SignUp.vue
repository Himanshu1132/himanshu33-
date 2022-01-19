<template>
  <div>
    <!--begin::Content header-->
    <div class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
      <span class="font-weight-bold font-size-3 text-dark-60"> Already have an account? </span>
      <router-link :to="{ name: 'signin' }" class="font-weight-bold font-size-3 ml-2"> Log In</router-link>
    </div>
    <!--end::Content header-->
    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Sign Up</h3>
        <p class="text-muted font-weight-semi-bold">Fill up the registration form below to claim yourself a <b>Phiscal</b> account</p>
      </div>
      <!--begin::Form-->
      <b-form class="form" @submit.stop.prevent="onSubmit">
        <div role="alert" v-bind:class="{ show: errors.length }" class="alert fade alert-danger">
          <div class="alert-text" v-for="(error, i) in errors" :key="i">
            {{ error }}
          </div>
        </div>
        <b-container fluid>
          <b-row>
            <b-col sm="12" md="4" class="px-0">
              <b-form-group label="First Name" label-class="required" label-for="firstname-input" description="Explains Itself">
                <b-form-input
                  id="firstname-input"
                  type="text"
                  placeholder="Terry"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.form.firstname.$model"
                  :state="validateState($v.form.firstname)"
                  aria-describedby="firstname-feedback"
                  @input="delayTouch($v.form.firstname)"
                />
                <b-form-invalid-feedback id="firstname-feedback">
                  <span v-if="!$v.form.firstname.required">First Name is required.</span>
                  <span v-if="!$v.form.firstname.minLength">First Names are at least 2 characters.</span>
                  <span v-if="!$v.form.firstname.maxLength">First Names are at max 20 characters.</span>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="4" class="px-0">
              <b-form-group label="Last Name" label-class="required" label-for="lastname-input" description="Family Name">
                <b-form-input
                  id="lastname-input"
                  type="text"
                  placeholder="Davis"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.form.lastname.$model"
                  :state="validateState($v.form.lastname)"
                  aria-describedby="lastname-feedback"
                  @input="delayTouch($v.form.lastname)"
                />
                <b-form-invalid-feedback id="lastname-feedback">
                  <span v-if="!$v.form.lastname.required">Last Name is required.</span>
                  <span v-if="!$v.form.lastname.minLength">Last Names are at least 2 characters.</span>
                  <span v-if="!$v.form.lastname.maxLength">Last Names are at max 20 characters.</span>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="4" class="px-0">
              <b-form-group label="Nationality" label-class="required" label-for="nationality-select" description="Not Current Citizenship">
                <b-form-select
                  id="nationality-select"
                  type="text"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  :options="nations"
                  v-model="$v.form.nationality.$model"
                  :state="validateState($v.form.nationality)"
                  aria-describedby="nationality-feedback"
                />
                <b-form-invalid-feedback :state="validateState($v.form.nationality)" id="nationality-feedback">
                  Please select your Nationality.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" class="px-0">
              <b-form-group
                label="ID Number"
                :label-class="{ required: form.nationality === 'ZA' }"
                label-for="idnumber-input"
                description="Don't use Spaces"
              >
                <b-form-input
                  id="idnumber-input"
                  type="text"
                  placeholder="Social Security Number"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.form.idnumber.$model"
                  :state="validateState($v.form.idnumber)"
                  aria-describedby="idnumber-feedback"
                  @input="delayTouch($v.form.idnumber)"
                />
                <b-form-invalid-feedback id="idnumber-feedback">
                  <span v-if="!$v.form.idnumber.required">ID Number is required.</span>
                  <span v-if="!$v.form.idnumber.rasId">Invalid ID Number.</span>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" class="px-0">
              <b-form-group
                label="Email Address"
                label-class="required"
                label-for="email-input"
                description="For outside Nishe Communication"
              >
                <b-form-input
                  id="email-input"
                  type="email"
                  placeholder="username@domain.tld"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.form.email.$model"
                  :state="validateState($v.form.email)"
                  aria-describedby="email-feedback"
                  @input="delayTouch($v.form.email)"
                />
                <b-form-invalid-feedback id="email-feedback">
                  <span v-if="!$v.form.email.required">Your Email Address is required.</span>
                  <span v-if="!$v.form.email.email">Invalid Email Address.</span>
                  <span v-if="!$v.form.email.unique">Email Address matched in Database.</span>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" class="px-0">
              <b-form-group label="Password" label-class="required" label-for="password-input" description="Create Strong Password">
                <b-form-input
                  id="password-input"
                  type="password"
                  placeholder="sup3rSecr?tKey"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.form.password.$model"
                  :state="validateState($v.form.password)"
                  aria-describedby="password-feedback"
                  @input="delayTouch($v.form.password)"
                />
                <b-form-invalid-feedback id="password-feedback">
                  <span v-if="!$v.form.password.required">A Password is required.</span>
                  <span v-if="!$v.form.password.minLength">Use at minimum 8 characters.</span>
                  <span v-if="!$v.form.password.summary">
                    Password lacks&nbsp;
                    <span v-if="!$v.form.password.uppercase"><u>Uppercases</u>, </span>
                    <span v-if="!$v.form.password.lowercase"><u>Lowercases</u>, </span>
                    <span v-if="!$v.form.password.symbol"><u>Symbol</u>, </span>
                    <span v-if="!$v.form.password.digit"><u>Digits</u>, </span>
                  </span>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" class="px-0">
              <b-form-group label="Password" label-class="required" label-for="repasswd-input" description="Confirm New Password">
                <b-form-input
                  id="repasswd-input"
                  type="password"
                  placeholder="sup3rSecr?tKey"
                  class="form-control form-control-solid h-auto py-3 px-4 rounded-0"
                  v-model="$v.repasswd.$model"
                  :state="validateState($v.repasswd)"
                  aria-describedby="repasswd-feedback"
                  @input="delayTouch($v.repasswd)"
                />
                <b-form-invalid-feedback :state="validateState($v.repasswd)" id="repasswd-feedback">
                  Passwords don't Match
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
        <b-form-group class="text-center">
          <b-form-checkbox v-model="$v.tnc.$model" :state="validateState($v.tnc)" aria-describedby="tnc-feedback">
            I accept the <a href="https://www.phiscal.site/#/tnc" target="_blank">terms of service</a>
          </b-form-checkbox>
          <b-form-invalid-feedback :state="validateState($v.tnc)" id="tnc-feedback">
            Please read and accept Terms of Services.
          </b-form-invalid-feedback>
        </b-form-group>

        <!--begin::Action-->
        <div class="form-group d-flex flex-wrap flex-center">
          <b-button-group>
            <b-button v-on:click="$router.push('/')" class="btn btn-light-dark font-weight-bold px-9 py-2 my-2 font-size-3" squared
              >Cancel</b-button
            >
            <b-button
              type="submit"
              :disabled="busy"
              :class="{ 'spinner spinner-light spinner-right': busy }"
              class="btn btn-dark font-weight-bold px-9 py-2 my-2 font-size-3"
              squared
              >Submit</b-button
            >
          </b-button-group>
        </div>
        <!--end::Action-->
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>
<script>
import { mapActions } from 'vuex';

import { validationMixin } from 'vuelidate';
import { email, minLength, maxLength, required, requiredIf } from 'vuelidate/lib/validators';
const validSouthAfricanId = require('valid-south-african-id');
const { passwordStrength } = require('check-password-strength');

import { SIGNUP } from '@/core/store/module/rest/auth';

const touchMap = new WeakMap();

import Api from '@/core/service/api';

export default {
  mixins: [validationMixin],
  name: 'SignUp',
  data() {
    return {
      form: { firstname: null, lastname: null, nationality: null, idnumber: null, email: null, password: null },
      repasswd: null,
      tnc: false,
      nations: [],
      errors: [],
      busy: false
    };
  },
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
      lastname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
      nationality: { required },
      idnumber: {
        required: requiredIf(function () {
          return this.form.nationality === 'ZA';
        }),
        rsaId(value) {
          if (this.form.nationality !== 'ZA') return true;
          if (!required(value)) return true;
          return validSouthAfricanId(value);
        }
      },
      email: {
        required,
        email,
        async unique(value) {
          if (!required(value)) return true;
          if (!email(value)) return true;
          const { data } = await Api.get(`${process.env.VUE_APP_PARENT}/user/check/email/${value}`);
          return data.value === false;
        }
      },
      password: {
        required,
        minLength: minLength(8),
        summary(value) {
          if (!required(value) || value.length < 8) return true;
          return passwordStrength(value).id > 1;
        },
        uppercase(value) {
          if (!required(value) || value.length < 8) return true;
          return passwordStrength(value).contains.includes('uppercase');
        },
        lowercase(value) {
          if (!required(value) || value.length < 8) return true;
          return passwordStrength(value).contains.includes('lowercase');
        },
        symbol(value) {
          if (!required(value) || value.length < 8) return true;
          return passwordStrength(value).contains.includes('symbol');
        },
        digit(value) {
          if (!required(value) || value.length < 8) return true;
          return passwordStrength(value).contains.includes('number');
        }
      }
    },
    repasswd: {
      required,
      retype(value) {
        if (!required(value)) return true;
        return value === this.$v.form.password.$model;
      }
    },
    tnc: {
      accepted(value) {
        return value;
      }
    }
  },
  async mounted() {
    this.nations = await this.getCountries();
  },
  methods: {
    ...mapActions('auth', [SIGNUP]),
    validateState(input) {
      const { $dirty, $error } = input;
      return $dirty ? !$error : null;
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 3000));
    },
    resetForm() {
      this.form = { firstname: null, lastname: null, nationality: null, idnumber: null, email: null, password: null };
      this.$nextTick().then(() => {
        this.$v.$reset();
      });
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      this.busy = true;

      // send register request
      await this[SIGNUP](this.form)
        .then(() => this.$router.push({ name: 'accounted', params: { email: this.form.email } }))
        .catch((errors) => {
          this.errors = errors;
        });
      this.busy = false;
    },
    async getCountries() {
      const {
        data: { value }
      } = await Api.get(`${process.env.VUE_APP_PARENT}/index/nations`);
      let list = [{ text: 'Country of Origin', value: null }];
      for (let item of value) {
        list.push({ text: item.name, value: item.id });
      }
      return list;
    }
  }
};
</script>
