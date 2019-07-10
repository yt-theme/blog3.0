// 临时存储文件表
const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // 文件名
        file_name:        { type: String },
        // 文件上传时间
        file_uploadDate:  { type: String }         ,
        // 文件存储名
        file_storageName: { type: String },
        // 文件大小
        file_size:        { type: Number },
        // 文件类型
        file_type:        { type: String },
        // 文件相对路径
        file_url:         { type: String },
        // 文件所属(上传)者 id
        user_id:          { type: String }
    })
}