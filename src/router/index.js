import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    { path: '', redirect: '/fish' },
    { path: '/fish', component: () => import("@/views/fish/index.vue") }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

export async function setupRouter(app){
    app.use(router)
    await router.isReady()
}

export  default router