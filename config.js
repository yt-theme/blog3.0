const path = require('path')
const fs   = require('fs')

module.exports = {
    // 通信协议
    PROTOCOL: 'http',
    // 服务器IP
    SERVER_IP: '192.168.0.105',
    // 服务器端口
    // SERVER_PORT: 14498,
    SERVER_PORT: 14499,
    // 静态文件目录 (只可存放vue项目网页以及依赖)
    HTML_STATIC_DIR: path.join(__dirname, './frontEnd/blog3Beta-master/dist/'),
    // index.html 路径
    INDEX_HTML_STATIC: path.join(__dirname, './frontEnd/blog3Beta-master/dist/index.html'),
    // 上传文件到此文件夹 UPLOAD_DIR_NAME 与 UPLOAD_DIR 对应
    UPLOAD_DIR_NAME: 'upload',
    UPLOAD_DIR: path.join(__dirname, './upload'),

    // 登录 token 密钥
    TOKEN_SECRET: fs.readFileSync(path.join(__dirname, './key/token_secret.key'), 'utf-8'),

    // mongodb
    MONGODB: {
        URL: '0.0.0.0',
        PORT: 27017,
        DBNAME: 'blog'
    }
}