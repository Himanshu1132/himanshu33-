<template>
  <b-overlay :show="busy" spinner-type="grow" rounded="sm">
    <b-modal
      v-model="cropper.active"
      title="Select Banner"
      :no-close-on-backdrop="true"
      header-bg-variant="secondary"
      header-text-variant="dark"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="secondary"
      footer-text-variant="dark"
      size="lg"
      header-class="py-0"
      body-class="p-0"
      footer-class="p-0"
    >
      <template #modal-header>
        <b-container fluid>
          <b-row>
            <b-col cols="4" md="5">
              <b-button disabled block class="text-left cursor-default">Banner</b-button>
            </b-col>
            <b-col cols="4" md="2">
              <b-button variant="danger" squared block v-b-tooltip title="Reset" @click.prevent="img.reset"
                ><i aria-hidden="true" class="fa fa-arrows-alt"
              /></b-button>
            </b-col>
            <b-col cols="2" md="4" />
            <b-col cols="2" md="1">
              <b-button block v-b-tooltip title="Cancel" @click.prevent="cropper.active = false"
                ><i aria-hidden="true" class="fa fa-times"
              /></b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :view-mode="1"
            :aspect-ratio="4.4444444444444446"
            :src="cropper.src"
            :auto-crop-area="1"
            :min-container-width="320"
            :min-canvas-width="320"
            :min-crop-box-width="240"
            alt="Source Image"
          />
        </div>
      </section>

      <template #modal-footer>
        <b-container fluid>
          <b-row>
            <b-col cols="12" md="4" class="text-center">
              <b-button-group>
                <b-button v-b-tooltip title="Move Left" @click.prevent="img.move(-10, 0)"
                  ><i aria-hidden="true" class="fa fa-caret-left"
                /></b-button>
                <b-button v-b-tooltip title="Move Down" @click.prevent="img.move(0, 10)"
                  ><i aria-hidden="true" class="fa fa-caret-down"
                /></b-button>
                <b-button v-b-tooltip title="Move Up" @click.prevent="img.move(0, -10)"
                  ><i aria-hidden="true" class="fa fa-caret-up"
                /></b-button>
                <b-button v-b-tooltip title="Move Right" @click.prevent="img.move(10, 0)"
                  ><i aria-hidden="true" class="fa fa-caret-right"
                /></b-button>
              </b-button-group>
            </b-col>
            <b-col cols="2" md="1">
              <b-button ref="flipX" block v-b-tooltip title="Flip Horizontally" @click.prevent="img.flipX"
                ><i aria-hidden="true" class="fa fa-arrows-alt-h"
              /></b-button>
            </b-col>
            <b-col cols="8" md="2">
              <b-button variant="success" block v-b-tooltip title="Crop Image" @click.prevent="img.crop({ width: 1600, height: 360 })"
                ><i aria-hidden="true" class="fa fa-crop"
              /></b-button>
            </b-col>
            <b-col cols="2" md="1">
              <b-button ref="flipY" block v-b-tooltip title="Flip Vertically" @click.prevent="img.flipY"
                ><i aria-hidden="true" class="fa fa-arrows-alt-v"
              /></b-button>
            </b-col>
            <b-col cols="12" md="4" class="text-center">
              <b-button-group>
                <b-button v-b-tooltip title="Rotate 90 Degrees Left" @click.prevent="img.rotate(-90)"
                  ><i aria-hidden="true" class="fa fa-reply"
                /></b-button>
                <b-button v-b-tooltip title="Zoom Out" @click.prevent="img.zoom(-0.2)"
                  ><i aria-hidden="true" class="fa fa-search-minus"
                /></b-button>
                <b-button v-b-tooltip title="Zoom In" @click.prevent="img.zoom(0.2)"
                  ><i aria-hidden="true" class="fa fa-search-plus"
                /></b-button>
                <b-button v-b-tooltip title="Rotate 90 Degrees Right" @click.prevent="img.rotate(90)"
                  ><i aria-hidden="true" class="fa fa-share"
                /></b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
    <b-card-group>
      <b-card
        style="max-width: 320px"
        no-body
        :img-src="getFacade"
        class="rounded-0 border border-light-dark"
        header-class="py-0"
        img-alt="Image"
        img-top
      >
        <b-card-body>
          <b-card-title>{{ currentEntity.trademark }}</b-card-title>
          <b-card-sub-title class="mb-2">{{ currentUser.profile }}</b-card-sub-title>
          <b-card-text> The above can be updated from the <a :href="parent">Phiscal Domain</a>. </b-card-text>
        </b-card-body>

        <b-card-body class="border-top border-light-dark">
          <b-card-title>Details</b-card-title>

          <b-form-group label="Industry" label-class="required" label-for="industry-select" description="What type of business are you?">
            <b-form-select
              id="category-select"
              class="form-control form-control-solid form-control-lg rounded-0"
              value-field="CATEGORY_ID"
              text-field="NAME"
              :options="categories"
              v-model="$v.form.category.$model"
              @change="switchCategory"
            >
              <template #first>
                <b-form-select-option :value="null">-- Select Category --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-select
              id="industry-select"
              class="form-control form-control-solid form-control-lg rounded-0"
              aria-describedby="industry-feedback"
              value-field="COUNT"
              text-field="ALT"
              :options="shortlist"
              v-model="$v.form.industry.$model"
              @change="switchIndustry"
            >
              <template #first>
                <b-form-select-option :value="null">-- Select Industry --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback :state="validateState('industry')" id="industry-feedback">
              Field is Required.
            </b-form-invalid-feedback>
            <b-form-checkbox v-model="$v.form.main.$model" switch class="cursor-pointer" @change="setMain"> Main</b-form-checkbox>
          </b-form-group>

          <b-form-group label="Description" label-for="desc-input" description="Please describe what your business does."
            ><b-form-textarea
              id="desc-input"
              class="form-control form-control-solid form-control-lg rounded-0 border border-light-dark"
              aria-describedby="desc-feedback"
              v-model="$v.form.description.$model"
              @change="setDescription"
            />
            <b-form-invalid-feedback id="desc-feedback"> </b-form-invalid-feedback>
          </b-form-group>

          <div class="form-group">
            <label>Banner</label>
            <b-form-checkbox :disabled="true" v-model="pic.useMain" switch> Use that of Main Category </b-form-checkbox>
            <div>
              <div id="company_logo" class="image-input image-input-outline w-100">
                <div class="image-input-wrapper position-relative w-100">
                  <img class="position-absolute w-100 v-center" :src="getBanner" />
                </div>
                <label
                  class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                  data-action="change"
                  data-toggle="tooltip"
                  data-original-title="Select Banner"
                  title="Select Banner"
                >
                  <i class="fa fa-pen icon-sm text-muted"></i><input type="file" accept="image/*" @change="img.set" />
                </label>
                <span
                  :data-action="pic.ext ? 'remove' : 'cancel'"
                  data-toggle="tooltip"
                  title="Remove Logo"
                  class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                  @click="rmBanner"
                  ><i class="ki ki-bold-close icon-xs text-muted"></i
                ></span>
              </div>
              <span class="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
            </div>
          </div>
        </b-card-body>
        <template #footer>
          <b-button variant="dark" class="float-right px-15" @click="submit" squared>Save</b-button>
        </template>
      </b-card>

      <b-card>
        <div>
          <div v-if="getDealings.length === 0">
            <b-card class="bg-dark rounded-0" no-body><h4 class="text-center text-light-dark my-2">No Industry Assigned</h4> </b-card>
          </div>
          <div v-for="(item, i) in getDealings" :key="i" class="mt-3">
            <b-card
              :title="item.alt || item.name"
              :sub-title="item.main ? 'Main Industry' : ''"
              :img-src="!item.banner ? null : `${bannerPath}/${item.banner}`"
              img-alt="Image"
              class="rounded-0 border border-light-dark"
              img-top
              body-class="p-5 dealings"
              footer-class="text-center py-0 border-top border-light-dark"
            >
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <template #footer>
                <b-button variant="white" squared @click="update(item, true)">Update</b-button>
                <b-button variant="danger" squared @click="rmIndustry(item.category_id, item.count)">Delete</b-button>
              </template>
            </b-card>
          </div>
        </div>
      </b-card>
    </b-card-group>
  </b-overlay>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, requiredIf } from 'vuelidate/lib/validators';

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

