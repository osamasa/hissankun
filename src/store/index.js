import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	formula1 : "127.1/63",
	answer1 : "222",
	formula : ''
    },
    mutations: {
	setFormula1 (state, n) {
	    state.formula1 = n;
	},
	setAnswer1 (state, n) {
	    state.answer1 = n;
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
