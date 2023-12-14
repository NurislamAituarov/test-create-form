<template>
  <div class="form-item">
    <div class="form-item__info">
      <div class="form-item__author">
        <p>Форма регистрации участников</p>
        <span>Автор: user 1</span>
      </div>
      <span>Дата создания: {{ formatDate }}</span>
    </div>

    <div class="form-item__control">
      <BaseBtn name="Редактировать" size="md" type="empty" @on-click="onEdit" />

      <BaseBtn name="Удалить" size="md" type="br-none" @on-click="deleteForm(form.id)" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import BaseBtn from './base/BaseBtn.vue';

export default {
  name: 'FormRegistration',
  components: { BaseBtn },
  props: {
    form: { type: Object },
  },

  computed: {
    formatDate() {
      const date = this.form.date;
      const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '.');

      return formattedDate;
    },
  },

  methods: {
    ...mapActions({ deleteForm: 'deleteForm', editForm: 'editForm' }),

    onEdit() {
      this.$router.push('/create-form');
      this.editForm(this.form.id);
    },
  },
};
</script>

<style scoped>
.form-item {
  display: flex;
  justify-content: space-between;
  height: 190px;
  padding: 24px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 30px;
}

.form-item__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-item__author p {
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  margin-bottom: 8px;
}

.form-item__info span {
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  opacity: 0.5;
}

.form-item__control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
