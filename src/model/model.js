const router = require('./router/router')
const socket = require('./router/router')

module.exports = {
    // http路由
    Server_router: router,
    // socket
    Socket_router: socket
}