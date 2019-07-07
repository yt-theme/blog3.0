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
        }
    }).catch((err) => {
        console.log('login err =>', err)
    })
}
// 检查登录
export const checkLoginState = (state, dat) => {
    // 如果直接设置登录状态为 true 则进行检查
    if (dat === true) {

        axios.post(reqUrl + '/api/checkLogin', qs.stringify(dat)).then((res) => {
            console.log('checkLogin =>', res.data)
            if (res.data.stat === 1) {
                state.loginStat = true
            } else {
                state.loginStat = false
            }
        }).catch((err) => {
            console.log('checkLoginState err =>', err)
            state.loginStat = false
        })

    // 如果直接设置登录状态为 false 则直接为 false
    } else {
        state.loginStat = false
        // 清空 token
        window.localStorage.setItem('token', '')
    }
}

// -------------------------------------------------