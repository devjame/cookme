import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;

export { api, axios };
