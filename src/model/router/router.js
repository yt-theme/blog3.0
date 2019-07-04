const { Login } = require('./routes/login')

module.exports = function (app, router) {
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Credentials', true)
        next()
    })
    app.use('/', router)

    // 路由
    // 登录 检查 注册
    new Login(router).login()
    new Login(router).check()
    new Login(router).register()
}