<template>
  <div>
  <table>
    <tr v-for="c,i in calc" :key="i">
      <td v-for="d,l in c" :style="isLongDivBorder(i,l)" :key="l">
        <divclass :d_data="d" :x="l" :y="i" />
      </td>
    </tr>
  </table>
  <LongDivisionWithDot ref="longdivision"></LongDivisionWithDot>
  <v-text-field
    ref="focusThis"
    @keyup.enter="pushYellow"
    @keyup.delete="deleteBack"
    @keyup.up="upYellow"
    @keyup.down="downYellow"
    @keyup.left="leftYellow"
    @keyup.right="rightYellow"
    @keyup.space="deleteYellow"
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
  
export default {
    name: 'HelloWorld',
    components : {
	"vue-mathjax": VueMathjax,
	'divclass': divclass,
	'LongDivisionWithDot' : LongDivisionWithDot
    },
    data: () => ({
	message : ''
    }),
    created: function () {
	this.$store.commit('registerMediator', {'x': 0, 'y':0 });
    },
    mounted : function() {
	this.$refs.focusThis.focus();
    },
    computed : {
	calc : {
	    get () {
		return this.$store.state.calc
	    },
	    set (value) {
		this.$store.commit('updateCaclc',value);
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
		if((y>1) && (y%2==0) && (this.calc[y][x].chr)) {
		    _ret += 'border-bottom: 1px solid #000;';
		}
		return _ret;
	    }
	},
	sep: {
	    get () {
		return this.$store.state.sep;
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value });
	    }
	}	
	
    },
    methods : {
	upYellow() {
	    this.$store.dispatch('moveUpNumeric');
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	downYellow() {
	    this.$store.dispatch('moveDownNumeric');
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	rightYellow() {
	    this.$store.dispatch('moveRightNumeric');
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},
	leftYellow() {
	    this.$store.dispatch('moveLeftNumeric');
	    this.message=this.$store.state.mediator.last.chr;
	    this.$refs.focusThis.focus();
	},		
	setValue( chr ) {
	    this.message = chr;
	},
	pushYellow() {
	    this.$store.dispatch('pushNumeric',{chr : this.message});
	    this.message=this.$store.state.mediator.last.chr;
	    this.$store.commit('updateFormula',{'formula':''});
	    this.$refs.focusThis.focus();
	    
	},
	deleteBack() {
	    this.$store.dispatch('deleteBackNumeric');		
	},
	deleteYellow() {
	    this.$store.dispatch('deleteNumeric');
	    this.message='';
	    this.$store.commit('updateFormula',{'formula':''});
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
