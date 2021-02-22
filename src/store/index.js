import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	lastno : 0,
	bairitsu : [{'id': 0, 'cd' : 100}],
	sep : [{'id': 0, 'cd' : ''}],
	formula : [{'id': 0, 'cd' : '$$$$'}],
	mediator : {
	    last : null
	},
	lawformula : [{'id': 0, 'cd' : ''}],
	calc : [{'id': 0, 'cd' :[
		[
		    { x:0,y:0,kuri:'',chr:'',isActive:false }, { x:1,y:0,kuri:'',chr:'',isActive:false }, { x:2,y:0,kuri:'',chr:'',isActive:false }, { x:3,y:0,kuri:'',chr:'',isActive:false }, { x:4,y:0,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:1,kuri:'',chr:'',isActive:false }, { x:1,y:1,kuri:'',chr:'',isActive:false }, { x:2,y:1,kuri:'',chr:'',isActive:false }, { x:3,y:1,kuri:'',chr:'',isActive:false }, { x:4,y:1,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:2,kuri:'',chr:'',isActive:false }, { x:1,y:2,kuri:'',chr:'',isActive:false }, { x:2,y:2,kuri:'',chr:'',isActive:false }, { x:3,y:2,kuri:'',chr:'',isActive:false }, { x:4,y:2,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:3,kuri:'',chr:'',isActive:false }, { x:1,y:3,kuri:'',chr:'',isActive:false }, { x:2,y:3,kuri:'',chr:'',isActive:false }, { x:3,y:3,kuri:'',chr:'',isActive:false }, { x:4,y:3,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:4,kuri:'',chr:'',isActive:false }, { x:1,y:4,kuri:'',chr:'',isActive:false }, { x:2,y:4,kuri:'',chr:'',isActive:false }, { x:3,y:4,kuri:'',chr:'',isActive:false }, { x:4,y:4,kuri:'',chr:'',isActive:false }
		]] }],
    },
    getters: {
	getBairitsu: (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.bairitsu.find( a => a.id == _id ).cd;
	},
	getCalc : (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.calc.find( a => a.id == _id ).cd;
	},
	getLawformula :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.lawformula.find( a => a.id == _id ).cd;
	},
	getAllFormula : (state) => {
	    return state.formula;
	},
	getformula :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.formula.find( a => a.id == _id ).cd;
	},	
	getSep :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.sep.find( a => a.id === _id ).cd;
	}	
    },
    mutations: {
	removeCalc : (state,payload) => {
	    let i = -1;
	    i = state.calc.findIndex( a => a.id === payload.id);
	    if(i>-1) {
		state.calc.splice( i , 1 );
	    }
	    i = state.bairitsu.findIndex( a => a.id === payload.id);
	    if(i>-1) {
		state.bairitsu.splice( i , 1 );
	    }
	    i = state.formula.findIndex( a => a.id === payload.id);
	    if(i>-1) {
		state.formula.splice( i , 1 );
	    }
	    i = state.sep.findIndex( a => a.id === payload.id);
	    if(i>-1) {
		state.sep.splice( i , 1 );
	    }
	    i = state.lawformula.findIndex( a => a.id === payload.id);
	    if(i>-1) {
		state.lawformula.splice( i , 1 );
	    }	    
	},
	addLastNo : (state) => {
	    state.lastno = state.lastno + 1;
	    state.bairitsu.push({'id': state.lastno, 'cd' : 100});
	    state.sep.push({'id': state.lastno, 'cd' : ''});
	    state.formula.push({'id': state.lastno, 'cd' : '$$$$'});
	    state.lawformula.push({'id': state.lastno, 'cd' : ''})
	    state.calc.push({'id': state.lastno, 'cd' : [
		[
		    { x:0,y:0,kuri:'',chr:'',isActive:false }, { x:1,y:0,kuri:'',chr:'',isActive:false }, { x:2,y:0,kuri:'',chr:'',isActive:false }, { x:3,y:0,kuri:'',chr:'',isActive:false }, { x:4,y:0,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:1,kuri:'',chr:'',isActive:false }, { x:1,y:1,kuri:'',chr:'',isActive:false }, { x:2,y:1,kuri:'',chr:'',isActive:false }, { x:3,y:1,kuri:'',chr:'',isActive:false }, { x:4,y:1,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:2,kuri:'',chr:'',isActive:false }, { x:1,y:2,kuri:'',chr:'',isActive:false }, { x:2,y:2,kuri:'',chr:'',isActive:false }, { x:3,y:2,kuri:'',chr:'',isActive:false }, { x:4,y:2,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:3,kuri:'',chr:'',isActive:false }, { x:1,y:3,kuri:'',chr:'',isActive:false }, { x:2,y:3,kuri:'',chr:'',isActive:false }, { x:3,y:3,kuri:'',chr:'',isActive:false }, { x:4,y:3,kuri:'',chr:'',isActive:false }
		],
		[
		    { x:0,y:4,kuri:'',chr:'',isActive:false }, { x:1,y:4,kuri:'',chr:'',isActive:false }, { x:2,y:4,kuri:'',chr:'',isActive:false }, { x:3,y:4,kuri:'',chr:'',isActive:false }, { x:4,y:4,kuri:'',chr:'',isActive:false }
		]
	    ]});
	},
	setBairitsu: (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.lawformula.findIndex( a => a.id == _id );
	    let bairitsu = state.bairitsu[i].cd;
	    if(payload.command==='+') {
		bairitsu += 10;
	    } else {
		bairitsu -= 10;
		if(bairitsu < 10) {
		    bairitsu = 10
		}
	    }
	    state.bairitsu[i].cd=bairitsu;
	},
	setBairitsuAll: (state, payload) => {
	    let _id = parseInt(payload.id);
	    state.bairitsu.forEach( b => {
		let bairitsu = b.cd;

		if(payload.command==='+') {
		    bairitsu += 10;
		} else {
		    bairitsu -= 10;
		    if(bairitsu < 10) {
			bairitsu = 10
		    }
		}
		b.cd=bairitsu;
	    });
	},	
	setLawformula : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.lawformula.findIndex( a => a.id == _id );
	    state.lawformula[i].cd=payload.lawformula;
	},
	setSep : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.sep.findIndex( a => a.id == _id );
	    state.sep[i].cd = payload.sep;
	},
	updateFormula : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.formula.findIndex( a => a.id == _id );	    
	    state.formula[i].cd = payload.formula;
	},
	updateCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );
	    state.calc[i].cd = payload.calc.concat();
	},
	updateChrCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );
	    if(payload.chr) {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
	    } else if(payload.kuri) {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].kuri = payload.kuri;
	    }
	},
	registerMediator: (state, payload) => {
	    let _id = parseInt(payload.id);
	    if(state.mediator.last != null) {
		state.mediator.last.isActive=false;
	    }
	    let i = state.calc.findIndex( a => a.id == _id );

	    state.mediator.last = state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)];
	    state.mediator.last.isActive=true;
	},
	setCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );	    
	    if(typeof payload.isActive !== 'undefined') {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].isActive = payload.isActive;
	    }
	    if(typeof payload.chr !== 'undefined') {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
	    }	    
	}
    },
    actions: {
	removeCalc : (context,payload) => {
	    context.commit('removeCalc', { 'id' : payload.id });
	},
	resetLastno : (context,payload) => {
	    context.commit('registerMediator',{ 'id' : payload.id, 'x':0, 'y':0});
	},
	addNewNumber(context) {
	    context.commit('addLastNo');
	    context.commit('registerMediator',{ 'id' : context.state.lastno, 'x':0, 'y':0});
	},
	moveUpNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    const _x = context.state.mediator.last.x;
	    let _y = context.state.mediator.last.y;
	    _y--;
	    if(_y < 0)
		_y=0;
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveDownNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    const _x = context.state.mediator.last.x;
	    let _y = context.state.mediator.last.y;
	    _y++;
	    let i = context.state.calc.findIndex( a => a.id == _id );
	    if(!(_y < context.state.calc[i].cd.length)) {
		_y=context.state.calc[i].cd.length-1;
	    }
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveLeftNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x--;
	    if(_x < 0)
		_x=0;
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveRightNumeric(context,payload) {
	    const _id = parseInt(payload.id);	    
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x++;
	    let i = context.state.calc.findIndex( a => a.id == _id );	    	    
	    if(!(_x < context.state.calc[i].cd[0].length)) {
		_x=context.state.calc[i].cd[0].length-1;
	    }
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},		
	deleteBackNumeric(context,payload) {
	    const _id = parseInt(payload.id);	    
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x--
	    if(_x<0)
		_x=0;
	    context.commit('updateChrCalc', {kuri: '', chr : '', x: _x, y:_y, 'id' : _id});
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	deleteNumeric(context,payload) {
	    const _id = parseInt(payload.id);		
	    const _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    context.commit('updateChrCalc', {kuri: '', chr : '', x: _x, y:_y, 'id' : _id});		
	},
	kuriageNumeric (context,payload) {
	    const _id = parseInt(payload.id);
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    let l = context.state.calc.findIndex( a => a.id == _id );	    
	    let i=0;

	    for(i=0;(_x-i)>-1 && i < payload.mess.length ;i++) {
		let _payload={chr:'',kuri:'', x: _x-i, y:_y, id: _id};
		const _pos=payload.mess.length-i-1;
		const _chr = payload.mess[_pos];
		if(i==0) {
		    _payload.chr = _chr
		    context.commit('updateChrCalc', _payload);
		} else {
		    _payload.kuri = _chr
		    context.commit('updateChrCalc', _payload);
		}
	    }
	},
	pushNumeric (context,payload) {
	    const _id = parseInt(payload.id);
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    let l = context.state.calc.findIndex( a => a.id == _id );	    
	    const _size_x =  context.state.calc[l].cd[0].length;
	    let i=0;

	    for(i=0;(i+_x)<_size_x && i < payload.mess.length ;i++) {
		let _payload={chr : payload.mess[i], x: _x+i, y:_y, id: _id};
		context.commit('updateChrCalc', _payload); 
	    }
	}
    },
    modules: {
    }
})
