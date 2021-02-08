<template>
<div class="FormulaView">
  <v-container>
    <v-row v-if="!f_dialog">
      <v-col>
	<div ref="ff" id="ff">
	  <vue-mathjax :formula="formula"></vue-mathjax>
	</div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
	<v-card>
	  <v-card-title>
            <span class="headline">数式</span>
	  </v-card-title>
	  <v-card-text>
	    <v-form
	      ref="form"
	      >
	      <v-text-field
		v-model="formula1"
		label="数式を入力"
		@input="mkcalcs()"
		></v-text-field>
	      <v-text-field
		v-model="answer1"
		label="回答を入力"
		@input="mkcalcs()"
		></v-text-field>
	    </v-form>
	    <LongDivision :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-if="ope==='/'"></LongDivision>
	    <Multiplication :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else-if="ope==='*'"></Multiplication>
	    <Addition :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else-if="ope==='+'" ope='+'></Addition>
	    <Addition :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else ope='-'></Addition>
	  </v-card-text>
	</v-card>
      </v-col>
    </v-row>    
    <v-row v-show="debug">    
      <v-col>
	<div>
	  <textarea v-model="formula" cols="30" rows="10"></textarea>
	</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
	<v-btn @click="openDialog();">{{ f_dialog ? '結果' : '数式'  }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import html2canvas from "html2canvas";
import LongDivision from './LongDivisionWithDot.vue'
import Multiplication from './Multiplication.vue'
import Addition from './Addition.vue'

export default {
    name: "FormulaView",
    props: ['_formula'],
    components: {
	"vue-mathjax": VueMathjax,
	"LongDivision" : LongDivision,
	"Multiplication" : Multiplication,
	"Addition" : Addition
    },
    data() {
	return {
	    f_dialog : false,
	    debug : false,
	    testImg : '',
	    ope : '/'
	};
    },
    computed: {
	formula1 : {
	    get () {
		return this._formula.formula1;
	    },
	    set (value) {
		let tmp = this._formula;
		tmp.formula1 = value;
		this.$emit('update:_formula', value)
	    }
	},
	answer1 : {
	    get () {
		return this._formula.answer1;
	    },
	    set (value) {
		let tmp = this._formula;
		tmp.answer1 = value;
		this.$emit('update:_formula', value)
	    }
	},
	formula : {
	    get () {
		return this._formula.formula;
	    },
	    set (value) {
		let tmp = this._formula;
		tmp.formula = value;
		this.$emit('update:_formula', value)
	    }	    
	}
    },    
    created: function () {
	MathJax.Hub.Config({
	});
	this.mkcalcs();
    },
    methods: {
	mkcalcs() {
	    const pat = /[-\+\*\/]/;
	    console.log(1);
	    let matchope=this.formula1.match(pat);
	    console.log(2);	    
	    if(matchope) {
		console.log(3);
		this.ope=this.formula1[matchope.index];
		console.log(4);		
	    }
	    console.log(5);	    
	},
	openDialog() {
	    this.f_dialog=!this.f_dialog;
	}
    },    
}
</script>

<style scoped>
#ff {
    width: auto;
    margin: 0 auto;
    padding: 20px 10px;
    display:inline-block;
}
</style>
