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
      v-model="syousuten"
      label="小数点を入力"
      @input="mkcalcs();mkFormula();"
      ></v-text-field>      
    <v-text-field
      v-for="(i,n) in calcs" :key="n"
      v-model="calcs[n]"
      label="数式"
      @input="mkFormula"      
      ></v-text-field>
	</v-form>
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
	    syousuten : '0',
	    calcs : [],
	    formula: "",
	    testImg: "",
	    nagasa :0,
	    oya : 0,
	    ko : 0
	};
    },
    mounted: function () {
	this.mkcalcs();
	this.mkFormula();	
	MathJax.Hub.Config({
	});

    },
    methods: {
	mkcalcs() {
	    let moji = this.formula1.trim().split('/');
	    this.oya = parseInt(moji[0]);
	    this.ko = parseInt(moji[1]);
	    this.nagasa=String(Math.floor(this.oya/this.ko)).length;
	    this.nagasa += parseInt(this.syousuten);
	    this.nagasa = this.nagasa*2 -1;
	    this.calcs=null;
	    this.calcs=Array(this.nagasa).fill(0);
	},
	mkFormula() {
	    function zeroPadding(_nagasa){
		return ( (_nagasa-1)*10 );
	    }

	    this.formula = '$$ \\require{enclose} \\begin{array}{r}' + this.answer1 + ' \\\\ ' + this.ko + ' \\enclose{longdiv}{' + this.oya + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    const self=this;
	    this.calcs.forEach(n => {
		if(i===(parseInt(self.nagasa)-1)) {
		    let headpad=String(self.oya).length-String(self.answer1).length + String(self.oya).length-String(n).length;
		    self.formula += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) +'}' + n + '} \\\\[-3pt]'
		} else if(i % 2 == 0) {
		    let nokori = String(self.oya).length-String(self.answer1).length + String(self.oya).length-String(n).length-(Math.floor(i/2));
		    let headpad = String(self.oya).length-String(self.answer1).length + String(self.oya).length-nokori-String(n)-1;

		    self.formula+= '\\' + 'underline{';
		    if(headpad > 0) {
			self.formula+='\\phantom{' + zeroPadding(headpad)+ '}'
		    }
		    self.formula += n;
		    if(nokori > 0) {
			self.formula+='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    
		    self.formula += '} \\\\[-3pt]';
		} else {
		    let headpad = String(self.oya).length-String(self.answer1).length + ((i+1)/2) - (String(n).length-1)
		    let nokori = String(self.answer1).length - headpad - (String(n).length)

		    if(headpad > 0) {
			self.formula+='\\phantom{' + zeroPadding(headpad)+ '}'

		    }
		    self.formula += n;
		    if(nokori > 0) {
			self.formula+='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    		    
		    self.formula += ' \\\\[-3pt]'
		}
		i++;
	    })
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
