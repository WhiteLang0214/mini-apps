import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/assets/reset.css';
import '@/assets/rem';
import '@/assets/svg';
import store from './store';
import { router } from './router';
import coms from '@/components';

const app = createApp(App);
// 注册element-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(coms)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#miniutils');
