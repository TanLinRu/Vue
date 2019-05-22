import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

const routes = [
	{
    path: '/goods',
    name: 'goods',
    component: goods
	},
	{
    path: '/seller',
    name: 'seller',
    component: goods
	},
	{
    path: '/ratings',
    name: 'ratings',
    component: ratings
	}
]

const router = new Router({
	routes
})

router.push('/goods')

export default router
