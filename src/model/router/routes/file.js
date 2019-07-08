const multer = require('multer')
const uuid   = require('uuid')

const { UPLOAD_DIR } = require('../../../../config')

// form-data 上传文件
const multerStorage = multer.diskStorage({
    // 储存路径
    destination(req, res, cb) {
        cb(null, UPLOAD_DIR + '/' + (new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()))
    },
    // 文件名
    filename (req, res, cb) {
        cb(null, uuid.v1())
    }
})
const multerUploadMiddleware = multer({ 'storage': multerStorage })

module.exports = class {
    constructor (router, mongodb_model, middleWare) {
        this.router        = router
        this.mongodb_model = mongodb_model
        this.middleWare    = middleWare ? middleWare : null
    }
    // 检查是否为重复文件名
    _checkIsRepeat () {

    }
    // 按用户id创建文章
    upload () {
        let self = this
        self.router.post('/api/file/upload', self.middleWare, multerUploadMiddleware.any(), function (req, res) {
            const user_info = req.analyz_profile
            if (user_info['analyz_stat'] === 1) {
                console.log('file =================>', req.files)
            } else {
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
        })
    }
}