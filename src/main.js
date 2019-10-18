import Vue from 'vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import animate from 'animate.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faCalendar,faEdit,faBars,faComment,faBook,faFilm,faMusic,faHandPointLeft,faHandPointRight,faFish,faCommentDots} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { dom } from '@fortawesome/fontawesome-svg-core'


Vue.use(MintUI)

library.add(faHome,faCalendar,faEdit,faBars,faComment,faBook,faFilm,faMusic,faHandPointLeft,faHandPointRight,faFish,faCommentDots)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// dom.watch()

Vue.config.productionTip = false

new Vue({
  router,
  store
}).$mount('#app')
