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
                Mongodb_model_user().findOne({
                    'username': req.body.username,
                }).then((v) => {
                    res.json({
                        'stat': 1,
                        'msg': 'ok',
                        'data': v['password']
                    })

                }).catch((err) => {
                    res.json({
                        'stat': 0,
                        'msg': err
                    })
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