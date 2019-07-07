import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = {
    // 登录状态
    loginStat: false,

    // 数据 ----------------------------------
    // 桌面图标 list
    desktopIconList: [],
    // 天气
    weather: '',
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store