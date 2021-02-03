<template>
<div class="hello">
  <v-container>
    <v-row>
      <v-col>
	<v-form
    ref="form"
    >
    <v-text-field
      v-model="formula1"
      label="数式を入力"
      ></v-text-field>
    <v-text-field
      v-model="answer1"
      label="回答を入力"
      ></v-text-field>
	</v-form>
	<LongDivision v-if="ope==='/'"></LongDivision>
	<Multiplication v-else-if="ope==='*'"></Multiplication>
	<Addition v-else-if="ope==='+'" ope='+'></Addition>
	<Addition v-else ope='-'></Addition>	
      </v-col>
      <v-col>
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
	  <img :src="testImg" alt />
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
import LongDivision from './LongDivision.vue'
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
	    debug : false,
	    testImg : '',
	    ope : '/'
	};
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
	},	
    },    
    created: function () {
	MathJax.Hub.Config({
	});
	const pat = /[-\+\*\/]/
	let matchope=this.formula1.match(pat);
	this.ope=this.formula1[matchope.index];
    },
    methods: {
	bntClick() {
	    var dom = document.querySelector("#ff"); 
	    html2canvas(dom).then(canvas => {
		let dataUrl = canvas.toDataURL("image/png");
		this.testImg = dataUrl;
	    });
	}
    }
}
</script>

<style scoped>
#ff {
    width: auto;
    margin: 0 auto;
    padding: 10px 10px;
    display:inline-block;
}
</style>
