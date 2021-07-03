import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demoG6 from '@/components/demo-g6'
import drag from '@/components/drag'
import demoStore from '@/components/demo-store'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      component: () => import('@/components/404')
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/demoG6',
      name: 'demoG6',
      component: demoG6
    }, {
      path: '/drag',
      name: 'drag',
      component: drag
    }, {
      path: '/demoStore',
      name: 'demoStore',
      component: demoStore
    }
  ]
})
