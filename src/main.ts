import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const vue = createApp(App);
vue.use(router);
vue.use(store);
// @ts-ignore
vue.use(Antd);

vue.mount('#app');
