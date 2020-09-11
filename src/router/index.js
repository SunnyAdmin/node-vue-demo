import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseView from '../layout/view.vue'
import LoginView from "../views/login.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: BaseView,
        name: 'BlogsModules',
        redirect: "/blogsList",
        meta: { title: "博客模块", icon: "md-list" },
        children: [
            {
                path: "blogsList",
                name: "blogsList",
                component: () => import("@/views/blogs/blogsList"),
                meta: { title: "博客列表", icon: "" }
            },
            {
                path: "blogsDetail",
                name: "blogsDetail",
                component: () => import("@/views/blogs/blogsDetail"),
                meta: { title: "博客详情", icon: "" },
                hidden: true
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
