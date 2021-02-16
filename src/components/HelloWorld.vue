<template>
  <div>
    <v-text-field
    ref="focusThis"
    v-model="lawFormula"
    label="数式を入力"
    type="text"
    >
    <template v-slot:append-outer >
      <v-btn @click="parseFormula" color="primary">入力</v-btn>
    </template>
  </v-text-field>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    components : {
    },
    data: () => ({
	lawFormula : '244/32',
	_sep : '',
	_oya : '',
	_ko : '',
	_size : 0
    }),
    created: function () {
    },
    computed : {
	calc : {
	    get () {
		return this.$store.state.calc;
	    },
	    set (value) {
		this.$store.commit('updateCalc',{'calc' : value});
	    }
	},
	sep: {
	    get () {
		return this.$store.state.sep;
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value });
	    }
	}	
    },
    methods : {
	parseFormula() {
	    [this._oya, this._sep, this._ko] = this.lawFormula.split(/([-+*/])/);
	    this.sep = this._sep;
	    
	    switch(this._sep) {
	    case  '/' :
		this._size=this._oya.length + this._ko.length + 5
		let _calc = [];
		for(let y=0;y<this._size;y++) {
		    _calc.push([]);
		    for(let x=0;x<this._size;x++) {
			_calc[y].push({x:x,y:y,chr:'',isActive:false});
		    }
		}
		let i=0;
		this._ko.split('').forEach( k => {
		    _calc[1][i].chr=k;
		    i++;
		})
		_calc[1][i].chr=')';
		i++;
		this._oya.split('').forEach( o => {
		    _calc[1][i].chr=o;
		    i++;
		})
		this.calc = _calc;
		break;
	    case  '+' :
		this._size= (this._oya.length > this._ko.length ? this._oya.length : this._ko.length) + 3;
		for(let y=0;y<this._size;y++) {
		    _calc.push([]);
		    for(let x=0;x<this._size;x++) {
			_calc[y].push({x:x,y:y,chr:'',isActive:false});
		    }
		}
		i=2;
		this._oya.forEach( k => {
		    _calc[1][i].chr=k;
		    i++;
		})
		_calc[2][2].chr='+';
		i=3;		
		this._ko.forEach( o => {
		    _calc[3][i].chr=o;
		    i++;
		})
		break;
	    case  '*' :
		break;
	    case  '-' :
		this._size= (this._oya.length > this._ko.length ? this._oya.length : this._ko.length) + 3;
		for(let y=0;y<this._size;y++) {
		    _calc.push([]);
		    for(let x=0;x<this._size;x++) {
			_calc[y].push({x:x,y:y,chr:'',isActive:false});
		    }
		}
		i=2;
		this._oya.forEach( k => {
		    _calc[1][i].chr=k;
		    i++;
		})
		_calc[2][2].chr='-';
		i=3;		
		this._ko.forEach( o => {
		    _calc[3][i].chr=o;
		    i++;
		})
		break;		
	    }
	    this.$router.push({name : 'calc'});
	},
    },
    watch: {
    }      
}

</script>
