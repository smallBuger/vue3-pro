import type {DirectiveBinding} from 'vue'
export default {
  mounted(el:HTMLElement, binding:DirectiveBinding) {
    if(binding.value % 2 === 0) {
      el.style.backgroundColor = '#ff0000'
    }
  },
}
