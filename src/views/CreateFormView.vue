<template>
  <div class="container">
    <div class="form-create">
      <div class="header">
        <h2 class="header__title">Поля</h2>
      </div>

      <div class="field-box">
        <p class="field__label">Скрытые поля</p>
        <div class="field__add">
          <span>Добавить поле</span>
          <img src="../assets/plus.svg" alt="" />
        </div>
      </div>

      <div class="field-box">
        <p class="field__label">Поля</p>

        <FieldItem
          v-for="field of fields"
          :key="field.id"
          :field="field"
          v-model="field.name"
          @remove-field="removeField"
        />

        <div
          class="field__add"
          @click="
            addField({
              name: '',
              type: 'text',
              id: new Date().getTime(),
            })
          "
        >
          <span>Добавить поле</span>
          <img src="../assets/plus.svg" alt="" />
        </div>
      </div>
    </div>

    <FormPreview />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FieldItem from '@/components/FieldItem.vue';
import FormPreview from '@/components/FormPreview.vue';
export default {
  name: 'CreateForm',
  components: { FieldItem, FormPreview },

  computed: mapState({
    fields: (state) => state.fields,
  }),
  methods: {
    ...mapActions(['addField', 'removeField']),
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  background-color: #f9f9f9;
  display: flex;
}
.form-create {
  width: 498px;
  overflow-x: auto;
  padding: 80px 30px;
}

.field-box {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
  .field__label {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
  }

  .field__add {
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--primary_color);
    border: 1px dashed var(--primary_color);
    padding: 20px;
    cursor: pointer;
  }
}
</style>
