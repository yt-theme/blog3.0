const bcrypt = require('bcrypt')

const mongodb_model_user = require('../../../db/mongodb/mongodb').Mongodb_model_user()

module.exports = class {
    constructor (router) {
        this.router = router
    }
    login() {
        this.router.post('/api/login', function (req, res) {
            console.log('登录操作 =======================================>')
            console.log('req body =>', req.body, 'req query =>', req.query)
            // 如果不存在 username 字段或为 false
            if (!req.body.username) {  res.json({ 'stat': 0, 'msg': '无 username' }) }
            // 否则进行正常程序
            else {
                // 查询数据库
                mongodb_model_user.findOne({
                    'username': req.body.username,
                }).then((v) => {

                    const password = v['password']
                    const username = v['username']

                    const req_password = req.body.password ? req.body.password : ''
                    const req_username = req.body.username ? req.body.username : ''

                    // 返回值存储
                    let stat=0,  msg=''

                    // 如果检索出有此用户名则验证密码
                    if (username === req_username) {
                        // 密码有效
                        if (req_password && bcrypt.compareSync(req_password, password)){
                            stat=1;  msg='ok'
                        // 密码无效
                        } else { stat=0;  msg='密码错误' }
                    // 无此用户名
                    } else { stat=0;  msg='无此用户' }

                    // 返回
                    res.json({ 'stat': stat, 'msg':  msg, })

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
        this.router.post('/api/register', function (req, res) {
            console.log('注册操作 =======================================>')
            // 需要传两个参数 username password
            const req_password = req.body.password ? req.body.password : ''
            const req_username = req.body.username ? req.body.username : ''

            // 返回值存储
            let stat=0,  msg='', data = ''

            if (req_password && req_username) {

                // 注册 => mongodb user表
                mongodb_model_user.insertOne({
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
}