import Crop from '@/asset/js/logic/crop';
import Gui from '@/asset/js/logic/template';
import { bool } from '@/asset/js/logic/hack';

import {
  ASSOCIATE,
  BANNER,
  DATA,
  DISCONNECT,
  LS,
  SET_CATEGORY,
  SET_INDUSTRY,
  SET_DESCRIPTION,
  SET_MAIN,
  SET_DATA,
  SET_DEALINGS
} from '@/core/store/module/rest/industry';
import { SET_BREADCRUMB } from '@/core/store/module/template/breadcrumbs';
import { REMOVE_BODY_CLASSNAME } from '@/core/store/module/template/htmlclass.js';
export default {
  mixins: [validationMixin],
  name: 'Details',
  components: { VueCropper },
  computed: {
    ...mapGetters('auth', ['getAvatar', 'currentEntity', 'currentUser']),
    ...mapGetters('industry', ['getDealings']),
    getBanner: function () {
      let image = 'asset/img/banner/business.png';
      const file = `${this.form.category}${this.form.industry}`;
      if (this.updating) {
        image = this.pic.ext === null ? image : `${this.bannerPath}/${file}.${this.pic.ext}`;
      }
      return this.pic.base64 || image;
    },
    parent: function () {
      return process.env.VUE_APP_WEB_PHISCAL;
    },
    bannerPath: function () {
      return `${process.env.VUE_APP_FILES}/img/banner/${this.currentEntity.entity_id}`;
    },
    shortlist: function () {
      return this.industries[this.form.category];
    },
    getFacade: function () {
      let img = this.currentEntity.type === 'TENANT' ? 'asset/img/logo/business.png' : 'asset/img/user/blank.png';
      return this.currentEntity.face === null ? img : `${process.env.VUE_APP_FILES}/${this.currentEntity.face}`;
    }
  },
  data: function () {
    return {
      busy: true,
      updating: false,
      form: { category: null, industry: null, main: false, description: null },
      categories: [],
      industries: [],
      img: new Crop(this),
      gui: new Gui(this),
      pic: { base64: null, ext: null, useMain: false },
      cropper: { active: false, src: null, type: null, landscape: true }
    };
  },
  validations: {
    form: {
      category: {},
      industry: {
        required: requiredIf(function () {
          return this.$v.form.industry.$dirty;
        })
      },
      main: {},
      description: {}
    }
  },
  mounted: async function () {
    if (this.currentEntity === false) {
      this.$router.push({ name: 'monitor' });
      return;
    }

    // Breadcrumb
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Details' }]);

    // List of Entity Industries
    await this[LS]({ target: 'this', entityId: this.currentEntity.entity_id })
      .then((res) => {
        this[SET_DEALINGS](res);
      })
      .catch(this.gui.toast);

    // List of All Industries
    this.categories = await this[LS]({ target: 'category', entityId: 0 }).catch(this.gui.toast);
    this.industries = await this[LS]({ target: 'this', entityId: 0 }).catch(this.gui.toast);

    this.$nextTick().then(() => {
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
      this.busy = false;
    });
  },
  methods: {
    ...mapActions('industry', [ASSOCIATE, BANNER, DATA, DISCONNECT, LS]),
    ...mapMutations('industry', [SET_CATEGORY, SET_INDUSTRY, SET_DESCRIPTION, SET_MAIN, SET_DATA, SET_DEALINGS]),
    validateState: function (name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    rmIndustry: async function (categoryId, count) {
      const accepted = await this.gui.rmTarget(`Delete Industry?`);
      if (!accepted) {
        return;
      }
      this.busy = true;
      await this[DISCONNECT]({ categoryId: categoryId, count: count })
        .then((res) => {
          this[SET_DEALINGS](res);
        })
        .catch(this.gui.toast);
      this.busy = false;
    },
    switchCategory: function ($v) {
      this[SET_CATEGORY]($v);
      this.cleanUp(false);
      this.updating = false;
      this.form.industry = null;
    },
    switchIndustry: async function ($v) {
      this[SET_INDUSTRY]($v);
      if (this.updating) {
        this.cleanUp(false);
        this.updating = false;
      }

      const ls = this.getDealings.map((arr) => {
        return arr.category_id + arr.count;
      });
      if (ls.includes(this.form.category + $v)) {
        await this[DATA]({ categoryId: this.form.category, count: parseInt($v) })
          .then(this.update)
          .catch(this.gui.toast);
      }
    },
    submit: async function () {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.busy = true;
      await this[ASSOCIATE]({ picture: this.pic })
        .then((res) => {
          this[SET_DEALINGS](res);
          this[SET_DATA]({});
          this.cleanUp();
        })
        .catch(this.gui.toast);
      this.busy = false;
    },
    rmBanner: async function () {
      if (!this.updating) {
        this.img.rm();
        return;
      }
      this.busy = true;
      await this[BANNER]()
        .then((res) => {
          this.img.rm();
          this[SET_DEALINGS](res);
        })
        .catch(this.gui.toast);
      this.busy = false;
    },
    update: function ($v, force = false) {
      if (force) {
        this.form.category = $v.category_id;
        this.form.industry = parseInt($v.count);
        this[SET_CATEGORY]($v.category_id);
        this[SET_INDUSTRY](parseInt($v.count));
      }
      this.updating = true;
      this.form.description = $v.description;
      this.form.main = bool($v.main);
      this.pic.ext = $v.banner;
    },
    cleanUp: function (spring = true) {
      if (spring) {
        this.form.category = null;
        this.form.industry = null;
      }
      this.form.main = false;
      this.form.description = null;
      this.img.rm();
      this.$nextTick().then(() => {
        this.$v.form.$reset();
      });
    }
  }
};
</script>
<style scoped>
.image-input-wrapper {
  background-image: repeating-linear-gradient(#fff, #000, #fff);
}
.dealings .card-title {
  margin-bottom: 1rem;
}
</style>
