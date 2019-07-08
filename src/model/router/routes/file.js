const multer = require('multer')
const uuid   = require('uuid')

const { UPLOAD_DIR_NAME, UPLOAD_DIR } = require('../../../../config')

// form-data 上传文件
const multerStorage = multer.diskStorage({
    // 储存路径
    destination: UPLOAD_DIR + '/' + (new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()),
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
    upload () {
        let self = this
        self.router.post('/api/file/upload', self.middleWare, multerUploadMiddleware.any(), function (req, res) {
            const analyz_stat    = req.analyz_stat
            const analyz_msg     = req.analyz_msg
            const analyz_profile = req.analyz_profile
            if (analyz_stat === 1) {
                // 保存文件对象
                const req_files = req.files
                if (req_files && req_files.length > 0) {
                    console.log('req_files', req_files)

                    // 转换数据 -------------------------

                    let tmp_file_arr = []
                    for (let i=0; i<req_files.length; i++) {
                        tmp_file_arr.push({
                            'file_name':        req_files[i]['originalname'],
                            'file_storageName': req_files[i]['filename'],
                            'file_size':        req_files[i]['size'],
                            'file_type':        req_files[i]['mimetype'],
                            'file_url':         `${UPLOAD_DIR_NAME}${req_files[i]['path'].split(UPLOAD_DIR_NAME).pop()}`,
                            'user_id':          analyz_profile['_id']
                        })
                    }

                    // ---------------------------------

                    // 将文件对象存入 mongodb
                    self.mongodb_model.insertMany(tmp_file_arr).then((v) => {
                        res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
                    }).catch((err) => {
                        res.json({ 'stat': 0, 'msg':  '数据库存储文件失败', 'data': err })
                    })

                }
            } else {
                res.json({ 'stat': 0, 'msg':  analyz_msg })
            }
        })
    }
}