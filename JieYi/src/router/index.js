import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      // meta: { title: '首页', icon: 'dashboard' }
    }]
  },
 

  {
    path: '/modal',
    component: Layout,
    meta: { title: '模型管理', icon: 'tree',breadcrumb: false },
    children: [
      {
        path: 'setModal',
        component: () => import('@/pages/modal/setModal'),
        meta: { title: '创建模型' ,breadcrumb: false}
      },
      {
        path: 'modalDetails',
        component: () => import('@/pages/modal/modalDetails'),
        hidden: true,
        name:'modalDetails',
        meta: { title: '模型详情',breadcrumb: false}
      },
     {
      path: 'exmodal',
      meta: { title: '模型训练',breadcrumb: false},
      component: () => import('@/pages/modal/exmodal'),
      children:[{
      path: 'opt_exmodal',
      name: 'opt_exmodal',
      component: () => import('@/pages/modal/opt_exmodal'),
      meta: { title: '优化训练',breadcrumb: false}
      },{
        path: 'first_exmodal',
        name: 'first_exmodal',
        component: () => import('@/pages/modal/first_exmodal'),
        meta: { title: '初始化训练',breadcrumb: false}
        }
    ]
    },
    {
      path: 'testmodal',
      component: () => import('@/pages/modal/testmodal'),
      meta: { title: '模型评估',breadcrumb: false}
    },
    {
      path: 'pbmodal',
      name:'pbmodal',
      component: () => import('@/pages/modal/pbmodal'),
      meta: { title: '模型发布',breadcrumb: false}
    },
      {
        path: 'mymodal',
        name:'mymodal',
        component: () => import('@/pages/modal/mymodal'),
         meta: { title: '模型查看',breadcrumb: false}
      },
    //   {
    //   path: 'ctmodal',
    //   component: () => import('@/pages/modal/ctmodal'),
    //   meta: { title: '模型删除'}
    // },
   
    ]
  },


   {
        path: '/cldata',
        component: Layout,
        children: [
          {
            path: 'list',
            name: 'cldata',
            component: () => import('@/pages/data/cldata'),
            meta: { title: '数据集管理', icon: 'form',breadcrumb: false }
          },
          {
            path: 'details',
            component: () => import('@/pages/data/details'),
            name: 'details',
            hidden: true,
            meta: { title: '数据集详情',breadcrumb: false }
          },
          {
            path: 'sort',
            component: () => import('@/pages/data/sort'),
            name: 'sort',
            hidden: true,
            meta: { title: '数据集分类管理',breadcrumb: false}
          },
          {
            path: 'ctdata',
            name: 'ctdata',
            component: () => import('@/pages/data/ctdata'),
            hidden: true,
            meta: { title: '创建数据集'}

          },
        ]
 },

// {
//     path: '/data',
//     component: Layout,
//     meta: { title: '数据集管理', icon: 'form' },
//     children: [
//     {
//       path: 'cldata',
//       component: () => import('@/pages/data/cldata'),
//       meta: { title: '新建数据集'}
//     },
//       {
//         path: 'mydata',
//         component: () => import('@/pages/data/mydata'),
//          meta: { title: '查看数据集'}
//       },
//       {
//         path: 'deldata',
//         component: () => import('@/pages/data/deldata'),
//          meta: { title: '删除数据集'}
//       },
//       {
//         path: 'updata',
//         component: () => import('@/pages/data/updata'),
//          meta: { title: '更新数据集'}
//       },
//     ]
//   },

   {
        path: '/operator',
        component: Layout,
        children: [
          {
            path: 'list',
            name: 'operator',
            component: () => import('@/pages/operator/seeOperator'),
            meta: { title: '算子管理', icon: 'nested',breadcrumb: false}
          }
        ]
 },
 
// {
//     path: '/operator',
//     component: Layout,
//     meta: { title: '算子管理', icon: 'nested' },
//     children: [
//     {
//       path: 'seeOperator',
//       component: () => import('@/pages/operator/seeOperator'),
//       meta: { title: '查看算子'}
//     },
//       {
//         path: 'addOper',
//         component: () => import('@/pages/operator/addOper'),
//          meta: { title: '增加算子'}
//       },
//       {
//         path: 'delOperator',
//         component: () => import('@/pages/operator/delOperator'),
//          meta: { title: '删除算子'}
//       }
//     ]
//   },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
