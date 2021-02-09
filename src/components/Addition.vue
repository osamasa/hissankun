<template>
<v-text-field
  v-model="answer1"
  label="回答"
  @input="divMkFormula"      
  ></v-text-field>        
</template>
<script>
import { zeroPadding } from './zeroPadding.js'  
export default {
    name: "Addition",
    props :　['id', 'formula1', '_formula','ope'],    
    data() {
	return {
	    moji : [],
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
	saveMath : function() {
	    this.$store.commit('setFormulas', {
		'id' : this.id,
		'moji' : this.moji,
		'answer1' : this.answer1
	    });
	},	  
        mkcalcs : function() {
	    if((!this.ope) || (this.formula1.indexOf(this.ope)<0)) return;
	    let moji = this.formula1.split(this.ope);
	    if(!((moji[0]===this.moji[0]) && (moji[1]===this.moji[1]))) {
		this.moji = moji.slice();
		this.answer1=''
	    }
	},
	initFromDB : function() {
	    this.moji = this.$store.getters.getFormulas({'id':this.id}).moji.slice()
	    this.calcs = this.$store.getters.getFormulas({'id':this.id}).calcs.slice()
	    this.answer1 = this.$store.getters.getFormulas({'id':this.id}).answer1	    
	},	  
        divMkFormula: function() {
            let _formura='';
	    
            _formura = '$$ \\begin{array}{r}';
	    
	    let i=0;
	    let maxlength = this.answer1.length;
	    const self = this;
	    this.moji.forEach( m => {
		if(++i != this.moji.length) {
		    _formura += m + ' \\\\[-3pt]';
		} else {
		    _formura += '\\' + 'underline{' + self.ope;
		    _formura += '\\phantom{' + zeroPadding( maxlength - m.length ) + '}'+ m + '}\\\\[-3pt]';
		}
	    });
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
