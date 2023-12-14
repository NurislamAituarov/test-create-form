<template>
  <div ref="containerSelect" class="form-select__control" :class="{ multiselect: multiselect }">
    <button
      ref="button"
      type="button"
      class="form-select__button"
      aria-haspopup="listbox"
      :id="`${_uid}-button`"
      :aria-expanded="optionsVisible"
      @click.prevent="toggleOptions"
      @keyup.up.down.prevent="showOptions"
      @keyup.up.prevent="selectPrevOption"
      @keyup.down.prevent="selectNextOption"
    >
      {{ valueMain }}
      <span v-if="!value" class="form-select__placeholder">{{ placeholder }}</span>
      <SvgAngle
        class="form-select__icon"
        :class="{ 'form-select__icon--rotate-180': optionsVisible }"
      />
    </button>

    <ul
      v-show="optionsVisible"
      ref="options"
      tabindex="-1"
      role="listbox"
      :aria-activedescendant="activeDescendant"
      class="form-select__options"
      @keyup.up.prevent="selectPrevOption"
      @keyup.down.prevent="selectNextOption"
      @keydown.up.down.prevent
    >
      <li
        v-for="(option, index) in options"
        :key="option.name || index"
        :ref="setItemRef"
        role="option"
        tabindex="0"
        class="form-select__option"
        :id="`${_uid}-option-${index}`"
        :aria-selected="activeOptionIndex === index"
        :class="{
          'has-focus': activeOptionIndex === index,
          'selected-option': multiselect && value.includes(option.name),
        }"
        @click="handleOptionClick(option.name)"
        @keydown.enter.prevent="handleOptionClick(option.name)"
      >
        {{ option.name || option }}
      </li>
    </ul>
  </div>
</template>

<script>
import SvgAngle from '../svg/SvgAngle.vue';

export default {
  name: 'BaseSelect',
  components: {
    SvgAngle,
  },
  model: {
    event: 'change',
  },
  props: {
    placeholder: {
      type: String,
      default: 'Select',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Array],
      default: '',
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keysSoFar: '',
      tabKeyPressed: false,
      optionsVisible: false,
      optionsRef: [],
      optionIndex: -1,
    };
  },

  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  unmounted() {
    document.removeEventListener('click', this.handleOutsideClick);
  },

  computed: {
    activeOptionIndex() {
      return this.options.findIndex((x) => x.value === this.value || x === this.value);
    },

    activeDescendant() {
      return `${this._uid}-option-${this.activeOptionIndex}`;
    },

    valueMain() {
      if (this.multiselect) {
        return Array.isArray(this.value) && this.value.length ? this.value.join(', ') : '-';
      }

      return this.value.name ?? this.value;
    },
  },
  methods: {
    handleOptionClick(option) {
      if (this.multiselect) {
        this.$emit('change', this.updateValuesWithOption(option));
      } else {
        this.$emit('change', option);
        this.reset();
      }
    },
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return;
      this.hideOptions();
    },
    toggleOptions() {
      this.optionsVisible ? this.hideOptions() : this.showOptions();
    },
    async showOptions() {
      this.optionsVisible = true;
      await this.$nextTick();
    },
    hideOptions() {
      this.optionsVisible = false;
    },
    async reset() {
      this.hideOptions();
      this.optionIndex = -1;
      await this.$nextTick();
      this.$refs.button.focus();
    },
    setupFocus() {
      if (this.value) return;
      this.$emit('change', this.options[0]);
    },
    selectPrevOption() {
      this.optionIndex -= 1;
      if (this.optionIndex < 0) {
        this.optionIndex = this.options.length - 1;
      }

      this.optionsRef[this.optionIndex].focus();
    },

    selectNextOption() {
      this.optionIndex += 1;
      if (this.optionIndex >= this.options.length) {
        this.optionIndex = 0;
      }
      this.optionsRef[this.optionIndex].focus();
    },

    updateValuesWithOption(option) {
      const updatedValues = this.value.includes(option)
        ? this.value.filter((el) => el !== option)
        : [...this.value, option];

      return updatedValues;
    },

    setItemRef(el) {
      if (el) {
        this.optionsRef.push(el);
      }
    },

    handleOutsideClick(e) {
      const select = this.$refs.containerSelect;
      const target = e.target;

      const clickedInsideSelect = select?.contains(target);

      if (!clickedInsideSelect) {
        this.hideOptions();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-select {
  &__control {
    max-width: 100%;
    height: 70px;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    color: #363636;
    &:focus-within {
      box-shadow: 0 0 6px 2px rgba(10, 10, 10, 0.07);
    }
  }

  &__button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    padding: 30px;
    font-weight: bold;
    color: black;
  }

  &__icon {
    transition: transform 0.2s;

    &--rotate-180 {
      transform: rotate(180deg);
    }
  }

  &__options {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
    background-color: white;
    position: absolute;
    top: 70px;
    border: 1px solid #dbdbdb;
    border-top: none !important;
    z-index: 10;
    animation: 0.3s show ease;
  }
  @keyframes show {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(0px);
    }
  }
  &__option {
    cursor: default;
    padding: 10px 30px;
    cursor: pointer;
    &.has-focus {
      background-color: rgba(#d5d5d5, 0.25);
    }
    &:focus,
    &:hover {
      box-shadow: 0 0 6px 2px rgba(10, 10, 10, 0.07);
    }
    &:not(:last-child) {
      border-bottom: 1px solid rgba(219, 219, 219, 0.5);
    }
  }
}
.visually-hidden {
  display: none;
}
.multiselect {
  max-width: 100%;
}
.selected-option {
  background-color: rgba(213, 213, 213, 0.25);
}
</style>
