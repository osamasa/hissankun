<template>
  <div>
  <table>
    <tr v-for="c,i in calc" :key="i">
      <td v-for="d,l in c" :style="isLongDivBorder(i,l)" :kye="l">
        <divclass :d_data="d" :x="l" :y="i" />
      </td>
    </tr>
  </table>
  <div v-move-drag style="top: 50vh; left: 20vw; ">
    <div ref="ff" id="ff">
      <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
    <div v-show="debug">
      <textarea v-model="formula" cols="30" rows="10"></textarea>
    </div>
  </div>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";  
import divclass from './DivClass.vue';
import { zeroPadding } from './zeroPadding.js'
  
export default {
    name: 'HelloWorld',
    components : {
	"vue-mathjax": VueMathjax,
	'divclass': divclass
    },
    data: () => ({
	size : 6,
	inputbox : false,
	formula : '$$\\require{enclose} \\begin{array}{r}7.6 \\\\[-3pt]25\\enclose{longdiv}{190\\phantom{0}} \\\\[-3pt]\\' + 'underline{175\\phantom{.0}} \\\\[-3pt]15\\phantom{.}0 \\\\[-3pt]\\' +'underline{15\\phantom{.}0} \\\\[-3pt]\\phantom{000}0\\end{array}$$',
	debug : false,
    }),
    created: function () {
	MathJax.Hub.Config({
	});
	this.$store.commit('registerMediator', {'x': 0, 'y':0 });
	this.divMkFormula()
    },
    computed : {
	calc : {
	    get () {
		return this.$store.state.calc
	    },
	    set (value) {
		this.$store.commit('updateCaclc',value);
	    }
	},
	isLongDivBorder : function() {
	    return (y,x) => {
		let _ret = '';
		if((y==0) &&  (this.calc[y][x].chr)) {
		    _ret += 'border-bottom: 1px solid #000;';
		}		  
		for(let i=0;i<x;i++) {
		    if((this.calc[i][y].chr === ')') && (this.calc[y][x].chr)) {
			_ret += 'border-top: 1px solid #000;';
		    }
		}
		if((y>1) && (y%2==0) && (this.calc[y][x].chr)) {
		    _ret += 'border-bottom: 1px solid #000;';
		}
		return _ret;
	    }
	}
	
    },
    methods : {
	divMkFormula() {
            let _formura='';	    
	    const _answer1=this.calc[0].map(c => c.chr).join('');	    
	    let [_ko, _oya] = this.calc[1].map(c => c.chr).join('').split(')');

	    let _oyadot = _oya.length - _oya.indexOf('.')-1
	    let _answerdot=0
	    const _karikaitou = String(parseFloat(_oya) / parseFloat(_ko));
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
	    let nokori = _karikaitou.length-1
	    let headpad=0;
	    if(_oyadot>-1) {
		nokori--;
	    }
	    this.calc.slice(2).forEach(_n => {

		let n = _n.map(c => c.chr).join('');

		if(i===(_nagasa-1)) {
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
		    if((_answerdot>-1) && (_answer1.length-nokori,_answer1.slice(_answer1.length-nokori-1,_answer1.length-nokori)==='.')) {
			nokori--
		    }
		}
	    })
            _formura += '\\end{array} $$'

	    this.formula=_formura;
	}
    },
    watch: {
	calc : function(n) {
	    this.divMkFormula()
	}
    }      
}

</script>
<style>
table {
    border-collapse: collapse;
}
td {
    border: 1px dashed #999;
}
</style>
