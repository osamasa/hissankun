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
      @input="mkcalcs()"
      ></v-text-field>
    <v-text-field
      v-model="answer1"
      label="回答を入力"
      ></v-text-field>
	</v-form>
	<LongDivision></LongDivision>
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

export default {
    name: "About",
    components: {
	"vue-mathjax": VueMathjax,
	"LongDivision" : LongDivision
    },
    data() {
	return {
	    debug : false,
	    testImg : ''
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
	oya: {
	    get () {
		return this.$store.state.oya
	    },
	    set (value) {
		this.$store.commit('setOya', value)
	    }
	},
	ko: {
	    get () {
		return this.$store.state.ko
	    },
	    set (value) {
		this.$store.commit('setKo', value)
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
    mounted: function () {
	this.mkcalcs();
	MathJax.Hub.Config({
	});

    },
    methods: {
	mkcalcs() {
	    let moji = this.formula1.trim().split('/');
	    this.oya = moji[0];
	    this.ko = moji[1];
	},
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
