<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-app-bar
	class="notprint"
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>筆算君2.0</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container
          fluid
        >
          <v-row
          >
            <v-col class="text-center">
	      <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer
	class="notprint"
        color="indigo"
        app
      >
        <span class="white--text">&copy; {{ new Date().getFullYear() }} JUNPAPA</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import A4 from './components/A4';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
  @media print {
  .notprint { display : none; }
  }
</style>  
