<template>
<div class="home">
  <newpadkun msg="Welcome to Your Vue.js App"/> 
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
<!--    <A4 msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import newpadkun from '@/components/NewPadKun.vue'
// import A4 from '@/components/A4';
export default {
  name: 'Home',
  components: {
      HelloWorld,newpadkun
      
  }
}
</script>
