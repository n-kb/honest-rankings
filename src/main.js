import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './routes.js'

Vue.use(VueRouter);

import Layout from './components/Layout.vue';

const App = new Vue({
  el: '#app',
  components: { Layout },
  router
})
