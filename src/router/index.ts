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
            path: '/questions/:id',
            name: 'questions',
            component: () => import('./pages/questions.vue')
        }
    ]
})