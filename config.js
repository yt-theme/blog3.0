const path = require('path')

module.exports = {
    // 服务器端口
    SERVER_PORT: 14499,
    // 上传文件到此文件夹
    UPLOAD_DIR: path.join(__dirname, './upload'),

    // mongodb
    MONGODB: {
        URL: '0.0.0.0',
        PORT: 27017,
        DBNAME: 'blog'
    }
}