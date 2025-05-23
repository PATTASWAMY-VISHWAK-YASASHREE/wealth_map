import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import MapView from '../components/MapView.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Owners from '../views/Owners.vue' // Import the Owners component
import DefaultLayout from '../layout/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/owners', // Add new route for Owners
        name: 'Owners',
        component: Owners
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router