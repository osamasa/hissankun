import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	formulas : [
	    {
		id : 0,
		formula1 : '13.3*33.45',
		answer1 : '1234.56',
		formula : '$$%20%5Cbegin%7Barray%7D%7Br%7D13.3%20%5C%5C%5B-3pt%5D%5Cunderline%7B%5Ctimes%5Cphantom%7B0%7D33.45%7D%5C%5C%5B-3pt%5D665%20%5C%5C%5B-3pt%5D532%5Cphantom%7B0%7D%20%5C%5C%5B-3pt%5D399%5Cphantom%7B00%7D%20%5C%5C%5B-3pt%5D%5Cunderline%7B%5Cphantom%7B0%7D399%5Cphantom%7B000%7D%7D%20%5C%5C%5B-3pt%5D444885%5Cend%7Barray%7D%20$$',
		ope : '*',
		moji : ['13.3','33.45'],
		calcs : ['666','555','444','333'],
		amari1 : ''
	    },
	    {
		id : 1,
		formula1 : '1.5/5',
		answer1 : '0.3',
		formula : '$$%20%5Crequire%7Benclose%7D%20%5Cbegin%7Barray%7D%7Bl%7D%5Cphantom%7B00%7D0%20%5C%5C%205%20%5Cenclose%7Blongdiv%7D%7B1.5%7D%5Ckern-.2ex%20%5C%5C%5B-3pt%5D%20%5Cphantom%7B00%7D%5Cunderline%7B0%7D%20%5C%5C%5B-3pt%5D%5Cphantom%7B0%7D%5Cend%7Barray%7D%20$$',
		ope : '/',
		moji : ['1.5','5'],
		calcs : [{'isDot' : false,'answer':'0','midformula':'0'},
			 {'isDot' : true,'answer':'0','midformula':'15'},
			 {'isDot' : true,'answer':'3','midformula':'15'}
			],
		amari1 : '0'
	    },
	    {
		id : 2,
		formula1 : '32+55',
		answer1 : '87',
		formula : '$$%20%5Cbegin%7Barray%7D%7Br%7D32%20%5C%5C%5B-3pt%5D%5Cunderline%7B+%5Cphantom%7B%7D55%7D%5C%5C%5B-3pt%5D0%5Cend%7Barray%7D%20$$',
		ope : '+',
		moji : ['32','55'],
		calcs : [],
		amari1 : ''
	    },
	    {
		id : 3,
		formula1 : '155-23',
		answer1 : '132',
		formula : '$$%20%5Cbegin%7Barray%7D%7Br%7D55%20%5C%5C%5B-3pt%5D%5Cunderline%7B-%5Cphantom%7B%7D32%7D%5C%5C%5B-3pt%5D0%5Cend%7Barray%7D%20$$',
		ope : '-',
		moji : [],
		calcs : [],
		amari1 : ''
	    },	    
	]
    },
    getters: {
	getFormulas: (state) => (payload) => {
	    return state.formulas.find( r => r.id == payload.id );
	},
	getAllFormulas: (state) => {
	    return state.formulas;
	}	
    },
    mutations: {
	setFormulas : (state, payload) => {
	    const _id = payload.id;
	    if(typeof payload.formula1 !== 'undefined') {
		state.formulas[_id].formula1 = payload.formula1
	    }
	    if(typeof payload.answer1 !== 'undefined') {
		state.formulas[_id].answer1 = payload.answer1
	    }
	    if(typeof payload.formula !== 'undefined') {
		state.formulas[_id].formula = payload.formula
	    }
	    if(typeof payload.ope !== 'undefined') {
		state.formulas[_id].ope = payload.open
	    }
	    if(typeof payload.moji !== 'undefined') {
		state.formulas[_id].moji = payload.moji.slice()
	    }
	    if(typeof payload.calcs !== 'undefined') {
		state.formulas[_id].calcs = payload.calcs.slice()
	    }
	    if(typeof payload.amari1 !== 'undefined') {
		state.formulas[_id].amari1 = payload.amari1
	    }
	}
    },
    actions: {
    },
    modules: {
    }
})
