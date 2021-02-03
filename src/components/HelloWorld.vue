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
      @input="mkFormula"
      ></v-text-field>
    <v-text-field
      v-model="answer1"
      label="回答を入力"
            @input="mkFormula"
      ></v-text-field>
    <v-text-field
      v-model="amari1"
      label="あまりを入力"
      @input="mkFormula"      
      ></v-text-field>
    <v-text-field
      v-model="calc1"
      label="数式1を入力"
      @input="mkFormula"      
      ></v-text-field>
    <v-text-field
      v-model="calc2"
      label="数式2を入力"
      @input="mkFormula"      
      ></v-text-field>
    <v-text-field
      v-model="calc3"
      label="数式3を入力"
      @input="mkFormula"      
      ></v-text-field>
    <v-text-field
      v-model="calc4"
      label="数式4を入力"
      @input="mkFormula"      
      ></v-text-field>
    <v-text-field
      v-model="calc5"
      label="数式5を入力"
      @input="mkFormula"      
      ></v-text-field>        
	</v-form>
      </v-col>
      <v-col>
	<div ref="ff" id="ff">
	  <vue-mathjax :formula="formula"></vue-mathjax>
	</div>
	<div v-show="debug">
	  <textarea v-model="formula" cols="30" rows="10"></textarea>
	  <h3>イメージ作成</h3>
	  <button @click="bntClick">PUSH</button>
	  <br />
	  <img :src="testImg" alt />
	  <br />
	</div>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import html2canvas from "html2canvas";

export default {
    name: "About",
    components: {
	"vue-mathjax": VueMathjax
    },
    data() {
	return {
	    debug : false,
	    msg: "About Page",
	    formula1 : "500/4",
	    answer1 : "125",
	    amari1 : "0",
	    calc1 : "4",
	    calc2 : "10",
	    calc3 : "8",
	    calc4 : "20",
	    calc5 : "20",	    
	    formula: "",
	    testImg: ""
	};
    },
    mounted: function () {
	this.mkFormula();
	MathJax.Hub.Config({

	    })
    },
    computed : {	
    },
    methods: {
	mkFormula() {
	    let moji = this.formula1.split('/');
	    let nagasa = moji[0].length

	    function zeroPadding(_moji){
		return ( Array(nagasa-_moji.length).join('0') );
	    }
	    
	    this.formula = '$$ \\require{enclose} \\begin{array}{r}' + this.answer1 + ' \\\\ ' + moji[1] + ' \\enclose{longdiv}{' + moji[0] + '}\\kern-.2ex \\\\[-3pt] ';
	    if(this.calc1 !== '') {
		this.formula+= '\\' + 'underline{' + this.calc1 +'\\phantom{00}} \\\\[-3pt]';
	    }
	    if(this.calc2 !== '') {
		this.formula += this.calc2 + '\\phantom{0} \\\\[-3pt]'
	    }
	    if(this.calc3 !== '') {
		this.formula += '\\' + 'underline{\\phantom{0}' + this.calc3 + '\\phantom{0}} \\\\[-3pt]'
	    }
	    if(this.calc4 !== '') {
		this.formula += '\\phantom{0}' + this.calc4 + ' \\\\[-3pt]'
	    }
	    if(this.calc5 !== '') {
		this.formula += '\\' + 'underline{\\phantom{0}' + this.calc5 + '} \\\\[-3pt]'
	    }	    
	    this.formula += '\\phantom{00}' + this.amari1
	    this.formula += '\\end{array} $$'
	    
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
