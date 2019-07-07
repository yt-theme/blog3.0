// api相关 -------------------------------------------------------------

// 登录
export const login = ({commit}, dat) => { commit('login', { 'dat': dat, 'commit': commit }) }
// 检查登录
export const checkLoginState = ({commit}, dat) => { commit('checkLoginState', dat) }

// --------------------------------------------------------------------