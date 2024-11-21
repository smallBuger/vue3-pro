import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import directives from './directives'
import myPlugin from './plugins/myPlugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)
console.log(Object.keys(directives))

const directiveKeys = Object.keys(directives) as (keyof typeof directives)[]
// 注册所有自定义指令
directiveKeys.forEach(key => {
  app.directive(key, directives[key])
})
app.use(myPlugin, { color: 'blue' });
app.use(createPinia())
app.use(router)

app.mount('#app')
