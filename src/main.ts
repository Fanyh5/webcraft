import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import diff2html styles
import 'diff2html/bundles/css/diff2html.min.css'

// 导入路由
import router from './router'

// 导入 SEO 头部管理
import { createUnhead } from '@unhead/vue'

const app = createApp(App)

// 创建头部管理实例
const head = createUnhead()

// 使用路由和头部管理
app.use(router)
app.use(head as any)

app.mount('#app')
