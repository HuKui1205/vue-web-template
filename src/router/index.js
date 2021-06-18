import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
]


//* 需要权限的路由
export const needjurisdiction = [
  {
    //*匹配的路径
    path: "/",
    //!路由指向显示的文件路径，注意：如果该路由是作为一级路由时，指向的路径一定是layout
    component: Layout,
    //*重定向到二级路由
    redirect: "specimen",
    //!name的值一定不可以出现重复的，唯一标识符
    name: "",
    //*路由的属性，此处配置了图标
    meta: { icon: "QueueDownList" },
    //*子级路由
    //如果子级路由子有一个路由的时候，会覆盖一级路由，有两个路由的时候就不会
    children: [
      {
        //*匹配的路径
        path: '/specimen',
        component: () => import('@/views/specimen/specimen'),
        name:'specimen',
        /** 
          *!meta:路由的属性对象
          **title:出现在左边菜单栏的菜单名称
          **role：要拥有哪些权限才可以访问该路由
          **icon:左边菜单栏的图标
          *!activeMenu:当前路由如果隐藏，要用此属性，来激活上一级菜单
        */
        meta: { title: "样品", role: ["admin"],icon: "fullscreen" },
        /**
         * !如果该路由不需要出现在左边的菜单栏，要用该属性来隐藏
         * *hidden: true
         */
      }
    ]
  },
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
