<template>
  <section class="padding-bottom">
    <div class="card card-deal">
      <div class="col-heading content-body">
        <header class="section-heading text-center">
          <h3 class="section-title">Store Openings</h3>
          <p>Time Remaining</p>
        </header>
        <!-- sect-heading -->
        <div class="timer text-center">
          <div>
            <span class="num">
              <vue-countdown :time="launch" v-slot="{ days }"> {{ days }} </vue-countdown>
            </span>
            <small>Days</small>
          </div>
          <div>
            <span class="num">
              <vue-countdown :time="launch" v-slot="{ hours }"> {{ hours }} </vue-countdown>
            </span>
            <small>Hours</small>
          </div>
          <div>
            <span class="num">
              <vue-countdown :time="launch" v-slot="{ minutes }"> {{ minutes }} </vue-countdown>
            </span>
            <small>Min</small>
          </div>
          <div>
            <span class="num">
              <vue-countdown :time="launch" v-slot="{ seconds }"> {{ seconds }} </vue-countdown>
            </span>
            <small>Sec</small>
          </div>
        </div>
      </div>
      <!-- col.// -->
      <div class="row no-gutters items-wrap">
        <div v-for="(business, i) in businesses" :key="i" class="col-sm-6 col-md-4 col-lg-3 col-xl col-12">
          <figure class="card-product-grid card-sm">
            <a class="img-wrap">
              <img :src="business.logo" class="p-3" />
            </a>
            <div class="text-wrap p-3">
              <a class="title cursor-pointer">{{ business.name }}</a>
              <span class="badge badge-secondary rounded-0"> {{ business.flag }} </span>
            </div>
          </figure>
        </div>
        <!-- col.// -->
      </div>
    </div>
  </section>
</template>
<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
  name: 'Section1',
  components: { VueCountdown },
  computed: {
    launch() {
      const A = new Date();
      const B = new Date(2021, 11, 13, 9);
      const MILISECONDS = 1000;
      const SECONDS = (60 - A.getSeconds()) * MILISECONDS;
      const MINUTES = (60 - A.getMinutes()) * 60 * MILISECONDS;
      const HOURS = (B.getHours() - A.getHours()) * 60 * 60 * MILISECONDS;
      const DAYS = (B.getDate() - A.getDate()) * 24 * 60 * 60 * MILISECONDS;
      let time = DAYS + HOURS + MINUTES + SECONDS;
      return time < 0 ? time * -1 : time;
    }
  },
  data() {
    return {
      businesses: [
        { name: 'Add your Business', flag: 'Empty Space', logo: 'asset/img/logo/business.png' },
        { name: 'Add your Business', flag: 'Empty Space', logo: 'asset/img/logo/business.png' },
        { name: 'Add your Business', flag: 'Empty Space', logo: 'asset/img/logo/business.png' },
        { name: 'Add your Business', flag: 'Empty Space', logo: 'asset/img/logo/business.png' }
      ]
    };
  }
};
</script>
