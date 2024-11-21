// router.ts
import { createRouter, createWebHistory } from 'vue-router';
// import type { Component } from 'vue';
// import { markRaw } from 'vue';

// const routes: Array<{path:string,component: Component}>=[];

// // 动态导入所有 views 目录下的 .vue 文件
// const pages = import.meta.glob('../views/*.vue', { eager: true,import: 'default' });
// Object.entries(pages).forEach(([path, page]) => {
//   routes.push({ path: path.replace('../views/', '/').replace('.vue', ''), component: markRaw(page as Component) });

// });
const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/about', component: () => import('../views/AboutView.vue') },
];



const router = createRouter({
  history: createWebHistory(),
  routes
  // routes:[{ path: '/', component: () => import('../views/HomeView.vue') },...routes],
});

export default router;
