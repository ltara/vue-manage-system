import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
