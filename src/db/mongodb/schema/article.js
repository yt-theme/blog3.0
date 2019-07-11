const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // 标签
        label:         { type: String },
        // 作者
        author_id:     { type: String },
        // 创建日期
        create_date:   { type: String },
        // 修改日期
        edit_date:     { type: String },
        // 内容类型 text || web
        content_type:  { type: String },
        // 标题
        h1:            { type: String },
        // 内容
        content:       { type: String },
        // 文件列表
        file_list: [{
            // 文件名
            file_name:        { type: String },
            // 文件相对路径
            file_url:         { type: String },
            // 文件大小
            file_size:        { type: String },
            // 文件所有者
            file_auth:        { type: String },
            // id
            file_id:          { type: String },
            // 上传时间
            file_uploadDate:  { type: String },
            // 文件存储名
            file_storageName: { type: String },
            // 文件类型
            file_type:        { type: String },
            // 文件绝对路径
            file_path:        { type: String },
        }]
    })
}