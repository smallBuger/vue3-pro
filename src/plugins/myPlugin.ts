import type { App } from "vue";
interface PluginOptions {
  [key:string]: string
}
export default {
  install: (app: App, options: PluginOptions = {}) => {
    // 1. 添加全局方法或属性
    const myMethod = <T>(params:T) => {
        console.log(`My plugin method called with ${params}`);
    }
    app.provide('myMethodKey', myMethod)
    const defaultOptions:PluginOptions = { color: 'red' };
    if (options && options.color) {
      defaultOptions.color = options.color;
    }
    app.provide('pluginOptions', defaultOptions);
   }
}
