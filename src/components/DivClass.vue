<template>
<div @dblclick="dialog_f=!dialog_f" @click="clickDiv()" v-bind:class="d_flg ? 'isActive' : 'notActive'">
  <div class="absolute_center">{{ ip }}</div>
  <div v-if="kuri" class="absolute_kuri">{{ kuri }}</div>
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
	kuri : {
	    get : function() {
		console.log(this.$store.getters.getCalc({ 'id':this.id })[parseInt(this.y)][parseInt(this.x)].kuri)
		return this.$store.getters.getCalc({ 'id':this.id })[parseInt(this.y)][parseInt(this.x)].kuri;
	    },
	    set : function(value) {
		this.$store.commit('setCalc',{x : this.x, y: this.y , 'id':this.id, 'kuri' : value});
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
    height: 40px;
    width: 40px;
    position: relative;
}  
td>div.notActive {
    background: #f0f0f0;
}
td>div.isActive {
    background: #FFFF99;
}
div>div.absolute_kuri {
    position: absolute;
    right:0px;
    top:0px;
    width:10px;
    height:10px;
    border: 0.5px dashed #999;
}
div>div.absolute_center {
    position: absolute;
    top: 10px;
    left: 15px;
    width:20px;
    height:20px;
}  
</style>
