const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // 标题
        label:         { type: String },
        // 作者
        author:        { type: String },
        // 创建日期
        create_date:   { type: String },
        // 修改日期
        edit_date:     { type: String },
        // 文件列表
        file_list: [{
            // 文件名
            file_name: { type: String },
            // 文件相对路径
            file_url:  { type: String },
            // 文件大小
            file_size: { type: String },
            // 文件所有者
            file_auth: { type: String }
        }]
    })
}