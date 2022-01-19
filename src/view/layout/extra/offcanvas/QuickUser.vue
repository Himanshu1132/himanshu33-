<template>
  <div v-b-tooltip.hover.right="'User profile'">
    <a
      class="btn btn-icon btn-clean btn-lg w-40px h-40px"
      id="quick_user_toggle"
      data-toggle="tooltip"
      data-placement="right"
      data-container="body"
      data-boundary="window"
      title=""
      data-original-title="User Profile"
    >
      <span class="symbol symbol-30 symbol-lg-40">
        <span class="svg-icon svg-icon-xl">
          <!--begin::Svg Icon-->
          <inline-svg src="asset/img/svg/icon/general/User.svg" title=" " />
          <!--end::Svg Icon-->
        </span>
        <!--<span class="symbol-label font-size-h5 font-weight-bold">S</span>-->
      </span>
    </a>

    <div id="quick_user" ref="quick_user" class="offcanvas offcanvas-left p-10">
      <!--begin::Header-->
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 class="font-weight-bold m-0">
          User Profile
          <small class="text-muted font-size-sm ml-2">0 messages</small>
        </h3>
        <a class="btn btn-xs btn-icon btn-light btn-hover-primary" id="quick_user_close">
          <i class="ki ki-close icon-xs text-muted" />
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar class="offcanvas-content pr-5 mr-n5 scroll" style="max-height: 90vh; position: relative">
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label rounded-0" :src="getAvatar" alt="" />
            <i class="symbol-badge bg-success" />
          </div>
          <div class="d-flex flex-column">
            <a class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"> {{ currentUser.fullname }} </a>
            <div class="text-muted mt-1">{{ currentUser.profile }}</div>
            <div class="navi mt-2">
              <a class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg src="asset/img/svg/icon/communication/Mail-notification.svg" title=" " />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary"> {{ currentUser.email }} </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold rounded-0" @click="onLogout">Sign out</button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5" />
        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0">
          <!--begin::Item-->
          <a :href="userProfile" class="navi-item">
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success">
                    <!--begin::Svg Icon-->
                    <inline-svg src="asset/img/svg/icon/general/User.svg" title=" " />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Profile</div>
                <div class="text-muted">
                  Account settings and more
                  <span class="label label-light-danger label-inline font-weight-bold"> update </span>
                </div>
              </div>
            </div>
          </a>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link to="/" v-if="false" @click.native="closeOffcanvas" class="navi-item">
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning">
                    <!--begin::Svg Icon-->
                    <inline-svg src="asset/img/svg/icon/shopping/Chart-bar1.svg" title=" " />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Messages</div>
                <div class="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link to="/" v-if="false" @click.native="closeOffcanvas" class="navi-item">
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger">
                    <!--begin::Svg Icon-->
                    <inline-svg src="asset/img/svg/icon/file/Selected-file.svg" title=" " />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Activities</div>
                <div class="text-muted">Logs and notifications</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link to="/" v-if="false" @click.native="closeOffcanvas" class="navi-item">
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <!--begin::Svg Icon-->
                    <inline-svg src="asset/img/svg/icon/communication/Mail-opened.svg" title=" " />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Tasks</div>
                <div class="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
        </div>
        <!--end::Nav-->
        <div class="separator separator-dashed my-7" />
        <!--begin::Notifications-->
        <div v-if="list.length > 0">
          <!--begin:Heading-->
          <h5 class="mb-5">Recent Notifications</h5>
          <!--end:Heading-->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div class="d-flex align-items-center rounded p-5 gutter-b" v-bind:class="`bg-light-${item.type}`" v-bind:key="i">
              <span class="svg-icon mr-5" v-bind:class="`svg-icon-${item.type}`">
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg :src="item.svg" title=" " />
                  <!--end::Svg Icon-->
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span class="font-weight-bolder py-1 font-size-lg" v-bind:class="`text-${item.type}`">
                {{ item.alt }}
              </span>
            </div>
            <!--end::Item -->
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#quick_user {
  overflow: hidden;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SIGNOUT } from '@/core/store/module/rest/auth';
import LayoutQuickUser from '@/asset/js/layout/extended/quick-user.js';
import Offcanvas from '@/asset/js/component/offcanvas.js';

export default {
  name: 'QuickUser',
  computed: {
    ...mapGetters('auth', ['currentUser', 'getAvatar']),
    userProfile: function () {
      return `${process.env.VUE_APP_WEB_PHISCAL}/#/profile`;
    }
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    // Init Quick User Panel
    LayoutQuickUser.init(this.$refs['quick_user']);
  },
  methods: {
    ...mapActions('auth', [SIGNOUT]),
    onLogout: async function () {
      await this[SIGNOUT]()
        .then(() => this.$router.push({ name: 'signin' }))
        .catch((ex) => {
          for (let i in ex) {
            this.$bvToast.toast(ex[i], {
              title: `Request Error`,
              variant: 'danger',
              solid: true,
              noAutoHide: true
            });
          }
        });
    },
    closeOffcanvas() {
      new Offcanvas(LayoutQuickUser.getElement()).hide();
    }
  }
};
</script>
