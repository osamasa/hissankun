<template>
<div>
  <v-form ref="divform">
    <v-row v-for="(i,n) in dcols" :key="n">
      <v-col>
	<v-text-field
	  v-if="n % 2==0"
	  v-model="dcols[n].answer"
	  :label="'答え'+(n+1)"
	  @input="divMkFormula"      
	  ></v-text-field>
      </v-col>
      <v-col>
	<v-text-field	  
	  v-model="dcols[n].midformula"
	  :label="'数式'+(n+1)"
	  @input="divMkFormula"      
	  ></v-text-field>
      </v-col>
      <v-col>
	<v-checkbox @change="divMkFormula" label="小数点" v-model="dcols[n].isDot"></v-checkbox>
      </v-col>	
      <v-col cols="4">
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
    props :　['ope', 'formula1', '_formula'],    
    data() {
	return {
	    oya : '',
	    ko : '',
	    dcols : [],
	    amari1 : '',
	    dotflg : false,
	};
    },
    mounted: function () {
	this.mkcalcs();
	this.divMkFormula();	
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
	    this.dcols.forEach((n,i)=> {
		if(i%2==0) {
		    if(n.isDot) {
			ret +='.';
		    }
		    ret += n.answer;
		}
	    })
	    return ret;
	}
    },
    methods: {
	addAnasers : function(n) {
	    if(this.dcols.length-1 == n) {
		this.dcols.push({'isDot' : false,'answer':'0','midformula':'0'})
	    } else {
		this.dcols.splice(n,0, {'isDot' : false,'answer':'0','midformula':'0'})
	    }
	},
	delAnswers : function(n) {
	    this.dcols.splice(n,1);
	},	
	mkcalcs : function() {
	    if(this.formula1.indexOf('/')<0) return;
	    let moji = this.formula1.trim().split('/');
	    this.oya = moji[0].trim();
	    this.ko = moji[1].trim();
	    this.nagasa = 1;
	    this.dcols=[];
	    this.dcols.push({'isDot' : false,'answer':'0','midformula':'0'});
	},
	divMkFormula : function() {
	    let _formura='';
            _formura = '$$ \\require{enclose} \\begin{array}{l}' + '\\phantom{'+ zeroPadding(this.ko.length+1) +'}' + this.joinAnswers + ' \\\\ ' + this.ko + ' \\enclose{longdiv}{' + this.oya + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    const self=this;
	    this.dotflg=false;
	    this.dcols.forEach(n => {
		if(n.isDot==true) {
		    self.dotflg=true;
		}
		if(i % 2 == 0)  {
		    _formura += '\\phantom{'+ zeroPadding(this.ko.length+1 + parseInt(i/2)-(n.midformula.length-1)) + (self.dotflg ? '.' : '') + '}' + '\\' + 'underline{'+ n.midformula +  '} \\\\[-3pt]';
		} else {
		    _formura += '\\phantom{'+ zeroPadding(this.ko.length+1+parseInt(i/2)-(n.midformula.length-1)+1) + (self.dotflg ? '.' : '') + '}' + n.midformula +  ' \\\\[-3pt]';
		}
		i++;
	    })
	    _formura += '\\phantom{'+ zeroPadding(this.dcols.length+this.ko.length-this.amari1.length-1) + (self.dotflg ? '.' : '') + '}' + this.amari1;
            _formura += '\\end{array} $$'
	    this.formula=_formura;
	}
    },
    watch: {
	formula1: function(n,o) {
	    if(n !== o) {
		this.formula1 = n;
		this.mkcalcs();
		this.divMkFormula();
	    }
	}
    }
}
</script>
