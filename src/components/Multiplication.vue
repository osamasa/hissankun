<template>
  <div>
    <v-form ref="mulform">
      <v-text-field
	v-for="(i,n) in calcs" :key="n"
	v-model="calcs[n]"
	label="数式"
	@input="divMkFormula"      
	></v-text-field>
      <v-text-field
	v-model="answer1"
	label="回答"
	@input="divMkFormula"      
	></v-text-field>      
    </v-form>
  </div>
</template>
<script>
import { zeroPadding } from './zeroPadding.js'  
export default {    
    name: "Multiplication",
    props :　['id', 'formula1', '_formula','ope'], 
    data() {
      return {
	  calcs : [],
	  moji : [],
	  nagasa :0,
	  kurisagari : 0,
	  answer1 : '0'
      };
    },
    mounted: function () {
	this.reloadFromDB()
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
	}	
     },
    methods: {
	reloadFromDB : function() {
	    this.initFromDB();
	},	
	initFromDB : function() {
	    this.moji = this.$store.getters.getFormulas({'id':this.id}).moji
	    this.calcs = this.$store.getters.getFormulas({'id':this.id}).calcs
	    this.answer1 = this.$store.getters.getFormulas({'id':this.id}).answer1
	},	
	saveMath : function() {
	    this.$store.commit('setFormulas', {
		'id' : this.id,
		'calcs' : this.calcs,
		'moji' : this.moji,
		'answer1' : this.answer1,
	    });
	},
        mkcalcs : function() {
	    if((!this.ope) || (this.formula1.indexOf(this.ope)<0)) return;
	    let moji = this.formula1.split(this.ope);
	    if(!((moji[0]===this.moji[0]) && (moji[1]===this.moji[1]))) {
		this.moji=moji.slice();
		this.nagasa=(this.moji[this.moji.length-1]).replace('.','').length;
		this.calcs=[];
		this.calcs=Array(this.nagasa).fill('0');
		this.answer1='0';
	    } else {
		this.nagasa = this.calcs.length;
	    }

	},
        divMkFormula: function() {
            let _formura='';
            _formura = '$$ \\begin{array}{r}';
	    
	    let i=0;
	    
	    let mojimaxlength = this.moji.reduce(function(a, b) {
		return Math.max(a.replace('.','').length, b.replace('.','').length);
	    });

	    let maxlength = Math.max(mojimaxlength, this.answer1.replace('.','').length);
	    let self = this;

	    this.moji.forEach( m => {
		if(++i != self.moji.length) {
		    _formura += m + ' \\\\[-3pt]';
		} else {
		    _formura += '\\' + 'underline{\\times';
		    _formura += '\\phantom{' + zeroPadding( maxlength - m.length ) + '}'+ m + '}\\\\[-3pt]';
		}
	    });
	    i=0;
	    this.calcs.forEach(n => {

		if(i===(self.nagasa-1)) {
		    let headpad=maxlength-Strign(n).length-(this.calcs.length-1)+1
		    
		    _formura += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) + '}' + n + '\\phantom{' +  zeroPadding(i) + '}} \\\\[-3pt]'
		} else  {
		    let nokori = i

		    _formura += n;
		    if(nokori > 0) {
                       _formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    		    
		    _formura += ' \\\\[-3pt]'
		}
		i++;
	    })
	    _formura += this.answer1;
            _formura += '\\end{array} $$';
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

