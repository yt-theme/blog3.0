import axios from 'axios'
import qs from 'qs'
// const reqUrl = 'http://192.168.0.126' + ':14498'
// import { SERVER_IP, SERVER_PORT} from '../../../../config'
// const ip = SERVER_IP
// const port = SERVER_PORT
const reqUrl =  ''

// axios配置
axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
        // config.headers = { 'Content-Type':'application/json' }
    }
    return config
}, error => { return Promise.reject(error) })

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
            obj['commit']('requestDesktopIconList')
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
    let copy_dat = {}
    if (dat) {
        copy_dat = JSON.parse(JSON.stringify(dat))
    }
    copy_dat['label_search'] ? (copy_dat['label_search'] = copy_dat['label_search']) : (copy_dat['label_search'] = 'All')
    copy_dat['h1_search']    ? (copy_dat['h1_search'] = copy_dat['h1_search'])       : (copy_dat['h1_search'] = '')
    copy_dat['page'] = state.page
    copy_dat['size'] = state.onePageCount
    // 请求
    axios.post(reqUrl + '/api/article/queryPageById', qs.stringify(copy_dat)).then((res) => {
        if (res.data.stat === 1) {
            state.desktopIconList = res.data.data
            state.count = res.data.count
        }
    }).catch((err) => {

    })
}
// 改变当前页码
export const setCur_queryPageData = (state, obj) => {
    let dat    = obj['dat']
    let commit = obj['commit']
    // 设置当前页码
    state.page = dat
    // 请求分页
    commit('requestDesktopIconList')
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
// 请求 sidebarPop 历史
export const requestSidebarPopHistory = (state, commit) => {
    state.sidebarPopData.id = 'history'
    // 请求所有桌面图标
    commit('requestDesktopIconList')
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
// 上传文件
export const uploadFileMultiple = (state, obj) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        // 文件上传进度
        onUploadProgress: (progressEvent) => {
            let progress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            // 通知
            obj['commit']('showNotifyPop', `upload progress ${progress} `)
        }
    } 
    axios.post(reqUrl + '/api/file/upload', obj['dat'], config).then((res) => {
        console.log('fileUpload =>', res)
        if (res.data.stat === 1) {
            // 如果上传组件不是私有模式
            if (!obj['is_private_mode']) {

                state.uploadFileAll_list = [...state.uploadFileAll_list, ...res.data.data]

                // 去重
                let tmpObj = {}
                let tmp_return_uploadFileAll_list = []
                for (let i=0; i<state.uploadFileAll_list.length; i++) {
                    if (tmpObj[state.uploadFileAll_list[i]['_id']]) {

                    } else {
                        tmpObj[state.uploadFileAll_list[i]['_id']] = true
                        tmp_return_uploadFileAll_list.push(state.uploadFileAll_list[i])
                    }
                }
                state.uploadFileAll_list = tmp_return_uploadFileAll_list

                // for (let i=0; i<state.uploadFileAll_list.length; i++) {
                //     state.uploadFileAll_list[i]['file_url'] = reqUrl + '/' + state.uploadFileAll_list[i]['file_url']
                //     console.log(`state.uploadFileAll_list[i]['file_url'] =>`, state.uploadFileAll_list[i]['file_url'])
                // }
            }
            // 通知
            obj['commit']('showNotifyPop', `upload files success`)
            // sidebar file list
            obj['commit']('requestSidebarUploadBox_dataList')
            // 关闭通知
            clearTimeout(state.notifyPop_timer); state.notifyPop_timer = setTimeout(() => { obj['commit']('closeNotifyPop') }, 3000)

        } else {

        }
    }).catch((err) => {
        console.log('file upload err =>', err)
    })
}
// 删除文件
export const requestDeleteFile = (state, obj) => {
    const dat    = obj['dat']
    const commit = obj['commit']
    axios.post(reqUrl + '/api/file/delete', qs.stringify({
        'id': dat
    })).then((res) => {
        // sidebar file list
        commit('requestSidebarUploadBox_dataList')
    })
}
// 提交文章
export const submitArticle = (state, obj) => {
    const commit = obj['commit']
    const dat    = obj['dat']
    const tmp_dat = {
        'id':          dat['id']          || '',
        'contentType': dat['contentType'] || '',
        'h1':          dat['h1']          || '',
        'label':       dat['label']       || '',
        'content':     dat['content']     || '',
        'date':        dat['date']        || '',
        'files':       JSON.stringify(dat['files'].map((v) => { return { 'file_id': v._id } } )) || [],
    }
    
    // 判断是新增还是编辑
    // 编辑
    if (dat['id']) {
        axios.post(reqUrl + '/api/article/editById', qs.stringify(tmp_dat)).then((res) => { commonSubmitFunc(res, 'Edit') })
    // 新增
    } else {
        axios.post(reqUrl + '/api/article/createById', qs.stringify(tmp_dat)).then((res) => { commonSubmitFunc(res, 'Create') })
    }

    // 提交用公共方法
    function commonSubmitFunc (res, createOrEditTxt) {
        if (res.data.stat === 1) {
            // 清空上传文件列表
            commit('setUploadFileAll_list', [])
            state.curUploadFileMultiple_list = []
            // 清空标题 内容 重置标签与类型
            commit('clearSidebarPopData')
            // 关闭 sidebarPop
            commit('toggleSidebarPop', false)
            // 请求桌面图标
            commit('requestDesktopIconList')
            // sidebar file list
            commit('requestSidebarUploadBox_dataList')
            // 通知
            clearTimeout(state.notifyPop_timer); commit('showNotifyPop', `${createOrEditTxt} success !!!`); setTimeout(() => { commit('closeNotifyPop') }, 3000)
        } else { clearTimeout(state.notifyPop_timer); commit('showNotifyPop', `${createOrEditTxt} faild`); setTimeout(() => { commit('closeNotifyPop') }, 3000) }
    }
}
// 请求窗口内容
export const requestWindowContent = (state, dat) => {
    axios.post(reqUrl + '/api/article/queryContentById', qs.stringify(dat)).then((res) => {
        if (res.data.stat === 1) {
            let tmp_data = JSON.parse(JSON.stringify(res.data.data))
            // for (let i=0; i<tmp_data.file_list.length; i++) {
            //     tmp_data.file_list[i].file_url = reqUrl + '/' + tmp_data.file_list[i].file_url
            // }
            state.windowData[dat['article_id']] = tmp_data
            state.windowData = Object.assign({}, state.windowData)
        }
    })
}
// 删除文章
export const deleteArticle = (state, obj) => {
    const dat    = obj['dat']
    const commit = obj['commit']
    axios.post(reqUrl + '/api/article/deleteById', qs.stringify(dat)).then((res) => {
        if (res.data.stat === 1) {
            // 刷新历史数据
            commit('requestDesktopIconList')
        }
    })
}
// 請求側欄文件列表
export const requestSidebarUploadBox_dataList = (state, dat) => {
    
    axios.post(reqUrl + '/api/file/queryTmpAll', qs.stringify(dat)).then((res) => {
        if (res.data.stat === 1) {
            let tmp_data = JSON.parse(JSON.stringify(res.data.data))
            // for (let i=0; i<tmp_data.length; i++) {
            //     tmp_data[i].file_url = reqUrl + '/' + tmp_data[i].file_url
            // }

            state.sidebarUploadBox_dataList = tmp_data
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
    state.uploadFileAll_list = []
    state.curUploadFileMultiple_list = []
}
// 设置 sidebarPop 为新增
export const setSidebarPopContentIsNew = (state) => { state.sidebarPopData.id = 'new' }
// 显示通知
export const showNotifyPop = (state, dat ) => { state.notifyPopData = dat; state.notifyPopShow = true }
// 关闭通知
export const closeNotifyPop = (state) => { state.notifyPopData = ''; state.notifyPopShow = false  }
// 设置 上传框所以文件数据
export const setUploadFileAll_list = (state, dat ) => { state.uploadFileAll_list = dat }
// model sidebarPop 标题
export const VModelSidebarPopArticleInputData = (state, dat ) => { state.VModelSidebarPopArticleInputData = dat }
// model sidebarPop 内容
export const VModelSidebarPopArticleTextareaData = (state, dat ) => { state.VModelSidebarPopArticleTextareaData = dat }
// model sidebarPop 图标
export const VModelSidebarPopArticleIconLabelData = (state, dat ) => { state.VModelSidebarPopArticleIconLabelData = dat }
// model sidebarPop 类型
export const VModelSidebarPopArticleTypeData = (state, dat ) => { state.VModelSidebarPopArticleTypeData = dat }
// 改变桌面类型
export const changeDesktopLayout = (state, dat ) => { state.desktopLayout = dat }
// 显示窗口
export const addWindow = (state, obj ) => { 
    let tag = true
    for (let i=0;i<state.windowItem.length;i++) {
        if (state.windowItem[i]['id'] == obj.id) {
            tag = false
            break
        }
    }
    if (tag) {
        state.windowItem.push({
            'component': obj.component,
            'h1': obj.h1,
            'id': obj.id
        })
    }
}
// 关闭窗口
export const deleteWindow = (state, dat ) => {
    for (let i=0;i<state.windowItem.length;i++) {
        if (state.windowItem[i]['id'] == dat) {
            state.windowItem.splice(i, 1, '')
        }
    }
    let tag = true
    for (let i=0;i<state.windowItem.length;i++) {
        if (state.windowItem[i] != '') {
            tag = false
        }
    }
    if (tag) {
        state.windowData = {

        }
    }
}
// 关闭所有窗口
export const deleteAllWindow = (state, obj ) => { state.windowItem = [] }

// sidebarPop 加数据
export const addDataSidebarPopEditArticle = (state, dat ) => {
    state.VModelSidebarPopArticleInputData = dat.h1
    state.VModelSidebarPopArticleTextareaData = dat.content
    state.VModelSidebarPopArticleIconLabelData = dat.img
    state.VModelSidebarPopArticleTypeData = dat.type
    state.uploadFileAll_list = dat.file_list
}
// 文件框当前删除的 _id
export const setCurrentUploadFileDelete__id = (state, dat) => { state.currentUploadFileDelete__id = dat }
// 设置 当前请求文件列表数据
export const setCurUploadFileMultiple_list = (state, dat) => { state.curUploadFileMultiple_list = dat }
// 当前鼠标点击图标位置
export const currentClicked_iconPosition = (state, obj) => {
    state.clickedIconPosition = {
        'id': obj.id,
        'x':  obj.x,
        'y':  obj.y
    }
}
// 每页显示图标数量
export const set_onePageCount = (state, dat) => { state.onePageCount = dat }