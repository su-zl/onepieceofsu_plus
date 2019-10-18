import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 

export default new Vuex.Store({
  state: {
      person_name:'',
      person_src:'',
      md5_key:'123456',
      host:'http://localhost:3000'
  },
  mutations: {
     loginSuccess(state,value){
        state.selectRadioType=value
     }
  },
  actions: {

  }
})
