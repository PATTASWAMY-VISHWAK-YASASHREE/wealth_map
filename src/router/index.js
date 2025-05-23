import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

import MapView from '../components/MapView.vue'

const routes = [
  { path: '/', component: MapView },
  { path: '/hello', component: HelloWorld },
  {path: '/map', component: MapView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router