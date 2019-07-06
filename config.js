const path = require('path')
const fs   = require('fs')

module.exports = {
    // 服务器端口
    SERVER_PORT: 14499,
    // 上传文件到此文件夹
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