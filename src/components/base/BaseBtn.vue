<template>
  <button @click="$emit('on-click')" class="btn" :class="`btn-${size} ${type}-bg`">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'BaseBtn',

  props: {
    name: { type: String, default: '' },
    size: { type: String, default: '' },
    type: { type: String, default: '' },
  },
};
</script>

<style scoped lang="scss">
.btn {
  border-radius: 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: var(--primary_color);
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.4s;
}

.filled-bg {
  background-color: var(--primary_color);
  color: #fff;
  &:hover {
    background-color: #0c8e18;
  }
}

.empty-bg {
  border: 1px solid var(--primary_color);
  background-color: #fff;
  color: var(--primary_color);

  &:hover {
    background-color: #f6f6f6;
  }
}

.br-none-bg {
  background-color: #fff;
  color: var(--primary_color);
  &:hover {
    border: 1px solid var(--primary_color);
    transition: border 0.4s;
  }
}

.btn-lg {
  width: 160px;
  height: 51px;
}
.btn-sm {
}

.btn-md {
  width: 179px;
  height: 42px;
}
</style>
