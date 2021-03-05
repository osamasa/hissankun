import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import NewPadKun from '../components/NewPadKun.vue'
import ViewFormula from '../components/ViewFormula.vue'
import MondaiLists from '../components/MondaiLists.vue'

import A4 from '../components/A4.vue'


Vue.use(VueRouter)

const routes = [    
    {
      path: '/',
      name: 'Home',
      component: A4
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
