import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	formula1 : "500/4",
	answer1 : "12",
	oya : '0',
	ko : '0',
	formula : ''
    },
    mutations: {
	setFormula1 (state, n) {
	    state.formula1 = n;
	},
	setAnswer1 (state, n) {
	    state.answer1 = n;
	},
	setOya (state, n) {
	    state.oya = n;
	},
	setKo (state, n) {
	    state.ko = n;
	},
	setFormula (state, n) {
	    state.formula = n;
	},	
    },
    actions: {
    },
    modules: {
    }
})
