<template>
  <div>
  <v-container>
  <v-row v-for="v in retvalue" :key="v.key">
    <v-col><v-btn @click="curkey=v.key;getMondai()">選択</v-btn></v-col><v-col>{{ v.title }}</v-col><v-col>{{ v.mdate }}</v-col><v-col><v-btn @click="curkey=v.key;removeData();"><v-icon>mdi-delete</v-icon></v-btn>
    </v-col>      
  </v-row> 
  </v-row>
  <v-row>
    <v-col>
      <v-pagination
	v-model="localPage"
	:length="getPages"
	></v-pagination>
    </v-col>
  </v-row>     
</v-container>
</div>
</template>

<script>
import Firebase from './../firebase';  
export default {
    name: 'lists',
    props : ['p','idialog'],
    components : {
    },
    data: () => ({
	curkey : '',
	lists : [],
    }),
    created : function(){
	Firebase.getMondaiCount();
    },
    mounted : function(){
    },
    computed : {
	localPage: {
	    get: function() {
		return this.p
	    },
	    set: function(value) {
		this.$emit('update:p', value)
	    },
	},
	localDialog: {
	    get: function() {
		return this.idialog
	    },
	    set: function(value) {
		this.$emit('update:idialog', value)
	    },
	},	
	getPages : function() {
	    return Math.round(this.$store.state.allmondainum / 5);
	},
	retvalue : function() {
	    return this.$store.state.retvalue.reverse();
	}
    },
    methods : {
	getMondai: function(){
	    Firebase.getMondai(this.curkey);
	    this.$emit('update:idialog', false)
	},	
	removeData : function() {
	    Firebase.deleteMondai(this.curkey);
	}
    }
}
</script>
