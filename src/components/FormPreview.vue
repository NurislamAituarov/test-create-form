<template>
  <div class="form-preview">
    <form v-if="fields.length" class="form">
      <h2 class="form__title">Форма регистрации участников</h2>

      <div class="form__fields">
        <div class="form__field" v-for="field of fields" :key="field.id">
          <input
            v-if="field.type === 'text' || field.type === 'number'"
            class="form__input"
            :id="field.id"
            :type="field.type"
            :placeholder="field.name"
          />

          <BaseSelect
            v-else
            v-model="field.name"
            :placeholder="field.name"
            :options="field.options"
          />
        </div>
      </div>

      <BaseCheckbox
        id="policy-condition"
        label="Нажимая кнопку «Отправить», я принимаю условия политики конфиденциальности"
      />
      <BaseBtn name="Отправить" size="lg" type="filled" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseBtn from './base/BaseBtn.vue';
import BaseCheckbox from './base/BaseCheckbox.vue';
import BaseSelect from './base/BaseSelect.vue';

export default {
  name: 'FormPreview',

  data() {
    return {};
  },

  computed: mapState({
    fields: (state) => state.fields,
  }),
  components: { BaseBtn, BaseCheckbox, BaseSelect },
};
</script>

<style scoped lang="scss">
.form-preview {
  overflow-x: auto;
  flex: 1;
  padding: 88px 100px 88px 97px;
  background-color: var(--primary_color);
}

.form {
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  &__title {
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 30px;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }

  &__input {
    height: 70px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    background-color: #f6f6f6;
    color: #000000;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  button {
    margin-top: 50px;
    width: 100%;
  }
}
</style>
