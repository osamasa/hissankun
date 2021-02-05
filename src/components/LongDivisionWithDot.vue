<template>
<div>
  <v-form ref="divform">
    <v-text-field
      v-model="amari1"
      label="あまりを入力"
      @input="divMkFormula"      
      ></v-text-field>
    <v-text-field
      v-for="(i,n) in calcs" :key="n"
      v-model="calcs[n]"
      label="数式"
      @input="divMkFormula"      
      ></v-text-field>
  </v-form>
</div>
</template>
<script>
import { zeroPadding } from './zeroPadding.js'
  
export default {
    name: "LongdivsionWithDot",
    data() {
	return {
	    oya : '',
	    ko : '',
	    amari1 : "0",
	    syousuten : 0,
	    calcs : [],
	    nagasa :0,
	    kurisagari : 0,
	    answerdot : -1,
	    oyadot : -1
	};
    },
    mounted: function () {
	this.mkcalcs();
	this.divMkFormula();	
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
	    if(this.formula1.indexOf('/')<0) return;
	    let moji = this.formula1.trim().split('/');
	    this.oya = moji[0].trim();
	    this.ko = moji[1].trim();
	    if(this.answer1.indexOf('.') > -1) {
		this.answerdot = this.answer1.length-this.answer1.indexOf('.')-1;
		if(this.oya.indexOf('.')>-1) {
		    this.oyadot = this.oya.length-this.oya.indexOf('.')-1
		    if(this.answerdot > this.oyadot) {
			this.oya = this.oya + zeroPadding(this.answerdot - this.oyadot);
		    }
		} else {
		    this.oya = this.oya + '.' + zeroPadding(this.answerdot);
		}
	    }
            this.nagasa=this.answer1.length-(this.answerdot > -1 ? 1 : 0);
	    this.nagasa = this.nagasa*2 -1;

	    if(this.nagasa < 0) {
		this.nagasa = 1;
	    }

	    this.calcs=null;
	    this.calcs=Array(this.nagasa).fill(0);
	},
        divMkFormula() {
            let _formura='';
	    
            _formura = '$$ \\require{enclose} \\begin{array}{r}' + this.answer1 + ' \\\\ ' + this.ko + ' \\enclose{longdiv}{' + this.oya + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    const self=this;
	    let nokori = this.answer1.length-1
	    let headpad=0;
	    if(this.oyadot>-1) {
		nokori--;
	    }
	    this.calcs.forEach(n => {
		if(i===(self.nagasa-1)) {
		    _formura += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) +'}' + n + '} \\\\[-3pt]'
		} else if(i % 2 == 0) {
		    
		    _formura+= '\\' + 'underline{';
		    if(headpad > 0) {
			_formura+='\\phantom{' + zeroPadding(headpad+1) + '}'
		    }
		    
		    _formura += n;
		    if(nokori > 0) {
			_formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    
		    _formura += '} \\\\[-3pt]';
		} else {
		    _formura += n;
		    if(nokori > 0) {
			_formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    		    
		    _formura += ' \\\\[-3pt]'
		}		
		i++;
		if(i % 2 == 1) {
		    nokori--;
		    if((self.answerdot>-1) && (self.answer1.length-nokori,self.answer1.slice(self.answer1.length-nokori-1,self.answer1.length-nokori)==='.')) {
			nokori--
		    }
		}
	    })
	    _formura += '\\phantom{'+ zeroPadding(headpad) +'}' + this.amari1
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
	},
	
	answer1: function(n,o) {
	    if(n !== o) {
		this.answer1 = n;
		this.mkcalcs();
		this.divMkFormula();
	    }
	}
    }
}
</script>
