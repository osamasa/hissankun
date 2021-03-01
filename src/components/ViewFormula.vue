<template>
<div>
  <div :style="'font-size : ' + bairtsu + '%'">
    <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
  </div>
</template>

<script>
import { zeroPadding } from './zeroPadding.js'
import { VueMathjax } from "vue-mathjax";

export default {
    props : ['id'],
    name: "Viewformula",
    components : {
	"vue-mathjax": VueMathjax,
    },
    data() {
	return {
	};
    },
    mounted: function () {
	MathJax.Hub.Config({
	});
	this.mkFormula()
    },
    computed: {
	kouban : function() {
	    return this.$store.getters.getKouban({ 'id':this.id });
	},
	lawformula : function() {
	    return this.$store.getters.getLawformula({ 'id':this.id });
	},
	calc : {
	    get () {
		return this.$store.getters.getCalc({ 'id':this.id })
	    },
	    set (value) {
		this.$store.commit('updateCalc',{'calc': value,'id':this.id} );
	    }
	},
	formula : {
	    get () {
		return this.$store.getters.getformula({ 'id':this.id })
	    },
	    set (value) {
		this.$store.commit('updateFormula',{'formula' : value, 'id':this.id });
	    }
	},
	sep: {
	    get () {
		return this.$store.getters.getSep({ 'id':this.id })
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value,'id':this.id });
	    }	    
	},	
	bairtsu : {
	    get () {
		return this.$store.getters.getBairitsu({'id': this.id});
	    },
	    set (value) {
		this.$store.commit('updatebairitsu',{'id': this.id });
	    }	
	}
    },
    methods: {
	mkFormula : function() {
	    let _formura=''
	    if(this.kouban) {
		_formura = '\(' + this.kouban + '\)$$ '
	    } else {
		_formura='$$';
	    }	    
	    if(this.sep === '/') {
		_formura += this.divMkFormula();
	    } else if((this.sep === '+') || (this.sep === '-')) {
		_formura += this.divPlusMkFormula();
	    } else if(this.sep === '*') {
		_formura += this.divMkMultiFormula();
	    } else {
		_formura += this.divMkLawFormula();
	    }
	    _formura += '$$';
            this.formula=_formura;

	},

	divMkLawFormula : function () {
	    return this.lawformula.replace(/\r?\n/g,'\\\\');
	},
	
        divMkMultiFormula: function() {
	    let _formura ='';
	    let _oya = this.calc[1].map(c => c.chr).join('');
	    let _ko = this.calc[2].map(c => c.chr).join('').replace(/[*]/,'');
	    let _anspos = (_ko.length)+3;
	    const _answer1=this.calc[ _anspos ].map(c => c.chr).join('');
	    
            _formura += ' \\begin{array}{r}';

	    let i=0;
	    
	    let maxlength = this.calc.length;

	    _formura += _oya + ' \\\\[-3pt]';
	    _formura += '\\' + 'underline{\\times';
	    _formura += '\\phantom{' + zeroPadding( maxlength - _ko.length ) + '}'+ _ko + '}\\\\[-3pt]';

	    const self=this;
	    for(let i=3;i<_anspos+1;i++) {
		let nokori = i-3
		let gyou='';
		for(let l=0;l<this.calc[i].length;l++) {
		    if(this.calc[i][l].kuri) {
			gyou+=this.calc[i][l].chr + '^'+ this.calc[i][l].kuri;
		    } else {
			gyou+=this.calc[i][l].chr;
		    }
		}
		if((nokori>0) && (i==_anspos-1)) {
		    let headpad=-(self.calc.length)-_answer1.length;
		    _formura += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) + '}' + gyou + '\\phantom{' +  zeroPadding(nokori) + '}} \\\\[-3pt]'
		} else if(i==_anspos) {
		    _formura += gyou;
		} else {
		    _formura += gyou;
		    if(nokori > 0) {
			_formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }
		    _formura += ' \\\\[-3pt]'		
		}
	    }
            _formura += '\\end{array}'
	    return _formura;
	},
	
	divPlusMkFormula: function() {
	    let _formura='';
	    if(this.kouban) {
		_formura = this.kouban + '$$ ';
	    } else {
		_formura='$$';
	    }	    
	    const _answer1=this.calc[3].map(c => c.chr).join('');	    
	    let _oya = this.calc[1].map(c => c.chr).join('');
	    let _ko = this.calc[2].map(c => c.chr).join('').replace(/[+-]/,'');
	    
            _formura += ' \\begin{array}{r}';
	    
	    let i=0;
	    let maxlength = this.calc[0].length;
	    const self = this;

	    _formura += _oya + ' \\\\[-3pt]';
	    _formura += '\\' + 'underline{' + this.sep;
	    _formura += '\\phantom{' + zeroPadding( maxlength - _ko.length ) + '}'+ _ko + '}\\\\[-3pt]';
	    _formura += _answer1;
            _formura += '\\end{array}';

	    return _formura;
	},
	divMkFormula() {
	    let _formura='';

	    const _answer1=this.calc[0].map(c => c.chr).join('');	    
	    let [_ko, _oya] = this.calc[1].map(c => c.chr).join('').split(')');
	    
	    let _oyadot = _oya.length - _oya.indexOf('.')-1

	    let _answerdot=_answer1.indexOf('.');
	    if(_answerdot < 0) {
		_answerdot = 0;
	    } else {
		_answerdot = 2;
	    }

            _formura += ' \\require{enclose} \\begin{array}{r}' + _answer1 + ' \\\\ ' + _ko + ' \\enclose{longdiv}{' + _oya + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    let nokori = _answer1.length;
	    let headpad=0;
//	    if(_oyadot>-1) {
		nokori--;
	    //	    }

	    this.calc.slice(2).forEach(_n => {

		let n = _n.map(c => c.chr).join('');
		if(n) {
		    if(i % 2 == 0) {
			_formura+= '\\' + 'underline{';
			if(headpad > 0) {
			    _formura+='\\phantom{' + zeroPadding(headpad+1) + '}'
			}
		    
			_formura += n;
			if(nokori > 0) {
			    _formura +='\\phantom{' + zeroPadding(nokori-_answerdot)+ '}'
			}		    
			_formura += '} \\\\[-3pt]';
		    } else {
			_formura += n;
			if(nokori > 0) {
			    _formura +='\\phantom{' + zeroPadding(nokori-_answerdot)+ '}'
			}		    		    
			_formura += ' \\\\[-3pt]'
		    }
		    i++;
		    if(i % 2 == 1) {
			nokori--;
			if((_answerdot>-1) && (_answer1.length-nokori,_answer1.slice(_answer1.length-nokori-1,_answer1.length-nokori)==='.')) {
			    nokori--
			}
		    }
		}
	    })
            _formura += '\\end{array}'
	    return _formura;
	}
    },
    watch: {
	kouban :  function(n,o) {
	    if(n!==o) {
		this.mkFormula();
	    }
	},
	formula : function(n,o) {
	    if(n!==o) {
		this.mkFormula();
	    }
	},
	lawformula : function(n,o) {
	    if(n!==o) {
		this.mkFormula();
	    }
	}
    }
}

</script>
