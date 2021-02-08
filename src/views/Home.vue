<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
<!--    <A4 msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import A4 from '@/components/A4';
export default {
  name: 'Home',
  components: {
      HelloWorld
  }
}
</script>
