<template>
<div v-if="d_flg" @click="d_flg=!d_flg">
  {{ ip.chr }}
</div>
<div v-else>
  <input v-model="ip"  @input="chgData().chr" size="1"/>
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
	this.ip=this.d_data.chr;
    },
    methods : {
	chgData : function() {
	    let _tmp=this.$parent.calc.splice(this.y,1);
	    _tmp.splice(this.x,1,this.ip);
	    this.$parent.calc.splice(this.y,1,_tmp);
	}
    },
    computed : {
    }
}
</script>

