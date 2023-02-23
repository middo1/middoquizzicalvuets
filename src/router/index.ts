import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./pages/index.vue')
        },
        {
            path: '/question',
            name: 'question',
            component: () => import('./pages/question.vue')
        }
    ]
})