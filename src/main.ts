import { createApp } from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.scss';

const vue = createApp(App);
vue.use(router);
vue.use(store);
// @ts-ignore
vue.use(Antd);

vue.mount('#app');
