import { createApp } from 'vue'

import 'leaflet/dist/leaflet.css'
import 'primeicons/primeicons.css'
import './style.css'
import 'leaflet/dist/leaflet.css'

import App from './App.vue'
import router from './router/index.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'



library.add(faEarthAmericas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
