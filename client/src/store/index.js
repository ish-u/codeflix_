import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'


// Loading Vuex
Vue.use(Vuex)

// Creating Store
export default new Vuex.Store({
    modules:{
        token
    }
})

