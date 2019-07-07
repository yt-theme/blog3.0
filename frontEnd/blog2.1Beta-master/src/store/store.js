import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
let IP = location.host + ':14499/'
let reqUrl = 'http://' + IP
let socketUrl = 'ws://' + IP
// NotifyPop timer
var timer

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loginState: false,
        // header menu
        menuData:[],
        // notify number
        notifyNum: '',
        // desktopp icon
        desktopIconList: [],
        // sidebar icon
        sidebarIconList: [],
        // window title
        windowItem: [],
        // window data
        windowData: {

        },
        // dialogSidePop show
        sidebarPoptitle: '',
        sidebarPopShow: false,
        sidebarPopSelectId: '',
        sidebarPopData: {'id': '', 'content': ['loading']},
        sidebarPopPwdInputData: '',
        sidebarPopEditPasswordCheck: true,
        // sidebarPop new article input
        VModelSidebarPopArticleInputData: '',
        // sidebarPop new article textarea
        VModelSidebarPopArticleTextareaData: '',
        // sidebarPop new article icon
        VModelSidebarPopArticleIconLabelData: 'normal',
        // sidebarPop new article type
        VModelSidebarPopArticleTypeData: 'web',
        // sidebarPop new article date
        // VModelSidebarPopArticleDate: '',
        resultForNewArticle: '',
        // notifyPop show
        notifyPopShow: false,
        // notifyPop data
        notifyPopData: 'err',
        windowEdit_id: '',
        // change desktop layout
        setDesktopLayout: 1,
        // weather dat
        weather: '',
        // search result
        search_result: '',
        // fileList dat
        fileList: {
            url: '',
        },
        // 文件上传是否操作完毕 不论成功与否
        file_update_state: true,
        // 预览框显示
        viewPopShow_state: false,
        // monitor 内容
        monitor_content: '',
    },
    mutations: {
        checkLoginState (state, dat) {
            dat == true ? state.loginState = true : state.loginState = false
        },
        clearSidebarPopData (state) {
            state.VModelSidebarPopArticleInputData = ''
            state.VModelSidebarPopArticleTextareaData = ''
            state.VModelSidebarPopArticleIconLabelData = 'normal'
            state.VModelSidebarPopArticleTypeData = 'web'
        },
        requestMenuData (state) {
            axios.get(reqUrl + 'getMenu/').then((res)=> {
                if (res.data.length>0) {
                    state.menuData = res.data
                }
            })
        },
        // requestNotifyNumber (state) {
        //     axios.get(reqUrl + 'getNotifyNumber/').then((res)=> {
        //         if (res.data) {
        //             state.notifyNum = res.data.data
        //         }
        //     })
        // },
        requestDesktopIconList (state) {
            let username = window.localStorage.getItem('name')
            let usertoken = window.localStorage.getItem('token')

            let qs = require('qs')
            let obj = {
                'name': username,
                'token': usertoken
            }

            axios.post(reqUrl + 'getDesktopIconList/', qs.stringify(obj)).then((res)=> {
                state.desktopIconList = res.data
                state.VModelSidebarPopArticleInputData = ''
                state.VModelSidebarPopArticleTextareaData = ''
            })
        },
        requestSidebarIconList (state) {
            axios.post(reqUrl + 'getSidebarIconList/').then((res)=> {
                if (res.data.length>0) {
                    state.sidebarIconList = res.data
                }
            })
        },
        addWindow (state, obj) {
            let tag = true
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i]['id'] == obj.id) {
                    tag = false
                }
            }
            if (tag) {
                let id = new Date().getTime()
                state.windowItem.push({
                    'component': obj.component,
                    'label': obj.label,
                    'id': obj.id
                })
            }
        },
        // window data
        requestWindowContent: (state, id) => {
            var params = new URLSearchParams()
            params.append('id',id)
            axios.post(reqUrl + 'getWindowContent/', params).then((res)=> {
                let resId = res.data['id']
                state.windowData[id] = res.data
                state.windowData = Object.assign({}, state.windowData)
            })
        },
        deleteWindow (state, id) {
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i]['id'] == id) {
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
                this.state.windowData = {

                }
            }
        },
        deleteAllWindow (state) {
            state.windowItem = []
        },
        toggleSidebarPop (state, bool) {
            // clear input
            // state.VModelSidebarPopArticleInputData = '',
            // state.VModelSidebarPopArticleTextareaData = '',
            // state.VModelSidebarPopArticleTypeData = 'web',

            state.sidebarPopShow = bool
        },
        setSidebarPopSelectId (state, id) {
            state.sidebarPopSelectId = id
        },
        requestSidebarPopContent (state, id) {
            state.sidebarPopData = {'id': '', 'content': ['loading']}
            let qs = require('qs')
            let token = window.localStorage.getItem('token')
            let name = window.localStorage.getItem('name')
            let obj = {
                'id': id,
                'token': token,
                'name': name
            }
            if (id == 'num1') {
                state.sidebarPopData.id = 'num1'
                state.sidebarPopData = Object.assign({}, state.sidebarPopData)
                return false
            }
            axios.post(reqUrl + 'getSidebarPopContent/', qs.stringify(obj)).then((res)=> {
                state.sidebarPopData = res.data
                state.sidebarPopData = Object.assign({}, state.sidebarPopData)
            })
        },
        setSidebarPopEditPassword (state) {
            axios.post(reqUrl + 'setSidebarPopEditPasswordCheck/').then((res)=> {
                return false
            })
        },
        checkSidebarPopEditPassword (state, dat) {
            var params = new URLSearchParams()
            params.append('pwd', dat)
            params.append('token', localStorage.token)
            axios.post(reqUrl + 'getSidebarPopEditPasswordCheck/', params).then((res)=> {
                if (res.data.data == 'true') {
                    state.sidebarPopEditPasswordCheck = false
                } else if (res.data.data == 'false') {
                    state.sidebarPopEditPasswordCheck = true
                }
            })
        },
        setSidebarPoptitle (state, dat) {
            state.sidebarPoptitle = dat
        },
        sidebarPopEditPasswordTrue (state) {
            state.sidebarPopEditPasswordCheck = true
        },
        setSidebarPopPwdInputData (state, dat) {
            state.sidebarPopPwdInputData = dat
        },
        clearSidebarPopPwdInputData (state) {
            state.sidebarPopPwdInputData = ''
        },
        // edit
        addDataSidebarPopEditArticle (state, dat) {
            state.VModelSidebarPopArticleInputData = dat.h1
            state.VModelSidebarPopArticleTextareaData = dat.content
            state.VModelSidebarPopArticleIconLabelData = dat.img
            state.VModelSidebarPopArticleTypeData = dat.type
        },
        // edit id
        set_windowEdit_id (state, id) {
            state.windowEdit_id = id
        },
        // sidebarPop vmodel new article input
        VModelSidebarPopArticleInputData (state, dat) {
            state.VModelSidebarPopArticleInputData = dat
        },
        // sidebarPop vmodel new article textarea
        VModelSidebarPopArticleTextareaData (state, dat) {
            state.VModelSidebarPopArticleTextareaData = dat
        },
        // sidebarPop vmodel new article type
        VModelSidebarPopArticleTypeData (state, dat) {
            state.VModelSidebarPopArticleTypeData = dat
        },
        // sidebarPop vmodel new article iconlabel
        VModelSidebarPopArticleIconLabelData (state, dat) {
            state.VModelSidebarPopArticleIconLabelData = dat
        },
        // create
        submitNewArticle (state, dat) {
                state.resultForNewArticle = dat
        },
        // close notifyPop
        closeNotifyPop (state) {
            state.notifyPopShow = false
        },
        // notifyPop true
        showNotifyPop (state) {
            if (timer) {
                clearTimeout(timer)
            }
            state.notifyPopShow = true
            timer = setTimeout(()=>{state.notifyPopShow = false}, 9000)
        },
        // notifyPop data
        setNotifyPopData (state, dat) {
            state.notifyPopData = dat
        },
        // change desktop layout
        changeDesktopLayout (state, type) {
            state.setDesktopLayout = type
        },
        // sidebarPop history delete
        sidebarPopHistoryDelete (state, obj) {

        },
        // socket sysMonitor
        createSysMonitorWebSocket (state) {
            // console.log('socket running...')
        },
        // weather
        getWeather (state, dat) {
            state.weather = dat
        },
        // request search
        request_search (state, dat) {
            state.desktopIconList = dat.dat
        },
        // upload
        sureUploadFile (state, dat) {

        },
        // file list
        fileList (state, dat) {
            let qs = require('qs')
            axios.post(reqUrl + "getImgList/", qs.stringify(dat)).then((res) => {
                if (res.data) {
                    let dat = res.data.res.list
                    let tmpArr = []
                    for (var i in dat) {
                        tmpArr.push(reqUrl.slice(0,reqUrl.length-1) + dat[i])
                    }
                    state.fileList.url = tmpArr
                }
            })
        },
        change_file_update_state (state, dat) {
          // bool
          state.file_update_state = dat
        },
        // 改变预览框状态
        change_viewPopShow_state (state, dat) {
          // bool
          state.viewPopShow_state = dat
        },
        change_monitor_content (state, dat) {
          let qs = require('qs')
            axios.get(reqUrl + 'getMonitor/',qs.stringify(dat)).then((res)=> {
                state.monitor_content = res.data.res.content
            })
        }
    },
    actions: {
        // check login
        checkLoginState (context, dat) {
            let qs = require('qs')
            axios.post(reqUrl + 'checkLogin/',qs.stringify(dat)).then((res)=> {
                if (res.data.res == 'pass') {
                    context.commit('checkLoginState', true)
                } else {
                    context.commit('checkLoginState', false)
                }
            })
        },
        // login
        login (context, dat) {
            let qs = require('qs')
            axios.post(reqUrl + '/api/login/',qs.stringify(dat)).then((res)=> {
                if (res.data.res.state == 'ok') {
                    window.localStorage.setItem('token', res.data.res.token)
                    window.localStorage.setItem('name', res.data.res.name)
                    context.commit('checkLoginState', true)
                    context.commit('requestDesktopIconList')
                    let info = {
                        author: window.localStorage.getItem('name'),
                        token: window.localStorage.getItem('token')
                    }
                    context.commit('fileList', info)
                } else {
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'name && pwd err')
                    context.commit('checkLoginState', false)
                }
            })
        },
        addWindow (context,obj) {
            context.commit('addWindow',obj)
        },
        requestWindowContent (context,id) {
            context.commit('requestWindowContent',id)
        },
        deleteWindow (context,id) {
            context.commit('deleteWindow',id)
        },
        deleteAllWindow (context) {
            context.commit('deleteAllWindow')
        },
        // sidebarPop show
        toggleSidebarPop (context, bool) {
            context.commit('toggleSidebarPop', bool)
        },
        setSidebarPoptitle (context, dat) {
            context.commit('setSidebarPoptitle', dat)
        },
        setSidebarPopSelectId (context, id) {
            context.commit('setSidebarPopSelectId', id)
        },
        requestSidebarPopContent (context, id) {
            context.commit('requestSidebarPopContent', id)
        },
        setSidebarPopEditPassword (context) {
            context.commit('setSidebarPopEditPassword')
        },
        checkSidebarPopEditPassword (context, dat) {
            context.commit('checkSidebarPopEditPassword', dat)
        },
        sidebarPopEditPasswordTrue (context) {
            context.commit('sidebarPopEditPasswordTrue')
        },
        // edit
        addDataSidebarPopEditArticle (context, dat) {
            context.commit('addDataSidebarPopEditArticle', dat)
            context.commit('set_windowEdit_id', dat.id)
        },
        // edit id
        set_windowEdit_id (context, id) {
            context.commit('set_windowEdit_id', id)
        },
        closeNotifyPop (context) {
            context.commit('closeNotifyPop')
        },
        showNotifyPop (context) {
            context.commit('showNotifyPop')
        },
        setNotifyPopData (context, dat) {
            context.commit('setNotifyPopData', dat)
        },
        // new
        submitNewArticle (context, dat) {
            let qs = require('qs')
            let token = window.localStorage.getItem('token')
            let name = window.localStorage.getItem('name')
            dat['token'] = token
            dat['name'] = name
            if (dat.id != '' || dat.id) {
                axios.post(reqUrl + 'getSubmitEditArticle/', qs.stringify(dat)).then((res)=> {
                    context.commit('submitNewArticle', res.data.res)
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'success')
                    context.commit('requestDesktopIconList')
                    context.commit('toggleSidebarPop', false)
                    // context.commit('requestNotifyNumber')
                })
            } else if (dat.id == '') {
                axios.post(reqUrl + 'getSubmitNewArticle/', qs.stringify(dat)).then((res)=> {
                    context.commit('submitNewArticle', res.data.res)
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'success')
                    context.commit('requestDesktopIconList')
                    context.commit('toggleSidebarPop', false)
                    // context.commit('requestNotifyNumber')
                })
            }
        },
        // change desktop layout
        changeDesktopLayout (context, type) {
            context.commit('changeDesktopLayout', type)
        },
        // sidebarPop history delete
        // delete
        sidebarPopHistoryDelete (context, obj) {
            var params = new URLSearchParams()
            let token = window.localStorage.getItem('token')
            let name = window.localStorage.getItem('name')
            params.append('id', obj.id)
            params.append('type', obj.type)
            params.append('token', token)
            params.append('name', name)
            axios.post(reqUrl + 'getDeleteSidebarPopHistory/', params).then((res)=> {
                context.commit('sidebarPopHistoryDelete', obj.id)
                context.commit('showNotifyPop')
                context.commit('setNotifyPopData', 'success')
                context.commit('setSidebarPopSelectId', 'num0')
                context.commit('requestSidebarPopContent', 'num0')
                context.commit('requestDesktopIconList')
                context.commit('fileList', {author:  window.localStorage.getItem('name'), token:  window.localStorage.getItem('token')})
                // context.commit('requestNotifyNumber')
            })
        },
        getWeather (context, dat) {
            axios.post(reqUrl + 'getWeather/').then((res)=> {
                let dat = res.data.res
                context.commit('getWeather', dat)
            })
        },
        // socket
        createSysMonitorWebSocket (context) {
            let socket = new WebSocket(socketUrl + 'socket_getSysMoniter/')

            function fun_onopen () {
                socket.send('hasLink')
            }
            function fun_onmessage (act) {
                if (socket.readyState == WebSocket.OPEN) {
                    let dat = act.data
                    alert(dat)
                }
            }
            function fun_onclose () {
                onopen()
            }
            function fun_onerror (err) {
                // console.log('websocket Err-->', err)
            }
            window.onbeforeunload = function () {
               socket.close()
            }
            socket.onopen = fun_onopen
            socket.onmessage = fun_onmessage
            socket.onclose = fun_onclose
            socket.onerror = fun_onerror
            context.commit('createSysMonitorWebSocket')
        },
        // search resutl
        request_search (context, dat) {
            let qs = require('qs')
            let obj = {
                'dat': dat.input,
                'type': dat.type,
                'name': window.localStorage.getItem('name'),
                'token': window.localStorage.getItem('token')
            }
            axios.post(reqUrl + 'searchArticle/', qs.stringify(obj)).then((res)=> {
                if (res.data.res != 'notin') {
                    obj = {
                        dat: res.data
                    }
                    context.commit('request_search', obj)
                } else {
                    context.commit('requestDesktopIconList')
                }
            })
        },
        // upload
        sureUploadFile (context, dat) {
            let uploadData = new FormData()
            uploadData.append("upFile", dat.selectedFile)
            uploadData.append("name", dat.name)
            uploadData.append("author", dat.author)
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            context.commit('showNotifyPop')
            context.commit('setNotifyPopData', 'doing')
            axios.post(reqUrl + "uploadFile/", uploadData, headers).then((res) => {
                // console.log(res)
                if (res.data.res.state == "ok") {
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'success')
                    // let obj = {
                    //     base64: res.base64
                    // }
                    context.commit('fileList', {author:  window.localStorage.getItem('name'), token:  window.localStorage.getItem('token')})
                    // 改变上传状态
                } else if (res.data.res.state == "exist") {
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'fileName is exist')
                } else {
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'faild')
                }
                context.commit('change_file_update_state', true)
            })
        },
        // show file list
        fileList (context, dat) {
                    context.commit('fileList', dat)
        },
        // 设置文件上传状态
        set_file_update_state (context, dat) {
          context.commit('change_file_update_state', dat)
        },
        // 设置预览框状态
        set_viewPopShow_state (context, dat) {
          context.commit('change_viewPopShow_state', dat)
        },
        // 设置 monitor 内容
        set_monitor_content (context, dat) {
          context.commit('change_monitor_content', dat)
        }
    }
})
