<template>
  <div class="form-item">
    <div class="form-item__info">
      <div class="form-item__author">
        <p>Форма регистрации участников</p>
        <span>Автор: user 1</span>
      </div>
      <span>Дата создания: 01.01.23</span>
    </div>

    <div class="form-item__control">
      <BaseBtn name="Редактировать" size="md" type="empty" />
      <BaseBtn name="Удалить" size="md" type="br-none" />
    </div>
  </div>
</template>

<script>
import BaseBtn from './base/BaseBtn.vue';

export default {
  name: 'FormItem',
  components: { BaseBtn },
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
