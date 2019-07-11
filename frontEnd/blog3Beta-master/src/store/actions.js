// api相关 -------------------------------------------------------------

// 登录
export const login = ({commit}, dat) => { commit('login', { 'dat': dat, 'commit': commit }) }
// 检查登录
export const checkLoginState = ({commit}, dat) => { commit('checkLoginState', dat) }
// 请求桌面图标
export const requestDesktopIconList = ({commit}, dat) => { commit('requestDesktopIconList', dat) }
// 请求侧边栏收藏网址
export const requestSidebarWebsiteList = ({commit}, dat) => { commit('requestSidebarWebsiteList', dat) }
// 获取 sidebar pop 内容 (历史 / 新增)
export const requestSidebarPopContent = ({commit}, dat) => {
    // 请求历史
    if (dat === 'history') {
        commit('requestSidebarPopHistory', dat)
    // 新增
    } else if (dat === 'new') {
        commit('setSidebarPopContentIsNew')
    }
}
// 检查sidebarPop密码
export const checkSidebarPopEditPassword = ({commit}, dat) => { commit('checkSidebarPopEditPassword', dat) }
// 上传文件
export const uploadFileMultiple = ({commit}, dat) => { commit('uploadFileMultiple', { 'dat': dat, 'commit': commit }) }
// 删除文件
export const requestDeleteFile = ({commit}, dat) => { commit('requestDeleteFile', dat) }
// 提交文章
export const submitArticle = ({commit}, dat) => { commit('submitArticle', { 'dat': dat, 'commit': commit }) }

// --------------------------------------------------------------------

// 设置新增 / 编辑 / 历史弹窗标题
export const setSidebarPoptitle = ({commit}, dat) => { commit('setSidebarPoptitle', dat) }
// 设置 窗口 edit id
export const set_windowEdit_id = ({commit}, dat) => { commit('set_windowEdit_id', dat) }
// 显示 / 隐藏 sidebarPop
export const toggleSidebarPop = ({commit}, dat) => { commit('toggleSidebarPop', dat) }
// sidebarPop类型id框
export const setSidebarPopSelectId = ({commit}, dat) => { commit('setSidebarPopSelectId', dat) }
// sidebarPop显示密码输入框
export const sidebarPopEditPasswordTrue = ({commit} ) => { commit('sidebarPopEditPasswordTrue') }
// 清空sidebarPop密码输入框
export const clearSidebarPopPwdInputData = ({commit} ) => { commit('clearSidebarPopPwdInputData') }
// 设置sidebarPop密码输入框
export const setSidebarPopPwdInputData = ({commit}, dat) => { commit('setSidebarPopPwdInputData', dat) }
// 清除 sidebarPop 数据
export const clearSidebarPopData = ({commit} ) => { commit('clearSidebarPopData') }

// ----------------

// 显示通知
export const showNotifyPop = ({commit}, dat ) => { commit('showNotifyPop', dat) }
// 关闭通知
export const closeNotifyPop = ({commit} ) => { commit('closeNotifyPop') }

// ----------------

// 设置 上传框所有文件数据
export const setUploadFileAll_list = ({commit}, dat ) => { commit('setUploadFileAll_list', dat) }
// model sidebarPop 标题
export const VModelSidebarPopArticleInputData = ({commit}, dat ) => { commit('VModelSidebarPopArticleInputData', dat) }
// model sidebarPop 内容
export const VModelSidebarPopArticleTextareaData = ({commit}, dat ) => { commit('VModelSidebarPopArticleTextareaData', dat) }
// model sidebarPop 图标
export const VModelSidebarPopArticleIconLabelData = ({commit}, dat ) => { commit('VModelSidebarPopArticleIconLabelData', dat) }
// model sidebarPop 类型
export const VModelSidebarPopArticleTypeData = ({commit}, dat ) => { commit('VModelSidebarPopArticleTypeData', dat) }