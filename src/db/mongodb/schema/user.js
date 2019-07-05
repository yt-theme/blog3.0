const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // 用户名
        username: { type: String, required: true, unique: true },
        // 密码
        password: { type: String, required: true,
            // 密码加密存储
            set (val) {
                return bcrypt.hashSync(val, 10)
            }
        }
    })
}