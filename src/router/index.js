import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demoG6 from '@/components/demo-g6'
import drag from '@/components/drag'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/demo',
      name: 'demo',
      component: demoG6
    },{
      path:'/drag',
      name:'drag',
      component:drag
    }
  ]
})
