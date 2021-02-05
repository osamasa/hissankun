<template>
  <div>
    <v-form ref="mulform">
      <v-text-field
	v-for="(i,n) in calcs" :key="n"
	v-model="calcs[n]"
	label="数式"
	@input="mulMkFormula"      
	></v-text-field>
    </v-form>
  </div>
</template>
<script>
import { zeroPadding } from './zeroPadding.js'  
export default {    
    name: "Multiplication",
    props :　['ope', 'formula1', 'answer1', '_formula'],    
    data() {
      return {
	  calcs : [],
	  moji : [],
	  nagasa :0,
	  kurisagari : 0
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
	     this.moji = this.formula1.trim().split('*');
             this.nagasa=(this.moji[this.moji.length-1]).length;
	     this.calcs=null;
	     this.calcs=Array(this.nagasa).fill(0);
	},
        mulMkFormula: function() {
            let _formura='';
            _formura = '$$ \\begin{array}{r}';
	    
	    let i=0;
	    let maxlength = this.answer1.length;
	    this.moji.forEach( m => {
		if(++i != this.moji.length) {
		    _formura += m + ' \\\\[-3pt]';
		} else {
		    _formura += '\\' + 'underline{\\times';
		    _formura += '\\phantom{' + zeroPadding( maxlength - m.length ) + '}'+ m + '}\\\\[-3pt]';
		}
	    });
	    const self=this;
	    i=0;

	    this.calcs.forEach(n => {
		if(i===(self.nagasa-1)) {
		    let headpad=maxlength-String(n).length-(this.calcs.length-1)+1
		    
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
          this.formula1 = n;
          this.mkcalcs();
          this.mulMkFormula();
        }
    },
    answer1: function(n,o) {
       if(n !== o) {
          this.answer1 = n;
          this.mkcalcs();
          this.mulMkFormula();
       }
    }
  }
}
</script>

