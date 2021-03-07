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
    <div>
      <v-alert v-show="isSuccess" type="success" @click="resetMessage('Success')">
	{{ SuccessMessage }}
      </v-alert>
      <v-alert  v-show="isInfo" type="info" @click="resetMessage('Info')">
	{{ InfoMessage }}
      </v-alert>
      <v-alert  v-show="isWarning" type="warning" @click="resetMessage('Warning')">
	{{ WarningMessage }}
      </v-alert>
      <v-alert  v-show="isError" type="error" @click="resetMessage('Error')">
	{{ ErrorMessage }}
      </v-alert>
    </div>	      
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

export default {
  name: 'App',

  components: {
      HelloWorld,
          Authentication
  },

  data: () => ({
    //
  }),
    computed : {
	isSuccess : function() {
	    return this.$store.state.isSuccess;
	},
	isInfo : function() {
	    return this.$store.state.isInfo;
	}	,
	isWarning : function() {
	    return this.$store.state.isWarning;
	}	,
	isError : function() {
	    return this.$store.state.isError;
	},
	SuccessMessage : function() {
	    return this.$store.state.SuccessMessage
	},
	InfoMessage : function() {
	    return this.$store.state.InfoMessage
	},
	WarningMessage : function() {
	    return this.$store.state.WarningMessage
	},
	ErrorMessage : function() {
	    return this.$store.state.ErrorMessage
	},		
    },
    methods : {
	resetMessage : function( mtype) {
	    this.$store.commit('resetMessage',{ mtype : mtype });
	}
    }
};
</script>

<style lang="scss" scoped>
  @media print {
  .notprint { display : none; }
  }
</style>  
