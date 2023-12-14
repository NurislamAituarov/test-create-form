<template>
  <div class="container-forms">
    <div class="header">
      <h2 class="header__title">Формы</h2>
      <router-link to="/create-form">
        <BaseBtn name="Создать форму" size="lg" type="filled" />
      </router-link>
    </div>

    <FormRegistration v-for="form of forms" :key="form.id" :form="form" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FormRegistration from '@/components/FormRegistration.vue';
import BaseBtn from '@/components/base/BaseBtn.vue';

export default {
  name: 'FormsView',
  components: { FormRegistration, BaseBtn },

  computed: {
    ...mapState(['forms']),
  },
};
</script>
<style>
.container-forms {
  width: 100%;
  padding: 80px 165px 90px 30px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 49px;
}

.header__title {
  font-size: 40px;
  font-weight: 500;
  line-height: 50px;
}
</style>
