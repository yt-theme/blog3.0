import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = {
    // 登录状态
    loginState: false,
    // 桌面布局
    desktopLayout: 0,
    // 设置新增 / 编辑 / 历史弹窗标题
    sidebarPoptitle: '',
    // 窗口 edit id
    windowEdit_id: '',
    // 显示 sidebarPop
    sidebarPopShow: false,
    // sidebarPop类型id
    sidebarPopSelectId: 'new',
    // sidebarPop是否显示输入框
    sidebarPopEditPasswordCheck: true,
    // sidebarPop密码输入框内容
    sidebarPopPwdInputData: '',
    // sidebarPop文章内容数据
    VModelSidebarPopArticleInputData: '',
    VModelSidebarPopArticleTextareaData: '',
    VModelSidebarPopArticleIconLabelData: 'normal',
    VModelSidebarPopArticleTypeData: 'web',

    // 数据 ----------------------------------
    // 桌面图标 list
    desktopIconList: [],
    // 常规文件列表
    fileList: [],
    // 天气
    weather: '',
    // 侧栏建议网址
    sidebarWebsiteList: [],
    // sidebarPop 数据 id 为判断sidebarPop类型为编辑还是新增
    sidebarPopData: {'id': '', 'content': []},
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store