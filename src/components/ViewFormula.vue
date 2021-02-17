<template>
  <div>
    <div :style="'font-size : ' + bairtsu + '%'">
      <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
  </div>
</template>

<script>
import { zeroPadding } from './zeroPadding.js'
import { VueMathjax } from "vue-mathjax";

export default {
    props : ['_id'],
    name: "LongdivsionWithDot",
    components : {
	"vue-mathjax": VueMathjax,
    },
    data() {
	return {
	};
    },
    mounted: function () {
	MathJax.Hub.Config({
	});
    },
    computed: {
	bairtsu : {
	    get () {
		return this.$store.getters.getBairitsu({'id': this._id});
	    },
	    set (value) {
		this.$store.commit('updatebairitsu',{'id': this._id });
	    }	
	},
	formula : {
	    get () {
		return this.$store.getters.getformula({ 'id': this._id })
	    },
	    set (value) {
		this.$store.commit('updateFormula',{'formula' : value, 'id': this._id });
	    }	
	}
    },
    methods: {
	backtoformula() {
	    this.$router.go(-1)
	},	
  }
}
</script>
