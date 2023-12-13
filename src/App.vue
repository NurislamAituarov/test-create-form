<template>
  <div id="app">
    <div class="wrapper">
      <LeftSideBare />
      <router-view />
    </div>
  </div>
</template>

<script>
import LeftSideBare from './components/LeftSideBare.vue';

export default {
  name: 'App',
  components: { LeftSideBare },
};
</script>

<style>
@import url(./assets/styles/main.css);
.wrapper {
  max-width: 1440px;
  height: 100vh;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
}
.left-sidebar {
  max-width: 434px;
  padding: 80px 90px 62px 179px;
  background-color: #fff;
}
</style>
