// 加密用
const bcrypt = require('bcrypt')
// 单独运行后 默认数据加入数据库
const { Mongodb_model_proposeWebsite, Mongodb_model_user } = require('../mongodb')
// -----------------------------------------------

// 建议网址
Mongodb_model_proposeWebsite().insertMany([
    {
        'url': 'https://www.baidu.com',
        'label': 'Baidu'
    },
    {
        'url': 'https://www.github.com',
        'label': 'Github'
    }
]).then((v) => {
    console.log('mongodb init ========================>', v)
}).catch((err) => {
    console.log('mongodb init err ====================>', v)
})
// -----------------------------------------------

// 默认用户
Mongodb_model_user().insertOne({
    'username': 'a',
    'password': bcrypt.hashSync('a', 10),
    'edit_password': bcrypt.hashSync('a', 10)
}).then((v) => {
    console.log('user added =>', v)
}).catch((err) => {
    console.log('err =>', err)
})