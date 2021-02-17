<template>
  <div>
        <div class="d-flex ma-2">
	  <v-btn @click="backtoformula" class="ml-2" color="primary">筆算に戻る</v-btn>
	</div>
    <div>
<vue-mathjax :formula="formula"></vue-mathjax>
</div>
</div>
</template>

<script>
import { zeroPadding } from './zeroPadding.js'
import { VueMathjax } from "vue-mathjax";

export default {
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
	formula : {
	    get () {
		return this.$store.state.formula
	    },
	    set (value) {
		this.$store.commit('updateFormula',{'formula' : value});
	    }
	},
    },
    methods: {
	backtoformula() {
	    this.$router.go(-1)
	},	
  }
}
</script>
