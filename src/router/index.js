import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import NewPadKun from '../components/NewPadKun.vue'
import ViewFormula from '../components/ViewFormula.vue'
import A4 from '../components/A4.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'Home',
      component: A4,
      children : [
	  {  name : 'input', path: ':id', component: HelloWorld },
	  {  name : 'calc' , path: 'calc/:id', component: NewPadKun },
	  {  name : 'view' , path: 'view/:id', component: ViewFormula }
      ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
