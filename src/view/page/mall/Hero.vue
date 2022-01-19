<template>
  <section class="section-main padding-y">
    <main class="card rounded-0">
      <div class="card-body">
        <div class="row">
          <aside class="col-lg col-md-3 flex-lg-grow-0 px-0">
            <nav class="nav-home-aside" @click="showMarkets">
              <h6 class="title-category">
                Shopping Complex
                <i id="ls-dropdown" class="d-md-none icon fa fa-chevron-down" />
              </h6>
              <ul id="market-list" class="menu-category">
                <li
                  v-for="(item, i) in categories"
                  :key="i"
                  :class="{ active: category.active && category.id === item.CATEGORY_ID }"
                  @mouseenter="marketItem(item.CATEGORY_ID, true)"
                  @mouseleave="marketItem(item.CATEGORY_ID)"
                >
                  <a class="cursor-pointer py-2 pl-2"
                    ><div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex">
                        <span class="img mr-2">
                          <div class="">
                            <i :class="item.ICON" class="text-secondary" />
                          </div>
                        </span>
                        <span class="txt">{{ item.NAME }}</span>
                      </div>
                      <i class="las la-angle-right text-secondary pr-1" /></div
                  ></a>
                </li>
              </ul>
            </nav>
          </aside>
          <!-- col.// -->
          <div class="col-md-9 col-xl-7 col-lg-7 px-0 bg-white">
            <div
              class="w-100 h-100 position-absolute category-list"
              :class="{ 'd-none': !category.active }"
              @mouseenter="category.active = true"
              @mouseleave="category.active = false"
            >
              <b-container class="py-5">
                <b-row v-for="(target, y) in list" :key="y">
                  <b-col v-for="(item, x) in target" :key="x" sm="4" class="mb-5">
                    <h3 @mouseenter="tip(item.NAME, item.DESCRIPTION)">{{ item.NAME }}</h3>
                    <ul>
                      <li>{{ item.business || 'Empty' }}</li>
                    </ul>
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <!-- ================== COMPONENT SLIDER  BOOTSTRAP  ==================  -->
            <b-carousel v-model="slide" :interval="4000" controls class="slider-home-banner">
              <b-carousel-slide class="carousel-item" img-src="asset/img/banner/placeholder.jpg" />
              <b-carousel-slide class="carousel-item" img-src="asset/img/banner/placeholder.jpg" />
            </b-carousel>
            <!-- ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// -->
          </div>
          <!-- col.// -->
          <div class="col-md d-none d-lg-block flex-grow-1">
            <aside class="special-home-right">
              <h6 class="bg-white border border-secondary text-center text-dark mb-0 p-2">Business Models</h6>

              <div v-for="(item, i) in models" :key="i" class="card-banner border-bottom">
                <div class="py-3" style="width: 80%">
                  <h6 class="card-title">{{ item.name }}</h6>
                  <a @click="explain(item.name)" class="btn bg-secondary btn-sm rounded-0 cursor-pointer"> Explanation </a>
                </div>
                <div class="img-bg">
                  <i :class="item.icon" />
                </div>
              </div>
            </aside>
          </div>
          <!-- col.// -->
        </div>
        <!-- row.// -->
      </div>
      <!-- card-body.// -->
    </main>
    <!-- card.// -->
    <b-modal
      v-model="explanation"
      header-bg-variant="white"
      header-class="icon-3x py-5 rounded-0 border-bottom-0 "
      header-text-variant="white"
      header-close-variant="dark"
      body-bg-variant="white"
      body-class="pt-0"
      footer-bg-variant="white"
      footer-text-variant="white"
      footer-class="p-0 rounded-0 border-top-0"
      size="lg"
      @hidden="explain(false)"
    >
      <b-card no-body class="overflow-hidden rounded-0">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="modelThumbnail" alt="Image" class="rounded-0" />
          </b-col>
          <b-col md="8">
            <b-card-body :title="businessModel">
              <b-card-text v-html="modelDescription" />
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

      <template #modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { REMOVE_BODY_CLASSNAME } from '@/core/store/module/template/htmlclass';
import { LS } from '@/core/store/module/rest/industry';
import Gui from '@/asset/js/logic/template';
export default {
  name: 'Hero',
  data() {
    return {
      slide: 0,
      busy: true,
      category: { active: false, id: null },
      explanation: false,
      categories: [],
      industries: [],
      list: [],
      models: [
        { name: 'Shop', icon: 'las la-store-alt' },
        { name: 'Individual', icon: 'las la-address-card' },
        { name: 'Product', icon: 'las la-trademark' }
      ],
      businessModel: null,
      modelDescription: null,
      gui: new Gui(this),
      modelThumbnail: 'asset/img/banner/placeholder.jpg'
    };
  },
  mounted: async function () {
    this.categories = await this[LS]({ target: 'category', entityId: 0 }).catch(this.gui.toast);
    this.industries = await this[LS]({ target: 'this', entityId: 0 }).catch(this.gui.toast);
    this.$nextTick().then(() => {
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
    });
  },
  methods: {
    ...mapActions('industry', [LS]),
    showMarkets: function () {
      let div = document.getElementById('market-list');
      div.classList.toggle('d-block');
      let dropDown = document.getElementById('ls-dropdown');
      dropDown.classList.toggle('fa-chevron-down');
      dropDown.classList.toggle('fa-chevron-up');
    },
    explain: function (target = false) {
      this.explanation = target !== false;
      this.businessModel = target === false ? null : target;
      this.modelThumbnail = target === false ? 'asset/img/banner/placeholder.jpg' : `asset/img/item/${target}.png`;
      let body = null;
      switch (target) {
        case 'Shop':
          body =
            "<p>These are stores, encompassing large businesses from wholesalers to small retailers like mom's and pop's businesses around the block.</p>";
          body += '<p>Consumers are presented with goods in virtual aIsles, where they select items to a <b>cart</b> for purchase.</p>';
          body += '<p>The only requirements in adding your own store is its name and goods sold.</p>';
          break;
        case 'Individual':
          body = '<p>Commonly Sole Proprietorships offering services, over trading products.</p>';
          body += '<p>This business model normally has the lowest overhead in starting up, where the idividual itself is the business.</p>';
          body +=
            '<p>Prime examples can be self employed photographers normally invited to work in functions, or independent ceiling designers and fitters.</p>';
          break;
        case 'Product':
          body =
            "<p>This is mostly when you're manufacturing some product and trading that as a business, given the product has a legal entity or is trademarked in its own right.</p>";
          body += '<p>This can either be a <b>good</b> or a <b>service</b>.</p>';
          break;
        default:
          this.businessModel = null;
          break;
      }
      this.modelDescription = body;
    },
    tip: function (title, text) {
      this.$bvToast.toast(text, {
        title: title,
        autoHideDelay: 5000,
        appendToast: false
      });
    },
    marketItem: function (id, hover = false) {
      if (this.industries.length === 0) return;
      this.category.active = hover;
      this.category.id = id;
      if (!hover) {
        return;
      }
      this.list = [[]];
      let i = 0;
      for (let item of this.industries[id]) {
        if (this.list[i].length === 3) {
          i++;
          this.list.push([]);
        }
        this.list[i].push(item);
      }
    }
  }
};
</script>
<style scoped>
.menu-category .la-angle-right {
  opacity: 0.4;
}
</style>
<style>
.modal .modal-header .close {
  font-size: 2rem !important;
}
</style>
