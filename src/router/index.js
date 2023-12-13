import Vue from 'vue';
import VueRouter from 'vue-router';
import FormsView from '@/views/FormsView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'forms',
    component: FormsView,
  },
  {
    path: '/create-form',
    name: 'create-form',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateFormView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
