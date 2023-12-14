<template>
  <div class="left-sidebar">
    <div>
      <img class="logo" src="../assets/logo.svg" alt="" />

      <div class="nav">
        <router-link v-if="currentRoute === 'create-form'" to="/" class="back">
          <img src="../assets/arrow-left.svg" alt="" />
          назад
        </router-link>

        <router-link v-for="item of filteredNavItems" :key="item.name" :to="item.path" class="link">
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
      <BaseBtn v-if="currentRoute === 'create-form'" name="Скрипт" size="lg" type="empty" />
      <BaseBtn
        v-if="currentRoute === 'create-form'"
        name="Сохранить"
        size="lg"
        type="filled"
        @on-click="saveForm"
      />

      <BaseBtn v-else name="Выход" size="lg" type="filled" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
          path: '/#',
          isActive: false,
        },
        {
          name: 'Тип формы',
          path: '/not-page2',
          isActive: false,
        },
        {
          name: 'Сущности',
          path: '/not-page3',
          isActive: false,
        },
        {
          name: 'Поля',
          path: '/create-form',
          isActive: false,
        },
        {
          name: 'Правила показа полей',
          path: '/not-page4',
          isActive: false,
        },
        {
          name: 'Другие настройки',
          path: '/not-page5',
          isActive: false,
        },
      ],
      currentRoute: '',
    };
  },

  computed: {
    ...mapState(['fields', 'currentFormId']),

    filteredNavItems() {
      if (this.currentRoute === 'create-form') {
        return this.navItems.filter((item) => {
          if (item.name !== 'Формы' && item.name !== 'Пользователи') return true;
        });
      }

      return this.navItems.filter((item) => {
        if (item.name === 'Формы' || item.name === 'Пользователи') return true;
      });
    },
  },

  watch: {
    $route(route) {
      this.currentRoute = route.name;
      if (route.name === 'forms') {
        this.clearFields();
      }
    },
  },

  methods: {
    ...mapActions(['addFieldsToForms', 'clearFields']),

    handleClick(name) {
      this.navItems = this.navItems.map((item) => {
        console.log(item.name, name);
        if (item.name === name) {
          return { ...item, isActive: true };
        }

        return item;
      });
    },

    saveForm() {
      if (!this.fields.length) return;

      this.addFieldsToForms({
        id: this.currentFormId ?? new Date().getTime(),
        fields: this.fields,
        date: new Date(),
      });
      this.clearFields();
      this.$router.push('/');
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
.back {
  color: #212121 !important;
  margin-bottom: 50px;
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
