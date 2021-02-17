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
	    _id : 0
	};
    },
    mounted: function () {
	this._id = this.$route.params.id;
	MathJax.Hub.Config({
	});
    },
    computed: {
	formula : {
	    get () {
		return this.$store.getters.getformula({ 'id': this.$route.params.id })
	    },
	    set (value) {
		this.$store.commit('updateFormula',{'formula' : value, 'id': this.$route.params.id });
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
