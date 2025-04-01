// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Detail from '@/views/PostDetail.vue'

Vue.use(Router)

export default new Router({
    mode: 'history', // URL에 # 없애기
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/detail/:id',
            name: 'PostDetail',
            component: Detail
        }
    ]
})
