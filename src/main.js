import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
Vue.config.productionTip = false
import '@/assets/style/index.scss'
import 'swiper/dist/css/swiper.css'
import Scroll from '@/base/scroll/scroll.vue'
Vue.component('scroll',Scroll)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
