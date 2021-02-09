<template>
<div>
  <v-form ref="divform">
    <v-row v-for="(i,n) in calcs" :key="n">
      <v-col>
	<v-text-field
	  v-if="n % 2==0"
	  v-model="calcs[n].answer"
	  :label="'答え'+(n+1)"
	  @input="divMkFormula"      
	  ></v-text-field>
      </v-col>
      <v-col>
	<v-text-field	  
	  v-model="calcs[n].midformula"
	  :label="'数式'+(n+1)"
	  @input="divMkFormula"      
	  ></v-text-field>
      </v-col>
      <v-col>
	<v-checkbox @change="divMkFormula" label="小数点" v-model="calcs[n].isDot"></v-checkbox>
      </v-col>	
      <v-col >
	<v-btn
	  v-show="n>0"
	  class="mx-2"
	  fab
	  dark
	  small
	  @click="delAnswers(n);divMkFormula()"
	   color="primary"
	   >
	  <v-icon dark v-show="n>0">
             mdi-minus
	   </v-icon>
	</v-btn>
	<v-btn
	   class="mx-2"
	   fab
	   dark
	   small
	  color="warning"
	  @click="addAnasers(n);divMkFormula()"
	   >
	   <v-icon>
             mdi-plus
	   </v-icon>
	</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
	<v-text-field	  
	  v-model="amari1"
	  label="あまり"
	  @input="divMkFormula"      
	  ></v-text-field>
      </v-col>	
    </v-row>
  </v-form>
</div>
</template>
<script>
import { zeroPadding } from './zeroPadding.js'
  
export default {
    name: "LongdivsionWithDot",
    props :　['formula1', '_formula','id','ope'],    
    data() {
	return {
	    moji :[],
	    calcs : [],
	    amari1 : '',
	    answer1 : '0',
	    dotflg : false,
	};
    },
    mounted: function () {
	this.reloadFromDB();
	this.mkcalcs();
	this.divMkFormula()	
    },
    computed: {
	formula: {
	    get () {
		return this._formula;
	    },
	    set (value) {
		this.$emit('update:_formula', value)
	    }
	},
	joinAnswers() {
	    let ret=''
	    this.calcs.forEach((n,i)=> {
		if(i%2==0) {
		    if(n.isDot) {
			ret +='.';
		    }
		    ret += n.answer;
		}
	    })
	    this.answer1 = ret;
	    return this.answer1;
	}
    },
    methods: {
	reloadFromDB : function() {
	    this.initFromDB();
	},
	saveMath : function() {
	    this.$store.commit('setFormulas', {
		'id' : this.id,
		'calcs' : this.calcs,
		'moji' : this.moji,
		'amari' : this.amari,
		'answer1' : this.answer1,
	    });
	},	

	initFromDB : function() {
	    this.moji = this.$store.getters.getFormulas({'id':this.id}).moji.slice();
	    this.calcs = this.$store.getters.getFormulas({'id':this.id}).calcs.slice();
	    this.amari1 = this.$store.getters.getFormulas({'id':this.id}).amari1
	    this.answer1 = this.$store.getters.getFormulas({'id':this.id}).answer1
	},
	addAnasers : function(n) {
	    if(this.calcs.length-1 == n) {
		this.calcs.push({'isDot' : false,'answer':'0','midformula':'0'})
	    } else {
		this.calcs.splice(n,0, {'isDot' : false,'answer':'0','midformula':'0'})
	    }
	},
	delAnswers : function(n) {
	    this.calcs.splice(n,1);
	},	
	mkcalcs : function() {
	    if((!this.ope) || (this.formula1.indexOf(this.ope)<0)) return;
	    let moji = this.formula1.split(this.ope);
	    if(!((moji[0]===this.moji[0]) && (moji[1]===this.moji[1]))) {
		this.amari1='0'
		this.moji=moji.slice();
		this.calcs=[];
		this.calcs.push({'isDot' : false,'answer':'0','midformula':'0'});
		this.answer1=''
	    }
	},
	divMkFormula : function() {
	    let _formura='';
            _formura = '$$ \\require{enclose} \\begin{array}{l}' + '\\phantom{'+ zeroPadding(this.moji[1].length+1) +'}' + this.joinAnswers + ' \\\\ ' + this.moji[1] + ' \\enclose{longdiv}{' + this.moji[0] + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    const self=this;
	    this.dotflg=false;
	    this.calcs.forEach(n => {
		if(n.isDot==true) {
		    self.dotflg=true;
		}
		if(i % 2 == 0)  {
		    _formura += '\\phantom{'+ zeroPadding(this.moji[1].length+1 + parseInt(i/2)-(n.midformula.length-1)) + (self.dotflg ? '.' : '') + '}' + '\\' + 'underline{'+ n.midformula +  '} \\\\[-3pt]';
		} else {
		    _formura += '\\phantom{'+ zeroPadding(this.moji[1].length+1+parseInt(i/2)-(n.midformula.length-1)+1) + (self.dotflg ? '.' : '') + '}' + n.midformula +  ' \\\\[-3pt]';
		}
		i++;
	    })
	    _formura += '\\phantom{'+ zeroPadding(this.calcs.length+this.moji[1].length-this.amari1.length-1) + (self.dotflg ? '.' : '') + '}' + this.amari1;
            _formura += '\\end{array} $$'
	    this.formula=_formura;
	}
    },
    watch: {
	formula1: function(n,o) {
	    if(n !== o) {
		this.mkcalcs();
		this.divMkFormula();
	    }
	}
    }
}
</script>
