// 配置文件
const { TOKEN_SECRET } = require('../../../config')

module.exports = function (obj) {
    const app = obj.app
    const router = obj.router
    const mongodb_model_user = obj.mongodb_model_user

    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , authorization');
        res.header('Access-Control-Allow-Credentials', true)
        next()
    })
    app.use('/', router)

    // 路由
    // 登录 检查 注册 => 第二个参数为mongodb模型 第三个参数为中间件
    new (require('./routes/login'))(router, mongodb_model_user).login()           // /api/login
    new (require('./routes/login'))(router, mongodb_model_user, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).checkLogin()      // /api/checklogin
    new (require('./routes/login'))(router, mongodb_model_user).register()        // /api/register
    new (require('./routes/login'))(router, mongodb_model_user, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).profile()         // /api/profile
}