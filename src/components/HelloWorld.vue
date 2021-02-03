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
	<LongDivision :oya="oya" :ko="ko" :answer1="answer1" :formula.sync="formula"></LongDivision>
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
	    formula1 : "500/4",
	    answer1 : "125",
	    oya : '0',
	    ko : '0',
	    formula : '',
	    testImg : ''
	};
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
