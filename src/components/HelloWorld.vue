<template>
  <div>
    <v-text-field
      @keyup.enter="parseFormula"
      ref="focusThis"
      v-model="lawformula"
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
    props : ['_id'],    
    components : {
    },
    data: () => ({
	_sep : '',
	_oya : '',
	_ko : '',
	_size : 0,
    }),
    computed : {
	lawformula : {
	    get () {
		return this.$store.getters.getLawformula({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('setLawformula',{'lawformula' : value, 'id' : this._id});
	    }
	},
	calc : {
	    get () {
		return this.$store.getters.getCalc({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('updateCalc',{'calc' : value, 'id' : this._id});
	    }
	},
	sep: {
	    get () {
		return this.$store.getters.getSep({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value , 'id' : this._id});
	    }
	}	
    },

    methods : {
	parseFormula() {
	    let locallawfoula = this.$store.getters.getLawformula({'id':this._id});
	    [this._oya, this._sep, this._ko] = locallawfoula.split(/([-+*/])/);
	    let _calc = [];

	    switch(this._sep) {
	    case  '/' :
		this._size=this._oya.length + this._ko.length + 5


		for(let y=0;y<this._size;y++) {
		    _calc.push([]);
		    for(let x=0;x<this._size;x++) {
			_calc[y].push({x:x,y:y,kuri:'',chr:'',isActive:false});
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
		break;
	    case  '+' :
	    case  '-' :
	    case  '*' :
		if(this._sep === '*') {
		    let _oyakonagasa = (this._oya.length > this._ko.length ? this._oya.length : this._ko.length) + 2;
		    let _tenkai = this._ko.length + 1 + 3;
		    let _saidai = this._oya.length + (this._ko.length-1)+1;

		    
		    this._size = Math.max(_oyakonagasa, _tenkai, _saidai);

		} else {
		    this._size= (this._oya.length > this._ko.length ? this._oya.length : this._ko.length) + 2;
		}

		for(let y=0;y<this._size;y++) {
		    _calc.push([]);
		    for(let x=0;x<this._size;x++) {
			_calc[y].push({x:x,y:y,kuri:'',chr:'',isActive:false});
		    }
		}
		i=this._size-this._oya.length;
		this._oya.split('').forEach( k => {
		    _calc[1][i].chr=k;
		    i++;
		})
		_calc[2][1].chr=this._sep;
		i=this._size-this._ko.length;
		this._ko.split('').forEach( o => {
		    _calc[2][i].chr=o;
		    i++;
		})
		break;
	    }
	    this.sep = this._sep;	    
	    this.calc = _calc;
	},
    },
    watch: {
    }      
}

</script>
