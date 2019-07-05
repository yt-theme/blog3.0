const mongoose = require('mongoose')

// mongodb model
const { Model } = require('./model/model')

// 配置文件
const { MONGODB } = require('../../../config')

mongoose.set('useCreateIndex', true);
mongoose.connect(
    `mongodb://${MONGODB.URL}:${MONGODB.PORT}/${MONGODB.DBNAME}`,
    {
        useNewUrlParser: true,
    },
    (err) => {
        if (err) {
            console.log("mongodb connect error =>", err)
            return false
        }
        console.log('mongodb connect success !!!')
    }
)

// 模型
module.exports = {
    // 用户表操作
    Mongodb_model_user: () => {
        return new Model({
            "mongoose":         mongoose,
            "schema":           require('./schema/user')(mongoose),
            "collection_name":  "User",
            "collection":       "user",
        })
    },
}