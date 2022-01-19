<template>
  <ul class="menu-nav">
    <router-link to="/dash" v-slot="{ href, navigate, isActive, isExactActive }" custom>
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
      >
        <a :href="href" class="menu-link rounded-0" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city" />
          <span class="menu-text">Monitor</span>
        </a>
      </li>
    </router-link>

    <li class="menu-section">
      <h4 class="menu-text">Information</h4>
      <i class="menu-icon flaticon-more-v2" />
    </li>

    <router-link v-if="currentEntity !== false" to="/industry" v-slot="{ href, navigate, isActive, isExactActive }" custom>
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
      >
        <a :href="href" class="menu-link rounded-0" @click="navigate">
          <i class="menu-icon flaticon2-world" />
          <span class="menu-text">Industry</span>
        </a>
      </li>
    </router-link>

    <router-link v-if="currentEntity !== false" to="/trackrecord" v-slot="{ href, navigate, isActive, isExactActive }" custom>
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
      >
        <a :href="href" class="menu-link rounded-0" @click="navigate">
          <i class="menu-icon flaticon-folder-1" />
          <span class="menu-text">Job History</span>
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Menu',
  computed: {
    ...mapGetters('auth', ['currentEntity'])
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route['path'].indexOf(match) !== -1;
    }
  }
};
</script>
