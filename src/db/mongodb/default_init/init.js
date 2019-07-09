// 单独运行后 默认数据加入数据库
const { Mongodb_model_proposeWebsite } = require('../mongodb')
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