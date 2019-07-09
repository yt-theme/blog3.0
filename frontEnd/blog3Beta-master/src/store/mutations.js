import axios from 'axios'
import qs from 'qs'
const reqUrl = 'http://localhost' + ':14499'

// axios配置
axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
        // config.headers = { 'Content-Type':'application/json' }
    }
    return config
}, error => {
    return Promise.reject(error)
})

// api ---------------------------------------------
// 登录
export const login = (state, obj) => {
    axios.post(reqUrl + '/api/login', qs.stringify(obj['dat'])).then((res) => {
        console.log('login =>', obj['commit'])
        if (res.data.stat === 1)  {
            window.localStorage.setItem('token', res.data.token)
            // 再检查登录状态
            obj['commit']('checkLoginState', true)
            // 请求桌面图标
        }
    }).catch((err) => {
        console.log('login err =>', err)
    })
}
// 检查登录
export const checkLoginState = (state, dat) => {
    // 如果直接设置登录状态为 true 则进行检查
    if (dat) {

        axios.post(reqUrl + '/api/checkLogin', qs.stringify(dat)).then((res) => {
            console.log('checkLogin =>', res.data)
            if (res.data.stat === 1) {
                state.loginState = true
            } else {
                state.loginState = false
            }
        }).catch((err) => {
            console.log('checkLoginState err =>', err)
            state.loginState = false
        })

    // 如果直接设置登录状态为 false 则直接为 false
    } else {
        state.loginState = false
        // 清空 token
        window.localStorage.setItem('token', '')
    }
}
// 请求桌面图标
export const requestDesktopIconList = (state, dat) => {
    axios.post(reqUrl + '/api/requireArticleList', qs.stringify(dat)).then((res) => {

    }).catch((err) => {

    })
}
// 请求侧边栏收藏网址
export const requestSidebarWebsiteList = (state, dat) => {
    axios.post(reqUrl + '/api/public/proposeWebsite').then((res) => {
        if (res.data.stat === 1 && res.data.data.length > 0) {
            state.sidebarWebsiteList = res.data.data
        } else {
            state.sidebarWebsiteList = []
        }
    }).catch((err) => {

    })
}
// 检查sidebarPop密码
export const checkSidebarPopEditPassword = (state, dat) => {
    axios.post(reqUrl + '/api/check/editPwd', qs.stringify({'edit_password': dat })).then((res) => {
        if (res.data.stat === 1) {
            state.sidebarPopEditPasswordCheck = false
        } else {
            state.sidebarPopEditPasswordCheck = true
        }
    })
}

// -------------------------------------------------

// 设置新增 / 编辑 / 历史弹窗标题
export const setSidebarPoptitle = (state, dat) => { state.sidebarPoptitle = dat }
// 设置 窗口 edit id
export const set_windowEdit_id = (state, dat) => { state.windowEdit_id = dat }
// 显示 / 隐藏 sidebarPop
export const toggleSidebarPop = (state, dat) => { state.sidebarPopShow = dat }
// sidebarPop类型id
export const setSidebarPopSelectId = (state, dat) => { state.sidebarPopSelectId = dat }
// sidebarPop显示密码输入框
export const sidebarPopEditPasswordTrue = (state) => { state.sidebarPopEditPasswordCheck = true }
// 清空sidebarPop密码输入框 sidebarPopPwdInputData
export const clearSidebarPopPwdInputData = (state) => { state.sidebarPopPwdInputData = '' }
// 设置sidebarPop密码输入框
export const setSidebarPopPwdInputData = (state, dat) => { state.sidebarPopPwdInputData = dat }
// 清除 sidebarPop 数据
export const clearSidebarPopData = (state) => {
    state.VModelSidebarPopArticleInputData = ''
    state.VModelSidebarPopArticleTextareaData = ''
    state.VModelSidebarPopArticleIconLabelData = 'normal'
    state.VModelSidebarPopArticleTypeData = 'web'
}