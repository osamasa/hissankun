<template>
<div class="hello">
  <v-container>
    <v-row>
      <v-col cols="8">
	<v-form
    ref="form"
    >
    <v-text-field
      v-model="formula1"
      label="数式を入力"
      @input="mkcalcs()"
      ></v-text-field>
	</v-form>
	<LongDivision :formula1="formula1" :_formula.sync="formula" v-if="ope==='/'"></LongDivision>
	<Multiplication :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else-if="ope==='*'"></Multiplication>
	<Addition :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else-if="ope==='+'" ope='+'></Addition>
	<Addition :formula1="formula1" :answer1="answer1" :_formula.sync="formula" v-else ope='-'></Addition>	
      </v-col>
      <v-col  cols="4">
	<v-row>
	  <v-col>
	    <div ref="ff" id="ff">
	      <vue-mathjax :formula="formula"></vue-mathjax>
	    </div>
	    <div v-show="debug">
	      <textarea v-model="formula" cols="30" rows="10"></textarea>
	    </div>
	  </v-col>
	</v-row>
	<v-row>
	  <v-col>
	<v-btn color="success" @click="bntClick">イメージ作成</v-btn>
	  <br />
	  <img :src="testImg"/>
	  <br />
	  </v-col>
	</v-row>
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
    name: "About",
    components: {
	"vue-mathjax": VueMathjax,
	"LongDivision" : LongDivision,
	"Multiplication" : Multiplication,
	"Addition" : Addition
    },
    data() {
	return {
	    formula1 : '1.35/3',
	    answer1 : '0.5',
	    formula : '',
	    debug : false,
	    testImg : '',
	    ope : '/'
	};
    },
    computed: {
    },    
    created: function () {
	MathJax.Hub.Config({
	});
	this.mkcalcs();
    },
    methods: {
	mkcalcs() {
	    const pat = /[-\+\*\/]/;
	    let matchope=this.formula1.match(pat);
	    if(matchope) {
		this.ope=this.formula1[matchope.index];
	    }
	},
	bntClick() {
	    let dom = document.querySelector("#ff");
	    let self=this
	    html2canvas(dom, {
		scale : 0.5,
		imageTimeout : 30000
	    }).then(function(canvas) {
		let dataUrl = canvas.toDataURL("image/png");
		self.testImg = dataUrl;
	    }).catch(function(error) {
		console.log(error);
	    })
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
