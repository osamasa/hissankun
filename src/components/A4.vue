<template>
<div class="sheets">
  <div>
    <v-btn @click="dialog=!dialog">設　定</v-btn>
    <v-btn class='ml-5' @click="handlePrint">印　刷</v-btn>
    <v-btn class='ml-5' @click="chgFontsizePlusAll">拡　大</v-btn>
    <v-btn class='ml-5' @click="chgFontsizeMinuseAll">縮　小</v-btn>    
  </div>
  <div class="sheet">

      <h2>{{ title }}</h2>      
      <div class="mt-8">
	<div v-for="v in this.getFormula">
	  <vue-draggable-resizable style="background-color: white;" :w="100" :h="100" >
	    <viewFormula :_id=v.id></viewFormula>
	    <div class="d-flex">
	      <v-btn @click="curid=v.id;resetMediator(v.id);calc_dialg=!calc_dialg" class="notprint mh-5">計算</v-btn>
	      <v-btn @click="removeCalc(v.id)" class="notprint mh-5">削除</v-btn>	      
	    </div>
	  </vue-draggable-resizable>
	</div>
      </div>

  </div>
  <v-layout>
    <v-btn
      @click="addNewCalc();calc_dialg=!calc_dialg"
      fixed fab
      bottom
      right
      color="red darken-2"
      dark
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-layout>
  <v-dialog
    v-model="calc_dialg"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-card-title>
        <span class="headline">計算式の追加</span>
      </v-card-title>
      <v-card-text>
	<v-container>
	  <v-row>
	    <v-col>
	      <HelloWorld :_id="curid" ></HelloWorld>
	    </v-col>
	  </v-row>
	  <v-row>	  
	    <v-col>
	      <NewPadKun :_id="curid"></NewPadKun>
	    </v-col>
	  </v-row>	    
	</v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="calc_dialg = false"
          >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="calc_dialg = false"
          >
          Save
        </v-btn>
      </v-card-actions>      
    </v-card>
  </v-dialog>
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
          @click="dialog = false"
          >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import viewFormula from "./ViewFormula.vue";
import HelloWorld from "./HelloWorld.vue";
import NewPadKun from "./NewPadKun.vue";
import VueDraggableResizable from 'vue-draggable-resizable'


export default {
    components: {
	"viewFormula" : viewFormula,
	'HelloWorld' : HelloWorld,
	'NewPadKun' : NewPadKun,
	'vue-draggable-resizable': VueDraggableResizable
    },
    data() {
	return {
	    dialog : false,
	    calc_dialg : false,
	    curid : 0,
	    year : 4,
	    myclass : 1,
	    order : 1,
	    name : '長田　潤',
	    title : '計算ドリル２ P2',
	}
    },
    created() {
    },
    computed: {
	getFormula : function() {
	    return this.$store.getters.getAllFormula;
	}	
    },
    mounted() {
	document.title = '筆算君2.5'
    },
    methods: {
	removeCalc( _id ) {
	    this.$store.dispatch('removeCalc',{'id': _id});
	},	
	resetMediator( _id ) {
	    this.$store.dispatch('resetLastno',{'id': _id});
	},
	addNewCalc() {
	    this.$store.dispatch('addNewNumber');
	    this.curid = this.$store.state.lastno;
	},
	handlePrint() {
	    window.print()
	},
	chgFontsizePlusAll() {
	    this.$store.commit('setBairitsuAll',{'command':'+'});
	},
	chgFontsizeMinuseAll() {
	    this.$store.commit('setBairitsuAll',{'command':'-'});
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
  .notprint { display : none; }
}

/* for preview */
@media screen {
  /* mm単位で指定しているけど、vueコンポ側はpx単位なので、無理にmmにしなくてもいいかも。解像度の違いでハマるかも */
  .sheet {
    width: 200mm;
    min-height: 296mm; /* 設定しなくてもいいかも。あまり印刷画面に似せすぎると、些細な違いがバグに見えてしまう */
    margin: 5mm;
    padding: 5mm;
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
