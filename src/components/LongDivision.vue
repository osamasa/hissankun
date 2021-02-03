<template>
  <div>
    <v-form ref="divform">
      <v-text-field
	v-model="amari1"
	label="あまりを入力"
	@input="mkFormula"      
	></v-text-field>
      <v-text-field
	v-for="(i,n) in calcs" :key="n"
	v-model="calcs[n]"
	label="数式"
	@input="mkFormula"      
	></v-text-field>
    </v-form>
  </div>
</template>
<script>
  export default {
  name: "About",
  props : {
  oya : {
  type : String
  },
  ko: {
  type : String
  },
  formula : {
  type : String
  },
  answer1 : {
    type : String
  }
  },
  data() {
	return {
	    amari1 : "0",
	    syousuten : 0,
	    calcs : [],
	    nagasa :0,
	    kurisagari : 0
	};
    },
    mounted: function () {
	this.mkcalcs();
	this.mkFormula();	
  },
computed: {
  },  
    methods: {
	mkcalcs() {
	    this.nagasa=String(Math.floor(parseInt(this.oya)/parseInt(this.ko))).length;
	    this.kurisagari=String(parseInt(this.oya)).length-this.nagasa;

	    if(this.answer1.indexOf('.')>0) {
		let dotPos = this.answer1.length-this.answer1.indexOf('.');
		this.syousuten = dotPos-1;
		this.nagasa += this.syousuten;
	    }
	    this.nagasa = this.nagasa*2 -1;

	    this.calcs=null;
	    this.calcs=Array(this.nagasa).fill(0);
	},
	mkFormula() {
	    function zeroPadding(_nagasa){
		if(_nagasa > 1)
		    return ( Array(_nagasa).join('1') );
		else
		    return "1";
             }
            let _formura='';

            _formura = '$$ \\require{enclose} \\begin{array}{r}' + this.answer1 + ' \\\\ ' + this.ko + ' \\enclose{longdiv}{' + this.oya + '}\\kern-.2ex \\\\[-3pt] ';
	    let i=0;
	    const self=this;
	    this.calcs.forEach(n => {
  if(i===(self.nagasa-1)) {

		    let headpad=self.oya.length-String(n).length;

		    _formura += '\\' + 'underline{\\phantom{'+ zeroPadding(headpad) +'}' + n + '} \\\\[-3pt]'
		} else if(i % 2 == 0) {

		    let nokori = self.oya.length-Math.floor(i/2)-self.kurisagari;
		    let headpad = self.oya.length-String(n).length-nokori;

		    _formura+= '\\' + 'underline{';
		    if(headpad > 0) {
			_formura+='\\phantom{' + zeroPadding(headpad+1) + '}'
		    }

		    _formura += n;
		    if(nokori > 0) {
			_formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    
		    _formura += '} \\\\[-3pt]';
		} else {
		    let headpad = self.oya.length+self.syousuten-self.answer1.length + ((i+1)/2)-(String(n).length-1)-self.kurisagari;
		    let nokori = self.answer1.length - headpad - (String(n).length) + self.syousuten
		    _formura += n;
		    if(nokori > 0) {
                       _formura +='\\phantom{' + zeroPadding(nokori)+ '}'
		    }		    		    
		    _formura += ' \\\\[-3pt]'
		}
		i++;
	    })
	    _formura += '\\phantom{00}' + this.amari1
            _formura += '\\end{array} $$'
            this.$emit('update:formula', _formura);
	}
    }
}
</script>

