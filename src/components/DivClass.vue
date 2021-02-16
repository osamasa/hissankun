<template>
<div @click="d_flg=!d_flg" v-bind:class="d_flg ? 'isActive' : 'notActive'">
  {{ ip }}
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
	this.d_flg=this.d_data.isActive;	
    },
    methods : {
    },
    computed : {
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
