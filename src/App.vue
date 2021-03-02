<template>
<div id="app">
  <v-app id="inspire">

      <v-app-bar
	class="notprint"
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>筆算君2.5</v-toolbar-title>
	<v-spacer />
	<Authentication />
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

</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Authentication from "@/components/Authentication.vue";
import A4 from './components/A4';

export default {
  name: 'App',

  components: {
      HelloWorld,
          Authentication
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
