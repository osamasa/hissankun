<template>
<div v-if="d_flg" @click="d_flg=!d_flg">
  {{ ip }}
</div>
<div v-else>
  <input v-model="ip"  @input="chgData()" size="1"/>
</div>  
</template>

<script>
export default {
    props : [ 'd_data', 'x', 'y' ],
    name: 'divclass',
    data: () => ({
	d_flg : false,
	ip : ''
    }),
    mounted :function() {
	this.ip=this.d_data;
    },
    methods : {
	chgData : function() {
	    this.$parent.calc[this.y].splice(this.x,1, this.ip);
	}
    },
    computed : {
    }
}
</script>

