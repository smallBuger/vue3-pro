<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <div v-cycleColor="item" v-for="item in arr" :key="item">{{item}}</div> -->
  </div>
</template>
<script setup lang="ts" name="About">
import { ref,onMounted,inject} from 'vue';
import myPromise from '../utils/oberser'
type MyMethodType = () => string;

 const myMethod = inject<MyMethodType>('myMethodKey');
onMounted(()=>{
  myPromise.then(res=>{
    console.log(res);
  },err=>{
    console.log(err)
  })
  console.log(3434)
  // if (myMethod) {
  //   console.log(myMethod());
  // } else {
  //   console.error('myMethod is not provided');
  // }
})
</script>
<style>

</style>
