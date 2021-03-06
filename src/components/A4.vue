<template>
  <div v-if="!isSignedIn">
    右上のログインボタンを押して下さい
  </div>
<div v-else class="sheets">
  <div>
    <v-btn @click="dialog=!dialog">名前の設定</v-btn>
    <v-btn class='ml-5' @click="m_dialog=!m_dialog">新規作成</v-btn>
    <v-btn class='ml-5' @click="saveMondai">保存</v-btn>     
    <v-btn class='ml-5' @click="handlePrint">印　刷</v-btn>
    <v-btn class='ml-5' @click="chgFontsizePlusAll">拡　大</v-btn>
    <v-btn class='ml-5' @click="chgFontsizeMinuseAll">縮　小</v-btn>
    <v-btn class='ml-5' @click="loadMondai;i_dialog=!i_dialog">一覧</v-btn>        
  </div>
  <div class="sheet">
    <div class="d-flex flex-row-reverse">
      {{ year }}年{{ myclass }}組 {{order}}番
    </div>
    <div class="d-flex flex-row-reverse">
      {{ myname }}
    </div>    
    <h2>{{ title }}</h2>
    <div class="relative">
      <div class="mt-8 absolute">
	<v-row>
	  <v-col  v-for="(v,index) in this.getFormula" :key="index" class="custom3cols">
	    <viewFormula  :id=v.id></viewFormula>
	    <div class="d-flex">
	      <v-btn @click="curid=v.id;sep='';resetMediator(v.id);calc_dialg=!calc_dialg" class="notprint mh-5">計算</v-btn>
	      <v-btn @click="removeCalc(v.id)" class="notprint mh-5">削除</v-btn>
	      <v-btn @click="curid=v.id;k_dialog=!k_dialog" class="notprint mh-5">付番</v-btn>
	      <v-btn @click="curpos=index;spliceMondai()" class="notprint mh-5">追加</v-btn>	      	      	      
	    </div>
	  </v-col>
	</v-row>
      </div>
    </div>
  </div>
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
      <v-card-actions>
	<v-btn
          @click="calc_dialg = false"
          >
	  閉じる
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
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>筆算君の設定</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
          @click="saveSettei();dialog = false"
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
		v-model="myname"		    
                label="お名前は？"
                required
                ></v-text-field>
	    </v-col>
	  </v-row>		      
        </v-container>
      </v-card-text>
      <v-card-actions>
	<v-btn
          @click="saveSettei();dialog = false"
          >
	  閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="m_dialog"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>問題の設定</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
          @click="createNewMondai();m_dialog = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>      
      <v-card-text>
        <v-container>
          <v-row>
	    <v-col
              cols="12"
	      >
              <v-text-field
		v-model="title"
                label="タイトル"
                required
                ></v-text-field>
	    </v-col>
	  </v-row>	  
          <v-row>
	    <v-col
              cols="4"
	      >
	      <v-select
		v-model="monnum"
		:items=mitems
		label="問題数"
		></v-select>
	    </v-col>
	  </v-row>
	</v-container>
      </v-card-text>
      <v-card-actions>
	<v-btn
          @click="createNewMondai();m_dialog = false"
          >
	  閉じる
        </v-btn>
      </v-card-actions>
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
      <v-card-actions>
	<v-btn
          @click="k_dialog = false"
          >
	  閉じる
        </v-btn>
      </v-card-actions>      
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="i_dialog"
    persistent
    max-width="600px"
    >
    <v-card>
      <v-toolbar
          dark
          color="primary"
        >
	<v-toolbar-title>過去の問題</v-toolbar-title>
	<v-spacer></v-spacer>
	<v-btn
            icon
            dark
          @click="i_dialog = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>            
      <v-card-text>	
	<MondaiLists :p.sync="page" :idialog.sync="i_dialog"></MondaiLists>
      </v-card-text>
      <v-card-actions>
	<v-btn
          @click="i_dialog = false"
          >
	  閉じる
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
import MondaiLists from "./MondaiLists.vue";
import VueDraggableResizable from 'vue-draggable-resizable'
import Firebase from './../firebase';

export default {
    components: {
	"viewFormula" : viewFormula,
	'HelloWorld' : HelloWorld,
	'NewPadKun' : NewPadKun,
	'MondaiLists' : MondaiLists,
	'vue-draggable-resizable': VueDraggableResizable
    },
    data() {
	return {
	    curpos : 0,
	    page : 1,
	    i_dialog : false,
	    switch1 : true,
	    dialog : false,
	    calc_dialg : false,
	    k_dialog : false,
	    m_dialog : false,
	    curid : 0
	}
    },
    created() {
    },
    computed: {
	loadMondai : function(){
	    Firebase.loadMondai(this.page);
	},	
	mitems : function() {
	    return [...Array(60).keys()].map(i => ++i);
	},
	isSignedIn : function() {
	    return this.$store.getters.isSignedIn
	},
	monnum : {
	    get () {
		return this.$store.getters.getMonnum;
	    },
	    set (value) {
		this.$store.commit('setMonnum',{ monnum : value} );
	    },
	},
	title : {
	    get () {
		return this.$store.getters.getTitle;
	    },
	    set (value) {
		this.$store.commit('setTitle',{ title : value} );
	    },
	},
	year : {
	    get () {
		return this.$store.state.year;
	    },
	    set (value) {
		this.$store.commit('setYear',{ year : value} );
	    },
	},	    
	myclass :{
	    get () {
		return this.$store.state.myclass;
	    },
	    set (value) {
		this.$store.commit('setMyclass',{ myclass : value} );
	    },
	},	    
	order : {
	    get () {
		return this.$store.state.order;
	    },
	    set (value) {
		this.$store.commit('setOrder',{ order : value} );
	    },
	},	    
	myname : {
	    get () {
		return this.$store.state.myname;
	    },
	    set (value) {
		this.$store.commit('setMyname',{ myname : value} );
	    },
	},	    
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
    },
    methods: {
	spliceMondai() {
	    this.$store.dispatch('spliceMondai',{ insertnum: this.curpos });
	},
	createNewMondai() {
	    this.$store.dispatch('createNewMondai');
	},
	saveMondai() {
	    if(this.$store.getters.getKeyid) {
		Firebase.updateMondai();
	    } else {
		Firebase.saveMondai();
	    }
	},
	saveSettei() {
	    Firebase.saveUser();
	},	
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
.custom3cols {
  width: 33%;
  max-width: 33%;
  flex-basis: 33%;
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
