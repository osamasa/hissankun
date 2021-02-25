<template>
<div class="sheets">
  <div>
    <v-btn @click="dialog=!dialog">設　定</v-btn>
    <v-btn class='ml-5' @click="handlePrint">印　刷</v-btn>
    <v-btn class='ml-5' @click="chgFontsizePlusAll">拡　大</v-btn>
    <v-btn class='ml-5' @click="chgFontsizeMinuseAll">縮　小</v-btn>    
  </div>
  <div class="sheet">
    <div class="d-flex flex-row-reverse">
      {{ year }}年{{ myclass }}組 {{order}}番
    </div>
    <div class="d-flex flex-row-reverse">
      {{ name }}
    </div>    
    <h2>{{ title }}</h2>
    <div class="relative">
      <div class="mt-8 absolute">
	<div v-for="v in this.getFormula">
	  <vue-draggable-resizable style="background-color: white;" :w="100" :h="100" >
	    <viewFormula :id=v.id></viewFormula>
	    <div class="d-flex">
	      <v-btn @click="curid=v.id;sep='';resetMediator(v.id);calc_dialg=!calc_dialg" class="notprint mh-5">計算</v-btn>
	      <v-btn @click="removeCalc(v.id)" class="notprint mh-5">削除</v-btn>
	      <v-btn @click="curid=v.id;k_dialog=!k_dialog" class="notprint mh-5">付番</v-btn>	      	      
	    </div>
	  </vue-draggable-resizable>
	</div>
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
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>計算式の追加</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
            @click="calc_dialg = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-actions>
	<v-switch
	  v-model="switch1"
	  :label="switch1 ? '筆算モード' : '計算式モード'"
	  ></v-switch>
      </v-card-actions>	
      <v-card-text>
	<v-container v-if="switch1">
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
	<v-container v-else>
	  <v-row>
	    <v-col>
	      <v-textarea
		v-model="lawformula"
		name="input-7-4"
		label="答えを入力"
		></v-textarea>
	    </v-col>
	  </v-row>
	</v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>筆算君の設定</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
          @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>      
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
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="k_dialog"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>項番の付番</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
          @click="k_dialog = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>      
      <v-card-text>
        <v-container>
          <v-row>
	    <v-col
              cols="4"
	      >
              <v-text-field
		v-model="kouban"
                label="カッコ付きの番号を指定"
                ></v-text-field>
	    </v-col>
	  </v-row>	      
        </v-container>
      </v-card-text>
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
	    switch1 : true,
	    dialog : false,
	    calc_dialg : false,
	    k_dialog : false,
	    curid : 0,
	    year : 4,
	    myclass : 1,
	    order : 1,
	    name : '長田　潤',
	    title : '計算ドリル２ P2'
	}
    },
    created() {
    },
    computed: {
	sep: {
	    get () {
		return this.$store.getters.getSep({'id': this.curid});
	    },
	    set (value) {
		this.$store.commit('setSep',{ 'sep' : value , 'id' : this.curid});
	    }
	},	
	lawformula : {
	    get () {
		return this.$store.getters.getLawformula({'id': this.curid});
	    },
	    set (value) {
		this.$store.commit('setLawformula',{'lawformula' : value, 'id' : this.curid});
	    }
	},	
	kouban : {
	    get () {
		return this.$store.getters.getKouban({ 'id':this.curid })
	    },
	    set (value) {
		this.$store.commit('setKouban',{'kouban': value,'id':this.curid} );
	    }
	},
	getFormula : function() {
	    return this.$store.getters.getAllFormula;
	},	
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
table {
    border-collapse: collapse;
}
td {
    height: 20px;
    width: 20px;
    position: relative;
    border: 1px dashed #999;
}    
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
