module.exports = class {
    constructor (router, mongodb_model) {
        this.router        = router
        this.mongodb_model = mongodb_model
    }
    query () {
        let self = this
        self.router.post('/api/public/proposeWebsite', function (req, res) {
            // 从 mongodb 检索
            self.mongodb_model.find({}).then((v) => {
                res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
            }).catch((err) => {
                res.json({ 'stat': 0, 'msg':  '数据库存储文件失败', 'data': err })
            })

        })
    }
}