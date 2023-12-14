<template>
  <div class="round" :class="{ 'policy-condition': id === 'policy-condition' }">
    <input
      type="checkbox"
      :id="id"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    />
    <label :for="id"></label>

    <p class="label" :class="{ required: type === 'required' }">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: { type: String },
    label: { type: String },
    value: { type: Boolean },
    type: { type: String },
  },
};
</script>

<style scoped lang="scss">
.round {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  .label {
    cursor: pointer;
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    opacity: 0.5;
  }
  .required {
    opacity: 1;
  }
}
.policy-condition {
  align-items: flex-start;
  label {
    border: 1px solid var(--primary_color) !important;
  }
}
.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  height: 24px;
  position: relative;
  min-width: 24px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 6px;
  left: 5px;
  opacity: 0;
  position: absolute;
  top: 5px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type='checkbox'] {
  display: none;
}

.round input[type='checkbox']:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
}
</style>
