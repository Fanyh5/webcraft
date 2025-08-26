import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入路由
import router from './router'

const app = createApp(App)

// 使用路由
app.use(router)

app.mount('#app')
