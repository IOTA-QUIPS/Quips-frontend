// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/home/pages/Home.vue';
import LoginComponent from '@/auth/pages/Login.vue';

const routes = [
    { path: '/', redirect: '/home' },  // Redirigir la raíz a /home
    { path: '/home', component: HomeComponent },
    { path: '/login', component: LoginComponent }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
