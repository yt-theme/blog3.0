const express    = require('express')
const router     = express.Router()
const io         = require('socket.io')
const bodyParser = require('body-parser')

// model 包含路由
const server_model = require('./src/model/router/router')
// const socket_model = require('./src/model/model').Socket_router

// mongodb 模型
// 用户
const mongodb_model_user = require('./src/db/mongodb/mongodb').Mongodb_model_user()
// 文章
const mongodb_model_article = require('./src/db/mongodb/mongodb').Mongodb_model_article()
// 文件
const mongodb_model_files = require('./src/db/mongodb/mongodb').Mongodb_model_files()
// 建议网址
const mongodb_model_proposeWebsite = require('./src/db/mongodb/mongodb').Mongodb_model_proposeWebsite()

// 配置文件
const { SERVER_PORT, HTML_STATIC_DIR, INDEX_HTML_STATIC, UPLOAD_DIR } = require('./config')

class Server {
    constructor () {
        this.express = express
        this.router  = router
        this.app     = this.express()
        this.upload  = ''

        // 配置服务器
        this._config()
        
        // 服务器
        this.http_server   = require('http').createServer(this.app)
        this.socket_server = io(this.http_server)

        // 初始化
        this._init()
    }
    _config () {
        // express 解析 params
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // 静态文件目录
        this.app.use(this.express.static(HTML_STATIC_DIR))
        // index.html 位置
        this.app.use('/index', this.express.static(INDEX_HTML_STATIC))
    }
    _init () {
        const app    = this.app
        const router = this.router
        // model
        // http server
        server_model({ app, router,
            // mongodb 模型
            mongodb_model_user,           // user 表
            mongodb_model_article,        // article 表
            mongodb_model_files,          // files 表
            mongodb_model_proposeWebsite, // proposeWebsite 表
        })
        // sockt server
        // socket_model(socket_server)

    }
    start () {
        this.http_server.listen(SERVER_PORT, function () {
            console.log('server start =>', SERVER_PORT)
        })
    }
}

new Server().start()