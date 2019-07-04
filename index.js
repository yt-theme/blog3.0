const express = require('express')
const router  = express.Router()
const io      = require('socket.io')
const jwt     = require('jsonwebtoken')

// model 包含路由
const server_model = require('./src/model/model').Server_router
const socket_model = require('./src/model/model').Socket_router

// 配置文件
const { SERVER_PORT } = require('./config')

class Server {
    constructor () {
        this.express = express
        this.router  = router
        this.app     = this.express()

        // 配置服务器
        this._config()
        
        // 服务器
        this.http_server   = require('http').createServer(this.app)
        this.socekt_server = io(this.http_server)

        // 初始化
        this._init()
    }
    _config () {

    }
    _init () {
        // model
        // http server
        server_model(this.app, this.router)
        // sockt server
        socket_model(this.socekt_server)

    }
    start () {
        this.http_server.listen(SERVER_PORT, function () {
            console.log('server start =>', SERVER_PORT)
        })
    }
}

new Server().start()