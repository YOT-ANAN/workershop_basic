import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '',
    name: 'Toolbar',
    component: () => import('../views/Toolbar.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/About.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/grade-calculator',
        name: 'GradeCalulator',
        component: () => import('../views/GradeCalculator.vue')
      },
      {
        path: '/api-con',
        name: 'ApiCon',
        component: () => import('../views/Apicon.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/management/products',
        name: 'ManagementProduct',
        component: () => import('../views/ManagementProducts.vue')
      },
      {
        path: '/management/users',
        name: 'ManagementUsers',
        component: () => import('../views/ManagementUsers.vue')
      },
      {
        path: '/management/orders',
        name: 'ManagementOrders',
        component: () => import('../views/ManagementOrders.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
