import Vue from 'vue'
import App from './App.vue'
// 导入 Element UI 和全部的样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 使用 Element UI
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

