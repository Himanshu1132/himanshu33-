<template>
  <!-- begin:: Aside -->
  <div class="aside aside-left d-flex aside-fixed" id="aside" ref="aside">
    <!--begin::Primary-->
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto">
      <!--begin::Brand-->
      <Brand />
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden"
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist">
          <!--begin::Item-->
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="'Main Menu'"
          >
            <a class="nav-link btn btn-icon btn-clean btn-lg rounded-0 active" data-toggle="tab" v-on:click="setActiveTab" data-tab="0">
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon-->
                <inline-svg src="asset/img/svg/icon/layout/Layout-4-blocks.svg" :title="' '" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li
            v-if="false"
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="'Metronic Features'"
          >
            <a class="nav-link btn btn-icon btn-clean btn-lg" data-toggle="tab" v-on:click="setActiveTab" data-tab="1">
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon-->
                <inline-svg src="asset/img/svg/icon/communication/Group.svg" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
          <!--end::Item-->
        </ul>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->
      <!--begin::Footer-->
      <div class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4">
        <!--begin::Aside Toggle-->
        <span
          class="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm rounded-0"
          id="aside_toggle"
          ref="aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
          v-b-tooltip.hover.right="'Toggle Aside'"
        >
          <i class="ki ki-bold-arrow-back icon-sm" />
        </span>
        <!--end::Aside Toggle-->
        <!--begin::Quick Actions-->
        <QuickActions v-if="false" />
        <!--end::Quick Actions-->
        <!--begin::Quick Panel-->
        <QuickPanel v-if="false" />
        <!--end::Quick Panel-->
        <!--begin::User-->
        <QuickUser />
        <!--end::User-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div class="aside-secondary d-flex flex-row-fluid">
      <!--begin::Workspace-->
      <div class="aside-workspace scroll scroll-push my-2 ps" style="height: 824px; overflow: hidden">
        <!--begin::Tab Content-->
        <b-tabs class="hide-tabs" v-model="tabIndex">
          <!--begin::Tab Pane-->
          <b-tab active>
            <!--begin::Aside Menu-->
            <div class="aside-menu-wrapper flex-column-fluid px-10 py-5" id="aside_menu_wrapper">
              <!--begin::Menu Container-->
              <div
                ref="aside_menu"
                id="aside_menu"
                class="aside-menu min-h-lg-800px"
                data-menu-vertical="1"
                data-menu-scroll="1"
                v-bind:class="asideMenuClass"
              >
                <!-- example static menu here -->
                <perfect-scrollbar class="aside-menu scroll" style="max-height: 90vh; position: relative">
                  <Menu />
                </perfect-scrollbar>
              </div>
              <!--end::Menu Container-->
            </div>
            <!--end::Aside Menu-->
          </b-tab>
          <!--end::Tab Pane-->
          <!--begin::Tab Pane-->
          <b-tab class="p-3 px-lg-7 py-lg-5">
            <!--begin::Form-->
            <form class="p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px">
                  <input
                    type="text"
                    class="form-control form-control-lg form-control-solid h-40px"
                    placeholder="Search..."
                    id="generalSearch"
                  />
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon-->
                      <inline-svg src="asset/img/svg/icon/general/Search.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </div>
                <div class="dropdown" v-b-tooltip.hover.right="'Quick actions'">
                  <a
                    class="btn btn-icon btn-default btn-hover-primary ml-2 h-40px w-40px flex-shrink-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon-->
                      <inline-svg src="asset/img/svg/icon/code/Compiling.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-md dropdown-menu-right" style="">
                    <!--begin::Navigation-->
                    <ul class="navi navi-hover py-5">
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-drop" />
                          </span>
                          <span class="navi-text">New Group</span>
                        </a>
                      </li>
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-list-3" />
                          </span>
                          <span class="navi-text">Contacts</span>
                        </a>
                      </li>
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-rocket-1" />
                          </span>
                          <span class="navi-text">Groups</span>
                          <span class="navi-link-badge">
                            <span class="label label-light-primary label-inline font-weight-bold"> new </span>
                          </span>
                        </a>
                      </li>
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-bell-2" />
                          </span>
                          <span class="navi-text">Calls</span>
                        </a>
                      </li>
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-gear" />
                          </span>
                          <span class="navi-text">Settings</span>
                        </a>
                      </li>
                      <li class="navi-separator my-3" />
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-magnifier-tool" />
                          </span>
                          <span class="navi-text">Help</span>
                        </a>
                      </li>
                      <li class="navi-item">
                        <a class="navi-link">
                          <span class="navi-icon">
                            <i class="flaticon2-bell-2" />
                          </span>
                          <span class="navi-text">Privacy</span>
                          <span class="navi-link-badge">
                            <span class="label label-light-danger label-rounded font-weight-bold">5</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <!--end::Navigation-->
                  </div>
                </div>
              </div>
            </form>
            <!--end::Form-->
            <h3 class="p-2 p-lg-3 my-1 my-lg-3">Projects</h3>
            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/006-plurk.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> Bravio Application </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By James </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/010-vimeo.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> Quick Reports </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By Ana </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/014-kickstarter.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> CRM Reporting Tool </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By Adam </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/009-hot-air-balloon.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> DB Management </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By CRA Team </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/008-infography.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> Cloud Service </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By iC Team </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/007-disqus.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0"> Disqus Project </span>
                    <a class="text-muted text-hover-primary font-weight-bold"> By PV Inc. </a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
              <!--begin::Item-->
              <div class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-light mr-4">
                    <span class="symbol-label bg-hover-white">
                      <inline-svg src="asset/img/svg/misc/006-plurk.svg" class="h-50 align-self-center" />
                    </span>
                  </div>
                  <!--end::Symbol-->
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">Plurk Meeting</span>
                    <a class="text-muted text-hover-primary font-weight-bold">By Plurk Team.</a>
                  </div>
                  <!--begin::End-->
                </div>
              </div>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </b-tab>
          <!--end::Tab Pane-->
        </b-tabs>
        <!--end::Tab Content-->
        <!--end::Workspace-->
      </div>
      <!--end::Secondary-->
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import { mapGetters } from 'vuex';
import LayoutAside from '@/asset/js/layout/base/aside.js';
import LayoutAsideMenu from '@/asset/js/layout/base/aside-menu.js';
import LayoutAsideToggle from '@/asset/js/layout/base/aside-toggle.js';
import Brand from '@/view/layout/brand/Brand.vue';
import Menu from '@/view/layout/aside/Menu.vue';
import QuickActions from '@/view/layout/extra/offcanvas/QuickActions.vue';
import QuickUser from '@/view/layout/extra/offcanvas/QuickUser.vue';
import QuickPanel from '@/view/layout/extra/offcanvas/QuickPanel.vue';

export default {
  name: 'Aside',
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
      tabIndex: 0
    };
  },
  components: {
    Brand,
    Menu,
    QuickActions,
    QuickUser,
    QuickPanel
  },
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        // Init Aside
        LayoutAside.init(this.$refs['aside']);

        // Init Aside Menu
        LayoutAsideMenu.init(this.$refs['aside_menu']);

        // Init Aside Toggle
        LayoutAsideToggle.init(this.$refs['aside_toggle']);
      }, 2000);
    });
  },
  methods: {
    setActiveTab(event) {
      let target = event.target;
      if (!event.target.classList.contains('nav-link')) {
        target = event.target.closest('.nav-link');
      }

      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll('.nav-link');
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute('data-tab'));

      // set current active tab
      target.classList.add('active');
    }
  },
  computed: {
    ...mapGetters(['layoutConfig', 'getClasses']),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses('aside_menu');
      if (typeof classes !== 'undefined') {
        return classes.join(' ');
      }
      return null;
    }
  }
};
</script>
