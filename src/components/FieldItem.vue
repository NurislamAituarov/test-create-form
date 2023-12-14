<template>
  <div class="field__item">
    <div class="field__type">
      <p>Тип поля</p>
      <span
        v-for="el of types"
        :key="el.name"
        :class="{ 'active-type': el.isActive }"
        @click="selectType(el.name)"
        >{{ el.name }}</span
      >
    </div>

    <div class="field__info">
      <div class="field__info-left">
        <span v-if="field.name">{{ field.name }}</span>
        <span>Контакт</span>
      </div>
      <p class="field__delete" @click="$emit('remove-field', field.id)">Удалить поле</p>
    </div>

    <input
      class="input"
      type="text"
      :value="value"
      :id="field.id"
      @input="$emit('input', $event.target.value)"
    />

    <div v-if="field.type === 'select'" class="field__select">
      <input
        v-for="(option, ind) of field.options"
        :key="ind"
        :id="ind"
        placeholder="вариант"
        v-model="option.name"
        type="text"
        class="input option"
      />
    </div>

    <button
      v-if="field.type === 'select'"
      @click="addOption({ id: field.id, option: { name: '' } })"
      class="btn-add"
    >
      Добавить вариант для списка
    </button>

    <BaseCheckbox
      :id="`checkbox${field.id}`"
      label="Сделать поле обязательным"
      class="field__required"
      type="required"
      v-model="fieldRequired.required"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseCheckbox from './base/BaseCheckbox.vue';

export default {
  name: 'FieldItem',
  props: {
    field: { type: Object },
    value: [String],
  },
  data() {
    return {
      types: [
        {
          name: 'text',
          isActive: false,
        },
        {
          name: 'number',
          isActive: false,
        },
        {
          name: 'select',
          isActive: false,
        },
      ],
    };
  },
  computed: {
    ...mapState(['fields']),

    fieldRequired() {
      return this.fields.find((fieldItem) => fieldItem.id === this.field.id);
    },
  },
  mounted() {
    this.types = this.types.map((type) => {
      if (this.field.type === type.name) {
        return { ...type, isActive: true };
      }
      return type;
    });
  },
  methods: {
    ...mapActions(['changeField', 'addOption']),
    selectType(type) {
      this.changeField({
        ...this.field,
        type,
      });
      this.types = this.types.map((item) => {
        if (item.name === type) {
          return { ...item, isActive: true };
        }
        return { ...item, isActive: false };
      });
    },
  },
  components: { BaseCheckbox },
};
</script>

<style scoped lang="scss">
.field__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .field__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      span {
        opacity: 0.5;
      }
    }
  }
  .field__delete {
    color: var(--primary_color);
    cursor: pointer;
  }
  .input {
    width: 100%;
    height: 70px;
    border: none;
    padding: 30px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
  .option {
    height: 30px;
    padding: 15px 30px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 16px;
  }
  .field__required {
    align-items: center;
  }

  .field__type {
    margin-bottom: 10px;
    p {
      margin-bottom: 10px;
    }

    span {
      padding: 5px;
      border: 1px solid var(--primary_color);
      margin-right: 10px;
      border-radius: 5px;
      cursor: pointer;
      color: var(--primary_color);
    }

    .active-type {
      background-color: var(--primary_color);
      color: #fff;
    }
  }

  .btn-add {
    padding: 10px;
    cursor: pointer;
    border-radius: 6px;
  }
}
</style>
