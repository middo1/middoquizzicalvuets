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
            path: '/questions',
            name: 'questions',
            component: () => import('./pages/questions.vue')
        }
    ]
})