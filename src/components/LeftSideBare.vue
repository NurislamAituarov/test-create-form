<template>
  <div class="left-sidebar">
    <div>
      <img class="logo" src="../assets/logo.svg" alt="" />

      <div class="nav">
        <router-link v-for="item of navItems" :key="item.name" :to="item.path" class="link">
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <BaseBtn name="Выход" size="lg" type="filled" />
  </div>
</template>

<script>
import BaseBtn from './base/BaseBtn.vue';

export default {
  name: 'LeftSideBare',
  components: { BaseBtn },

  data() {
    return {
      navItems: [
        {
          name: 'Формы',
          path: '/',
          isActive: true,
        },
        {
          name: 'Пользователи',
          path: '/page',
          isActive: false,
        },
      ],
    };
  },

  methods: {
    handleClick(name) {
      this.navItems = this.navItems.map((item) => {
        console.log(item.name, name);
        if (item.name === name) {
          return { ...item, isActive: true };
        }

        return item;
      });
    },
  },
};
</script>

<style>
.left-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.logo {
  margin-bottom: 30px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link {
  color: #000000;
}

.router-link-exact-active {
  color: var(--primary_color);
}
</style>
