<template>
  <div v-move-drag style="top: 50vh; left: 20vw; ">
    <div ref="ff" id="ff">
      <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
    <div v-show="debug">
      <textarea  v-model="formula" cols="30" rows="10"></textarea>
    </div>
  </div>
</template>
<script>
import { zeroPadding } from './zeroPadding.js'
import { VueMathjax } from "vue-mathjax";

export default {
    props : ['id'],    
    name: "LongdivsionWithDot",
    components : {
	"vue-mathjax": VueMathjax,
    },    
    data() {
	return {
	    debug : false
	};
    },
    mounted: function () {
	MathJax.Hub.Config({
	});
	this.mkFormula()
    },
    computed: {
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
	}
    },
    methods: {
	mkFormula() {
	    if(this.sep === '/') {
		this.divMkFormula();
	    } else if((this.sep === '+') || (this.sep === '-')) {
		this.divPlusMkFormula();
	    } else if(this.sep === '*') {
		this.divMkMultiFormula()
	    }
	},

        divMkMultiFormula: function() {
            let _formura='';
	    let _oya = this.calc[1].map(c => c.chr).join('');
	    let _ko = this.calc[2].map(c => c.chr).join('').replace(/[*]/,'');
	    let _anspos = (_ko.length)+3;
	    const _answer1=this.calc[ _anspos ].map(c => c.chr).join('');
	    
            _formura = '$$ \\begin{array}{r}';
	    
	    let i=0;
	    
	    let maxlength = this.calc.length;

	    _formura += _oya + ' \\\\[-3pt]';
	    _formura += '\\' + 'underline{\\times';
	    _formura += '\\phantom{' + zeroPadding( maxlength - _ko.length ) + '}'+ _ko + '}\\\\[-3pt]';

	    const self=this;
	    for(let i=3;i<_anspos;i++) {
		let nokori = i-3

		if((nokori>0) && (i==_anspos-1)) {
		    let headpad=-(self.calc.length)-_answer1.length;
		    _formura += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) + '}' + this.calc[i].map(c => c.chr).join('') + '\\phantom{' +  zeroPadding(nokori) + '}} \\\\[-3pt]'		    
		} else {
		    _formura += this.calc[i].map(c => c.chr).join('');
		    if(nokori > 0) {
			_formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }
		    _formura += ' \\\\[-3pt]'		
		}
		
	    }
	    _formura += _answer1;
            _formura += '\\end{array} $$';
            this.formula=_formura;
	},
	
	divPlusMkFormula: function() {
            let _formura='';
	    const _answer1=this.calc[3].map(c => c.chr).join('');	    
	    let _oya = this.calc[1].map(c => c.chr).join('');
	    let _ko = this.calc[2].map(c => c.chr).join('').replace(/[+-]/,'');
	    
            _formura = '$$ \\begin{array}{r}';
	    
	    let i=0;
	    let maxlength = this.calc[0].length;
	    const self = this;

	    _formura += _oya + ' \\\\[-3pt]';
	    _formura += '\\' + 'underline{' + this.sep;
	    _formura += '\\phantom{' + zeroPadding( maxlength - _ko.length ) + '}'+ _ko + '}\\\\[-3pt]';
	    _formura += _answer1;
            _formura += '\\end{array} $$';
	    
            this.formula=_formura;
	},
	divMkFormula() {
            let _formura='';	    
	    const _answer1=this.calc[0].map(c => c.chr).join('');	    
	    let [_ko, _oya] = this.calc[1].map(c => c.chr).join('').split(')');
	    
	    let _oyadot = _oya.length - _oya.indexOf('.')-1

	    let _answerdot=0
	    const _karikaitou = '0'
	    if(_karikaitou.indexOf('.') > -1) {
		_answerdot = _karikaitou.length-_karikaitou.indexOf('.')-1;
		if(_oya.indexOf('.')>-1) {
		    _oyadot = _oya.length-_oya.indexOf('.')-1
		    if(_answerdot > _oyadot) {
			_oya = _oya + zeroPadding(_answerdot - _oyadot);
		    }
		} else {
		    _oya = _oya + '.' + zeroPadding(_answerdot);
		}		
	    }
            let _nagasa=_karikaitou.length-(_answerdot > -1 ? 1 : 0);
	    _nagasa = _nagasa*2 -1;

	    if(_nagasa < 0) {
		_nagasa = 1;
	    }

            _formura = '$$ \\require{enclose} \\begin{array}{r}' + _answer1 + ' \\\\ ' + _ko + ' \\enclose{longdiv}{' + _oya + '}\\kern-.2ex \\\\[-3pt] ';
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
			if((_answerdot>-1) && (_answer1.length-nokori,_answer1.slice(_answer1.length-nokori-1,_answer1.length-nokori)==='.')) {
			    nokori--
			}
		    }
		}
	    })
            _formura += '\\end{array} $$'

	    this.formula=_formura;
	}
    },
    watch: {
	formula : function(n,o) {
	    if(n!==o) {
		this.mkFormula();
	    }
	}
    }
}
</script>
