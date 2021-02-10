<template>
<div>
  <div>
    <v-btn @click="dialog=!dialog">設　定</v-btn>
    <v-btn class='ml-5' @click="handlePrint">印　刷</v-btn>
  </div>
  <div class="sheets">
    <div v-for="p of page" :key="p" class="sheet">
      <h2 v-show="p==1" >{{ title }}</h2>      
      <div class="mt-8">
	<v-container>
	  <v-row v-for="y of line_num">
	    <v-col v-for="x of step_num">
	      <div class="d-flex justify-start mb-12" v-if="(y-1)*step_num+x+((p-1)*20)<=question_num">
		( {{ (y-1)*step_num+x+((p-1)*20) }} )
		<FormulaView class="ml-8" :_formula.sync="formulas[(y-1)*step_num+x+((p-1)*20)-1]"></FormulaView>
	      </div>
	    </v-col>
	  </v-row>
	</v-container>
      </div>
    </div>
  </div>    
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-card-title>
        <span class="headline">筆算君の設定</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
	    <v-col
              cols="4"
	      >
              <v-text-field
		v-model="year"
                label="何年"
                required
                ></v-text-field>
	    </v-col>
	    <v-col
              cols="4"
	      >
              <v-text-field
		v-model="myclass"
                label="何組"
                required
                ></v-text-field>
	    </v-col>
            <v-col
              cols="4"
	      >
              <v-text-field
		v-model="order"
                label="何番"
                required
                ></v-text-field>
	    </v-col>
	  </v-row>			
	  <v-row>		      
	    <v-col
	      >
              <v-text-field
		v-model="name"		    
                label="お名前は？"
                required
                ></v-text-field>
	    </v-col>
	  </v-row>		      
          <v-row>
	    <v-col
              cols="12"
	      >
              <v-text-field
		v-model="title"
                label="タイトルは？"
                required
                ></v-text-field>
	    </v-col>
	  </v-row>	      
          <v-row>
	    <v-col
	      >
              <v-text-field
		v-model.number="question_num"
                label="問題数は？"
                required
                ></v-text-field>
	    </v-col>
	    <v-col
	      >
              <v-text-field
		v-model.number="line_num"
                label="行数は？"
		required
                ></v-text-field>
	    </v-col>	    	    
	    <v-col
	      >
              <v-text-field
		v-model.number="step_num"
                label="列数は？"
		required
                ></v-text-field>
	    </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
          >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false;calcMethod()"
          >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import FormulaView from "./FormulaView.vue";    
export default {
    components: {
	"FormulaView" : FormulaView
    },
    data() {
	return {
	    formulas : [],
	    dialog : false,
	    year : 4,
	    myclass : 1,
	    order : 1,
	    name : '長田　潤',
	    title : '計算ドリル２ P2',
	    question_num : 30,
	    line_num : 5,
	    step_num : 2,
	    page : 2
	}
    },
    created() {
	this.mkFormulas();
    },
    computed: {
	getMyNo() {
	    self = this;
	    return function(x,y) {
		return y*self.step_num + x;
	    }
	}
    },
    mounted() {
	document.title = 'タイトルをいい感じに設定する'
    },
    methods: {
	handlePrint() {
	    window.print()
	},

	mkFormulas() {
	    this.formulas = Array(this.question_num).fill({formula:'',answer1:'',formula1:'',id:0});
	    let i=0;
	    this.formulas.forEach(r => {
		r.id=i;
		r.formula = '$$\\begin{array}{r}' + i +' \\\\[-3pt]\\' + 'underline{\\times\\phantom{0}63}\\\\[-3pt]201 \\\\[-3pt]\\' + 'underline{\\phantom{0}402\\phantom{0}} \\\\[-3pt]4221\\end{array}$$';
		r.formula1 = '67*6'+i,
		r. answer1 = '4' + i
		i++;
	    });
	},
	calcMethod() {
	    this.page = Math.floor(this.question_num / (this.line_num * this.step_num));
	    console.log(this.page = Math.floor(this.question_num / (this.line_num * this.step_num)))
	}
    }
}
</script>

<style lang="scss" scoped>
.sheet {
    page-break-after: always;
}

/* hide in print */
@media print {
    .sheets > :not(.sheet) {
	display: none;
    }
    .notprint {
	display: none;
    }
}

/* for preview */
@media screen {
    /* mm単位で指定しているけど、vueコンポ側はpx単位なので、無理にmmにしなくてもいいかも。解像度の違いでハマるかも */
    .sheet {
	width: 200mm;
	min-height: 296mm; /* 設定しなくてもいいかも。あまり印刷画面に似せすぎると、些細な違いがバグに見えてしまう */
	margin: 5mm;
	padding: 10mm;
	background: white;
	box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
    }
}
</style>
<style lang="scss">
/* for preview */
@media screen {
    BODY {
	background: #eee;
    }
}
</style>
