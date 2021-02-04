import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';

import '@/assets/styles/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faShareAlt, faExternalLinkAlt, faChevronCircleLeft, faChevronCircleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faStar, faThumbsUp, faPlusSquare, faTrashAlt, faMinusSquare, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faCreativeCommonsShare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faStar, faThumbsUp, faPlusSquare, faTrashAlt, faMinusSquare, faBookmark, faShareAlt, faCreativeCommonsShare, faExternalLinkAlt, faChevronCircleLeft, faChevronCircleRight, faAngleDoubleLeft, faAngleDoubleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.use(axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
