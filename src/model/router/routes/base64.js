// base64

const Base64 = require('../../functions/base64Transform/base64Transform.js')

module.exports = class {
    constructor (router, mongodb_model_article, mongodb_model_files, middleWare) {
        this.router                = router
        this.mongodb_model_article = mongodb_model_article
        this.mongodb_model_files   = mongodb_model_files
        this.middleWare            = middleWare ? middleWare : null
    }

    // 文本转base64
    textToBase64() {
        let self = this
        self.router.post('/api/base64/textToBase64', function (req, res) {
            // 转换
            const ret_data = new Base64({'data': String(req.body.data)}).textToBase64()
            // 返回
            res.json({ 'stat': 1, 'msg':  '', 'data': ret_data })
        })
    }

    // base64转文本
    // 文本转base64
    base64ToText() {
        let self = this
        self.router.post('/api/base64/base64ToText', function (req, res) {
            // 转换
            const ret_data = new Base64({'data': String(req.body.data)}).base64ToText()
            // 返回
            res.json({ 'stat': 1, 'msg':  '', 'data': ret_data })
        })
    }
}