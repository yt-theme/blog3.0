// 配置文件
const { TOKEN_SECRET } = require('../../../config')

module.exports = function (obj) {
    const app = obj.app
    const router = obj.router
    const mongodb_model_user           = obj.mongodb_model_user
    const mongodb_model_article        = obj.mongodb_model_article
    const mongodb_model_files          = obj.mongodb_model_files
    const mongodb_model_proposeWebsite = obj.mongodb_model_proposeWebsite
    const mongodb_model_realNote       = obj.mongodb_model_realNote

    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , authorization')
        res.header('Access-Control-Allow-Credentials', true)
        next()
    })

    // 静态文件目录 upload 路由验证用户

    app.use('/', router)

    // ############################## 路由 ##############################
    // 登录 检查 注册 => 第二个参数为mongodb模型 第三个参数为中间件
    new (require('./routes/login'))(router, mongodb_model_user).login()           // /api/login
    new (require('./routes/login'))(router, mongodb_model_user, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).checkLogin()      // /api/checklogin
    new (require('./routes/login'))(router, mongodb_model_user, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).checkEditPwd()    // /api/check/editPwd
    new (require('./routes/login'))(router, mongodb_model_user).register()        // /api/register
    new (require('./routes/login'))(router, mongodb_model_user, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).profile()         // /api/profile

    // 文章 查询 编辑 建立 删除
    // 1. 查询当前用户 id 所有文章   api/article/queryAllById
    // 2. 按文章 id 查询文章内容     api/article/queryContentById
    // 3. 按文章 label 搜索文章     api/article/searchByLabel
    // 4. 按文章 id 编辑文章        api/article/editById
    // 5. 按文章 id 删除文章        api/article/deleteById
    // 6. 按用户 id 创建文章        api/article/createById
    // 7. 按分页查询文章            api/article/queryPageById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryAllById()     // api/article/queryAllById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryContentById() // api/article/queryContentById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).searchByLabel()    // api/article/searchByLabel
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).editById()         // api/article/editById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).deleteById()       // api/article/deleteById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).createById()       // api/article/createById
    new (require('./routes/article'))(router, mongodb_model_article, mongodb_model_files, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryPageById()    // api/article/queryPageById

    // 文件操作
    // 查詢所有臨時文件 api/file/queryTmpAll
    new (require('./routes/file'))(router, mongodb_model_files, mongodb_model_article, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryTmpAll() // api/file/queryTmpAll
    // 上传(批量) api/file/upload
    new (require('./routes/file'))(router, mongodb_model_files, mongodb_model_article, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).upload() // api/file/upload
    // 删除 api/file/delete     
    new (require('./routes/file'))(router, mongodb_model_files, mongodb_model_article, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).delete() // api/file/delete

    // 建议网址 api/public/proposeWebsite
    new (require('./routes/proposeWebsite'))(router, mongodb_model_proposeWebsite).query() // api/public/proposeWebsite

    // ############################# 在线工具 ###############################
    // base64
    // 文本转base64 api/base64/textToBase64
    new (require('./routes/base64'))(router, mongodb_model_files, mongodb_model_article, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).textToBase64() // api/base64/textToBase64
    // base64转文本 api/base64/base64ToText
    new (require('./routes/base64'))(router, mongodb_model_files, mongodb_model_article, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).base64ToText() // api/base64/base64ToText
    
    // 实时笔记
    // 创建笔记 api/realNote/create
    new (require('./routes/realNote'))(router, mongodb_model_user, mongodb_model_realNote, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).create() // api/realNote/create
    // 编辑笔记 api/realNote/edit
    new (require('./routes/realNote'))(router, mongodb_model_user, mongodb_model_realNote, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).edit() // api/realNote/edit
    // 查询笔记 类型列表 api/realNote/queryClassList
    new (require('./routes/realNote'))(router, mongodb_model_user, mongodb_model_realNote, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryClassList() // api/realNote/queryClassList
    // 查询笔记内容按class_id api/realNote/queryContentById
    new (require('./routes/realNote'))(router, mongodb_model_user, mongodb_model_realNote, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).queryContentById() // api/realNote/queryContentById
    // 删除笔记按class_id api/realNote/deleteById
    new (require('./routes/realNote'))(router, mongodb_model_user, mongodb_model_realNote, async (req, res, next) => { await require('../middleware/authTokenAnalyz')(req, res, next, mongodb_model_user, TOKEN_SECRET) }).deleteById() // api/realNote/deleteById
}