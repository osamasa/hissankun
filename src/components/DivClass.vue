<template>
<div @dblclick="dialog_f=!dialog_f" @click="clickDiv()" v-bind:class="d_flg ? 'isActive' : 'notActive'">
  {{ ip }}
</div>
</template>

<script>
export default {
    props : [ 'x', 'y' , 'id'],
    name: 'divclass',
    data: () => ({
	dialog_f : false
    }),
    mounted :function() {
    },
    methods : {
	clickDiv() {
	    this.$store.commit('registerMediator', {'x': this.x, 'y': this.y, 'id': this.id});
	    this.$parent.setValue(this.ip);
	    this.$parent.$refs.focusThis.focus();
	}
    },
    computed : {
	ip : {
	    get : function() {
		return this.$store.getters.getCalc({ 'id':this.id })[parseInt(this.y)][parseInt(this.x)].chr;
	    },
	    set : function(value) {
		this.$store.commit('setCalc',{x : this.x, y: this.y , 'id':this.id, 'chr' : value});
	    }
	},
	d_flg :  {
	    get : function() {
		return this.$store.getters.getCalc({ 'id':this.id })[parseInt(this.y)][parseInt(this.x)].isActive;
	    },
	    set : function(value) {
		this.$store.commit('setCalc',{x : this.x, y: this.y , 'id':this.id , 'isActive' : value});
	    }	    
	}
    },
    watch : {
    }
}
</script>

<style>
  td>div {
  height: 60px;
  width: 60px;
  text-align: center;
  vertical-align: middle;    
  }  
  td>div.notActive {
     background: #f0f0f0;
  }
  td>div.isActive {
      background: #FFFF99;
  }
</style>
