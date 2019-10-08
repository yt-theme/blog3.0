// 实时笔记

const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // class_id
        // _id
        // 分类名
        label:         { type: String },
        // 是否公开 0否 1是
        is_pub:        { type: Number },
        // 作者
        author_id:     { type: String },
        // 创建日期
        create_date:   { type: String },
        // 修改日期
        edit_date:     { type: String },
        // 内容类型 text || markdown
        content_type:  { type: String },
        // 内容
        content:       { type: String },
    })
}