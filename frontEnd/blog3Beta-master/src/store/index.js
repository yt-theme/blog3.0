import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = {
    // 通知定时器
    notifyPop_timer: null,
    // 登录状态
    loginState: false,
    // 桌面布局
    desktopLayout: 1,
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
    // 弹框通知
    notifyPopShow: false,
    notifyPopData: '',

    // 数据 ----------------------------------
    // 桌面图标 list
    desktopIconList: [],
    // 桌面图标被点击位置
    clickedIconPosition: {},
    // 常规文件列表
    fileList: [],
    // 天气
    weather: '',
    // 侧栏建议网址
    sidebarWebsiteList: [],
    // sidebarPop 数据 id 为判断sidebarPop类型为编辑还是新增
    sidebarPopData: {'id': '', 'content': []},
    // 上传框当前编辑上传文件存储
    curUploadFileMultiple_list: [],
    // 当前所有上传框文件
    uploadFileAll_list: [],
    // 窗口数组
    windowItem: [],
    // 窗口内容
    windowData: [],
    // 側欄文件列表
    sidebarUploadBox_dataList: [],
    // 文件框当前删除id
    currentUploadFileDelete__id: ''
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store