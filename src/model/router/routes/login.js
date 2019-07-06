const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

const { TOKEN_SECRET } = require('../../../../config')

module.exports = class {
    constructor (router, mongodb_model, middleWare) {
        this.router        = router
        this.mongodb_model = mongodb_model
        this.middleWare    = middleWare ? middleWare : null
    }
    login() {
        let self = this
        self.router.post('/api/login', function (req, res) {
            console.log('登录操作 =======================================>')
            console.log('req body =>', req.body, 'req query =>', req.query)
            // 如果不存在 username 字段或为 false
            if (!req.body.username) {  res.json({ 'stat': 0, 'msg': '无 username' }) }
            // 否则进行正常程序
            else {
                // 查询数据库
                self.mongodb_model.findOne({
                    'username': req.body.username,
                }).then((v) => {

                    const _id      = v['_id']
                    const password = v['password']
                    const username = v['username']

                    const req_password = req.body.password ? req.body.password : ''
                    const req_username = req.body.username ? req.body.username : ''

                    // 返回值存储
                    let stat=0,  msg='', token = ''

                    // 如果检索出有此用户名则验证密码
                    if (username === req_username) {
                        // 密码有效
                        if (req_password && bcrypt.compareSync(req_password, password)){
                            stat=1;  msg='ok'
                            // 设置 token
                            token = jwt.sign(
                                // 自定义 token 内容
                                {
                                    id: String(_id)
                                },
                                // 密钥
                                TOKEN_SECRET
                            )
                        // 密码无效
                        } else { stat=0;  msg='密码错误' }
                    // 无此用户名
                    } else { stat=0;  msg='无此用户' }

                    // 返回
                    res.json({ 'stat': stat, 'msg':  msg, 'token': token })

                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '无此用户' })
                    console.log('/api/login err =>', err)
                })
                
            }
        })
    }
    checkLogin() {

    }
    register() {
        let self = this
        self.router.post('/api/register', function (req, res) {
            console.log('注册操作 =======================================>')
            // 需要传两个参数 username password
            const req_password = req.body.password ? req.body.password : ''
            const req_username = req.body.username ? req.body.username : ''

            // 返回值存储
            let stat=0,  msg='', data = ''

            if (req_password && req_username) {

                // 注册 => mongodb user表
                self.mongodb_model.insertOne({
                    'password': req_password,
                    'username': req_username
                }).then((v) => {
                    stat=1;  msg='ok'
                    // 返回
                    res.json({ 'stat': stat, 'msg':  msg, })
                }).catch((err) => {
                    stat=0;  data=err;  msg = (err.code === 11000 ? '用户已被注册' : '')
                    // 返回
                    res.json({ 'stat': stat, 'msg': msg, 'data':  data, })
                })

            } else {
                res.json({ 'stat': 0, 'msg':  '请输入用户名和密码完成注册' })
            }
        })
    }
    // 获取用户信息
    profile () {
        let self = this
        self.router.post('/api/profile', self.middleWare, function (req, res) {
            
            res.json({
                'stat': req.analyz_stat,
                'msg': req.analyz_msg,
                'data': req.analyz_profile
            })
        })
    }
}