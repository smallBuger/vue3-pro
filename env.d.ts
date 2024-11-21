/// <reference types="vite/client" />
// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, object>;
  export default component;
}