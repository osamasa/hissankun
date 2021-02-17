<template>
<div>
  <div class="d-flex ma-2">
    <v-btn @click="viewformula" color="primary">画像のみ表</v-btn>
    <v-btn @click="backtoformula" class="ml-2" color="primary">数式に戻る</v-btn>
  </div>
  <table>
    <tr v-for="c,i in calc" :key="i">
      <td v-for="d,l in c" :style="isLongDivBorder(i,l)" :key="l">
        <divclass :d_data="d" :x="l" :y="i" :id="_id" />
      </td>
    </tr>
  </table>
  <LongDivisionWithDot ref="longdivision" :id="_id"></LongDivisionWithDot>
  <v-text-field
    @keyup.esc="backtoformula"
    @keyup.enter="pushYellow"
    @keyup.delete="deleteBack"
    @keyup.up="upYellow"
    @keyup.down="downYellow"
    @keyup.left="leftYellow"
    @keyup.right="rightYellow"
    @keyup.space="deleteYellow"    
    ref="focusThis"
    v-model="message"
    label="数字を入力"
    type="text"
    >
    <template v-slot:append-outer >
      <v-btn @click="pushYellow" color="primary">入力</v-btn>
      <v-btn @click="deleteYellow" class="ml-2" color="primary">削除</v-btn>
    </template>
  </v-text-field>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";  
import divclass from './DivClass.vue';
import LongDivisionWithDot from './LongDivisionWithDot.vue';
import Vuex from "vuex";

export default {
    name: 'HelloWorld',
    components : {
	"vue-mathjax": VueMathjax,
	'divclass': divclass,
	'LongDivisionWithDot' : LongDivisionWithDot
    },
    data: () => ({
	_id : 0,
	message : ''
    }),
    created: function () {
	this._id = this.$route.params.id;
	this.$store.commit('registerMediator', {'x': 0, 'y':0 , 'id': this._id});
    },
    mounted : function() {
	this.$refs.focusThis.focus();
    },
    computed : {
	calc : {
	    get () {
		return this.$store.getters.getCalc({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('updateCalc',{'calc' : value, 'id' : this._id});
	    }
	},
	sep: {
	    get () {
		return this.$store.getters.getSep({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value , 'id' : this._id});
	    }
	},
	isLongDivBorder : function() {
	    return (y,x) => {
		let _ret = '';
		if((y==0) &&  (this.calc[y][x].chr)) {
		    _ret += 'border-bottom: 1px solid #000;';
		}		  
		for(let i=0;i<x;i++) {
		    if((this.calc[y][i].chr === ')') && (this.calc[y][x].chr)) {
			_ret += 'border-top: 1px solid #000;';
		    }
		}
		if(((y>1) && (y%2==0) && (this.sep==='/') && (this.calc[y][x].chr))) {
		    _ret += 'border-bottom: 1px solid #000;';
		}
		if(((y==2) && (this.sep!=='/') && (x>0))) {
		    _ret += 'border-bottom: 1px solid #000;';
		}
		if((this.sep==='*') && (y==this.calc.length-1) && (this.calc[y][x].chr))
		{
		    _ret += 'border-top: 1px solid #000;';
		}
		return _ret;
	    }
	},
	
    },
    methods : {
	viewformula() {
	    this.$router.push({name : 'view', params: {'id': this._id}});
	},
	backtoformula() {
	    this.$router.push({name : 'input', params: {'id': this._id}});
	},	
	upYellow() {
	     this.$store.dispatch('moveUpNumeric',{'id': this._id});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	downYellow() {
	     this.$store.dispatch('moveDownNumeric',{'id': this._id});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	rightYellow() {
	     this.$store.dispatch('moveRightNumeric',{'id': this._id});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	leftYellow() {
	    this.$store.dispatch('moveLeftNumeric',{'id': this._id});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},		
	setValue( chr ) {
	    this.message = chr;
	},
	pushYellow() {
	    this.$store.dispatch('pushNumeric',{chr : this.message, 'id': this._id});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$store.commit('updateFormula',{'formula':'', 'id': this._id});
	    this.$refs.focusThis.focus();
	    
	},
	deleteBack() {
	    this.$store.dispatch('deleteNumeric',{'id': this._id});
	    this.message='';
	    this.$store.commit('updateFormula',{'formula':'','id': this._id});
	    this.$refs.focusThis.focus();	    
	},
	deleteYellow() {
	     this.$store.dispatch('deleteNumeric',{'id': this._id});
	    this.message='';
	    this.$store.commit('updateFormula',{'formula':'','id': this._id});
	    this.$refs.focusThis.focus();
	},
	setPress() {
	    this.$refs.focusThis.focus();
	},
    }
}

</script>
<style>
table {
    border-collapse: collapse;
}
td {
    border: 1px dashed #999;
}
</style>
