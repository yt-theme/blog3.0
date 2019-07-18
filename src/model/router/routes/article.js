const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

const { TOKEN_SECRET } = require('../../../../config')

module.exports = class {
    constructor (router, mongodb_model, middleWare) {
        this.router        = router
        this.mongodb_model = mongodb_model
        this.middleWare    = middleWare ? middleWare : null
    }
    // 查询当前用户所有文章
    queryAllById() {
        let self = this
        self.router.post('/api/article/queryAllById', self.middleWare, function (req, res) {

            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile

            if (analyz_stat === 1) {
                // 查询数据库
                self.mongodb_model.find(
                    // 查询条件
                    { 'author_id': user_info['_id'], },
                    // 查询字段
                    '_id h1 label author_id create_date'
                )
                .then((v)    => { res.json({ 'stat': 1, 'msg':  'ok', 'data': v }) })
                .catch((err) => { res.json({ 'stat': 0, 'msg':  err }) })
            } else { 
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
        })
    }
    // 按页码查询当前用户所有文章
    queryPageById () {
        let self = this
        self.router.post('/api/article/queryPageById', self.middleWare, function (req, res) {
            const analyz_stat = req.analyz_stat
            if (analyz_stat === 1) {
                
            }
        })
    }
    // 按文章id查询文章内容
    queryContentById () {
        let self = this
        self.router.post('/api/article/queryContentById', self.middleWare, function (req, res) {
            
            const analyz_stat = req.analyz_stat
            const article_id  = req.body.article_id || ''
            
            if (analyz_stat === 1) {
                self.mongodb_model.findOne({
                    '_id': article_id ,
                }).then((v) => {
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  err })
                })
            }
        })
    }
    // 按label搜索文章
    searchByLabel () {
        let self = this
    }
    // 按文章id编辑文章
    editById () {
        let self = this
        self.router.post('/api/article/editById', self.middleWare, function (req, res) {
            
            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile

            if (analyz_stat === 1) {
                const author_id   = user_info._id
                const article_id  = req.body.id
                const contentType = req.body.contentType
                const h1          = req.body.h1
                const content     = req.body.content
                const label       = req.body.label
                // const create_date = req.body.date
                const edit_date   = req.body.date
                const file_list   = JSON.parse(req.body.files)

                // 处理文件列表只保留需要内容
                let tmp_file_list = []
                for (let i=0; i<file_list.length; i++) {
                    tmp_file_list.push({
                        'file_name':        String(file_list[i]['file_name']       ) || '',
                        'file_url':         String(file_list[i]['file_url']        ) || '',
                        'file_size':        String(file_list[i]['file_size']       ) || '',
                        'file_auth':        String(file_list[i]['file_size']       ) || '',
                        'file_id':          String(file_list[i]['user_id']         ) || '',
                        'file_uploadDate':  String(file_list[i]['file_uploadDate'] ) || '',
                        'file_storageName': String(file_list[i]['file_storageName']) || '',
                        'file_type':        String(file_list[i]['file_type']       ) || '',
                        'file_path':        String(file_list[i]['file_path']       ) || '',
                    })
                }
                    
                self.mongodb_model.updateOne({
                    "_id": article_id
                }, { $set: {
                        'content_type': String(contentType),
                        'h1':           String(h1),
                        'content':      String(content),
                        'label':        String(label),
                        'author_id':    String(author_id),
                        // 'create_date':  String(create_date),
                        'edit_date':    String(edit_date),
                        'file_list':    tmp_file_list || '',
                    }
                }).then((v) => {
                    console.log('edit ------------------ =>', req.body, v)
                    // 返回
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    stat=0;  data=err;  msg = (err.code === 11000 ? '用户已被注册' : '')
                    // 返回
                    res.json({ 'stat': stat, 'msg': msg, 'data':  data, })
                })

            } else {
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
        })
    }
    // 按文章id删除文章
    deleteById () {

    }
    // 按用户id创建文章
    createById () {
        let self = this
        self.router.post('/api/article/createById', self.middleWare, function (req, res) {
            
            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile

            if (analyz_stat === 1) {
                const author_id   = user_info._id
                const contentType = req.body.contentType
                const h1          = req.body.h1
                const content     = req.body.content
                const label       = req.body.label
                const create_date = req.body.date
                const edit_date   = req.body.date
                const file_list   = JSON.parse(req.body.files)

                // 'contentType': this.$store.state.VModelSidebarPopArticleTypeData,
                // 'h1': this.$store.state.VModelSidebarPopArticleInputData,
                // 'label': this.$store.state.VModelSidebarPopArticleIconLabelData,
                // 'content': this.$store.state.VModelSidebarPopArticleTextareaData,
                // 'date': Y + '-' + M + '-' + D + ' week ' + week + ' ' + h + ':' + m + ':' + s,
                // 'files': this.$store.state.uploadFileAll_list

                // 处理文件列表只保留需要内容
                let tmp_file_list = []
                for (let i=0; i<file_list.length; i++) {
                    tmp_file_list.push({
                        'file_name':        String(file_list[i]['file_name']       ) || '',
                        'file_url':         String(file_list[i]['file_url']        ) || '',
                        'file_size':        String(file_list[i]['file_size']       ) || '',
                        'file_auth':        String(file_list[i]['file_size']       ) || '',
                        'file_id':          String(file_list[i]['user_id']         ) || '',
                        'file_uploadDate':  String(file_list[i]['file_uploadDate'] ) || '',
                        'file_storageName': String(file_list[i]['file_storageName']) || '',
                        'file_type':        String(file_list[i]['file_type']       ) || '',
                        'file_path':        String(file_list[i]['file_path']       ) || '',
                    })
                }
                    
                self.mongodb_model.insertOne({
                    'content_type': String(contentType),
                    'h1':           String(h1),
                    'content':      String(content),
                    'label':        String(label),
                    'author_id':    String(author_id),
                    'create_date':  String(create_date),
                    'edit_date':    String(edit_date),
                    'file_list':    tmp_file_list || '',
                }).then((v) => {
                    // 返回
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    stat=0;  data=err;  msg = (err.code === 11000 ? '用户已被注册' : '')
                    // 返回
                    res.json({ 'stat': stat, 'msg': msg, 'data':  data, })
                })

            } else {
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
        })
    }
}