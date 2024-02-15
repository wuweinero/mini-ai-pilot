import { createApp } from 'vue'
import App from './App.vue'
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(MdPreview)
app.use(Antd)
app.mount('#app')
