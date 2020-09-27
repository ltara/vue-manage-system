import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/UserManage/UserManage')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/VideoManage/VideoManage')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/Other/PageOne')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/Other/PageTwo')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    next()
  }
})

export default router
