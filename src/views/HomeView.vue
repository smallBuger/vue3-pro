<script setup lang="ts" name="Home">
import { ref } from 'vue';
import {useCounterStore} from '../stores/counter'
import { useMouse } from '../composables/mouse'
import TheWelcome from '../components/TheWelcome.vue'
const counterStore = useCounterStore()
const { x, y } = useMouse()
const dataName = ref<string>('')
const change = () => {
  dataName.value = '123'
  counterStore.increment()
}
</script>

<template>
  <div>
    <div v-color>Mouse position is at: {{ x }}, {{ y }}</div>
    <button @click="change()">点击</button>
    <TheWelcome></TheWelcome>
  </div>
</template>
