const bcrypt = require('bcrypt')

const { Mongodb_model_user } = require('../../../db/mongodb/mongodb')

module.exports = class {
    constructor (router) {
        this.router = router
    }
    login() {
        this.router.post('/api/login', function (req, res) {
            console.log('req body =>', req.body, 'req query =>', req.query)
            // 如果不存在 username 字段或为 false
            if (!req.body.username) {  res.json({ 'stat': 0, 'msg': '无 username' }) }
            // 否则进行正常程序
            else {
                // 查询数据库
                Mongodb_model_user().findOne({
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
                    res.json({ 'stat': 0, 'msg':  err })
                    console.log('/api/login err =>', err)
                })
                
            }
        })
    }
    checkLogin() {

    }
    register() {

    }
}