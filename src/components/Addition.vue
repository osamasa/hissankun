<template>
  <v-text-field
    v-model="answer1"
    label="回答"
    @input="mulMkFormula"      
    ></v-text-field>        
</template>
<script>
import { zeroPadding } from './zeroPadding.js'  
  export default {
      name: "Addition",
      props :　['ope', 'formula1', '_formula'],
  data() {
      return {
	  moji : [],
	  answer1 : '0'
      };
    },
    mounted: function () {
	this.mkcalcs();
	this.mulMkFormula();	
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
         mkcalcs : function() {
	     this.moji=[];
	     this.moji = this.formula1.trim().split(this.ope);
	},
        mulMkFormula: function() {
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
          this.formula1 = n;
          this.mkcalcs();
          this.mulMkFormula();
        }
    }
  }
}
</script>

