<template>
  <div class="field__required" :class="{ 'policy-condition': id === 'policy-condition' }">
    <input :id="`checkbox${id}`" type="checkbox" />
    <label :for="`checkbox${id}`">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: { type: String },
    label: { type: String },
  },
};
</script>

<style scoped lang="scss">
.field__required {
  display: flex;
  align-items: center;
  gap: 16px;
  input,
  label {
    cursor: pointer;
  }

  label {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
}
.policy-condition {
  align-items: flex-start;
  label {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    opacity: 0.5;
  }
}
</style>
