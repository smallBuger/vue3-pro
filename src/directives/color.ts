import type { DirectiveBinding } from 'vue';
export default {
  mounted(el:HTMLElement, binding:DirectiveBinding) {
    const color = binding.value || 'lightblue'
    el.style.backgroundColor = color
  }
}
