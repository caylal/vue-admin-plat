import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import NotFound from '@/views/error/404'
import Home from '@/views/home/Home'

Vue.use(Router)

const router = new Router({
  base: '/avenir/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/user',
      hidden: true
    },
    {
      path: '/',
      name: '系统管理',
      component: Home,
      meta: {
        icon: 'el-icon-setting'
      },
      children: [
        {
          path: '/user',
          name: '车主管理',
          component: resolve => require(['../views/sys/User.vue'], resolve),
          meta: {
            icon: 'fa fa-user'
          }
        },
        {
          path: '/type',
          name: '权益类型管理',
          component: resolve => require(['../views/sys/Type.vue'], resolve),
          meta: {
            icon: 'fa fa-briefcase'
          }
        }
      ]
    },
    {
      path: '/airport',
      name: '接送机管理',
      component: Home,
      meta: {
        icon: 'fa fa-plane'
      },
      children: [
        {
          path: '/airport/order',
          name: '接送机订单',
          component: resolve => require(['../views/order/Airport.vue'], resolve),
          meta: {
            icon: 'fa fa-file-text'
          }
        },
        {
          path: '/airport/countAirport',
          name: '接送机使用次数',
          component: resolve => require(['../views/statistics/CountAirport.vue'], resolve),
          meta: {
            icon: 'fa fa-bar-chart'
          }
        },
        {
          path: '/airport/orderAirport',
          name: '接送机数据统计',
          component: resolve => require(['../views/orderCount/orderAirport.vue'], resolve),
          meta: {
            icon: 'fa fa-area-chart'
          }
        }
      ]
    },
    {
      path: '/rent',
      name: '车辆租赁管理',
      component: Home,
      meta: {
        icon: 'fa fa-bus'
      },
      children: [
        {
          path: '/rent/order',
          name: '车辆租赁订单',
          component: resolve => require(['../views/order/Rent.vue'], resolve),
          meta: {
            icon: 'fa fa-file-text'
          }
        },
        {
          path: '/rent/countRent',
          name: '租车使用次数',
          component: resolve => require(['../views/statistics/CountRent.vue'], resolve),
          meta: {
            icon: 'fa fa-bar-chart'
          }
        },
        {
          path: '/rent/orderRent',
          name: '租车数据统计',
          component: resolve => require(['../views/orderCount/orderRent.vue'], resolve),
          meta: {
            icon: 'fa fa-area-chart'
          }
        }
      ]
    },
    {
      path: '/pickup',
      name: '取送车管理',
      component: Home,
      meta: {
        icon: 'fa fa-car'
      },
      children: [
        {
          path: '/pickup/order',
          name: '取送车订单',
          component: resolve => require(['../views/order/Pickup.vue'], resolve),
          meta: {
            icon: 'fa fa-file-text'
          }
        },
        {
          path: '/pickup/countPickup',
          name: '取送车使用次数',
          component: resolve => require(['../views/statistics/CountPickup.vue'], resolve),
          meta: {
            icon: 'fa fa-bar-chart'
          }
        },
        {
          path: '/pickup/orderPickup',
          name: '取送车数据统计',
          component: resolve => require(['../views/orderCount/orderPickup.vue'], resolve),
          meta: {
            icon: 'fa fa-area-chart'
          }
        }
      ]
    },
    // {
    //   path: '/quantity',
    //   name: '单量统计管理',
    //   component: Home,
    //   meta: {
    //     icon: 'fa fa-area-chart'
    //   },
    //   children: [
    //     {
    //       path: '/countAirport',
    //       name: '接送机单量',
    //       component: CountAirport,
    //       meta: {
    //         icon: 'fa fa-plane'
    //       }
    //     },
    //     {
    //       path: '/countRent',
    //       name: '车辆租赁单量',
    //       component: CountRent,
    //       meta: {
    //         icon: 'fa fa-bus'
    //       }
    //     },
    //     {
    //       path: '/countPickup',
    //       name: '取送车单量',
    //       component: CountPickup,
    //       meta: {
    //         icon: 'fa fa-car'
    //       }
    //     }
    //   ]
    // },
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
      hidden: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('userInfo')
  if (to.path === '/login') {
    // 如果访问登录页面，如果用户会话信息存在，代表已经登录过了，跳转到主页
    if (userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录页面，且会话信息不存在，表示未登录，则跳转到登录页面
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
