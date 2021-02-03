<template>
</template>
<script>
  export default {
      name: "Addition",
      props :　['ope'],
  data() {
      return {
	  moji : [],
      };
    },
    mounted: function () {
	this.mkcalcs();
	this.mulMkFormula();	
    },
    computed: {
	formula1: {
	    get () {
		return this.$store.state.formula1
	    },
	    set (value) {
		this.$store.commit('setFormula1', value)
	    }
	},
	answer1: {
	    get () {
		return this.$store.state.answer1
	    },
	    set (value) {
		this.$store.commit('setAnswer1', value)
	    }
	},
	formula: {
	    get () {
		return this.$store.state.formula
	    },
	    set (value) {
		this.$store.commit('setFormula', value)
	    }
	}
     },
     methods: {
         mkcalcs : function() {
	     this.moji=[];
	     this.moji = this.formula1.trim().split(this.ope);
	},
        mulMkFormula: function() {
	    function zeroPadding(_nagasa){
		if(_nagasa > 1)
		    return ( Array(_nagasa).join('1') );
		else
		    return "1";
             }
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

