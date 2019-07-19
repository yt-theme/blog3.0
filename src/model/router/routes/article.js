// article
module.exports = class {
    constructor (router, mongodb_model_article, mongodb_model_files, middleWare) {
        this.router                = router
        this.mongodb_model_article = mongodb_model_article
        this.mongodb_model_files   = mongodb_model_files
        this.middleWare            = middleWare ? middleWare : null
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
                self.mongodb_model_article.find(
                    // 查询条件
                    { 'author_id': user_info['_id'], },
                    // 查询字段
                    '_id h1 label author_id create_date'
                )
                .then((v) => { res.json({ 'stat': 1, 'msg':  'ok', 'data': v }) })
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
                self.mongodb_model_article.findOne({
                    '_id': article_id ,
                }).then((v) => {
                    // ---------------------------------
                    let tmp_v = v
                    // 查询 files id 对应的file
                    self.mongodb_model_files.find({
                        'article_id': article_id
                    }).then((v1) => {
+                        console.log('v ------------ =>', v1)
                    }).catch((err1) => {

                    })
                    // ---------------------------------

                    res.json({ 'stat': 1, 'msg':  'ok', 'data': tmp_v })
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

                self.mongodb_model_article.updateOne({
                    "_id": article_id
                }, { $set: {
                        'content_type': String(contentType),
                        'h1':           String(h1),
                        'content':      String(content),
                        'label':        String(label),
                        'author_id':    String(author_id),
                        // 'create_date':  String(create_date),
                        'edit_date':    String(edit_date),
                        'file_list':    file_list,
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

                self.mongodb_model_article.insertOne({
                    'content_type': String(contentType),
                    'h1':           String(h1),
                    'content':      String(content),
                    'label':        String(label),
                    'author_id':    String(author_id),
                    'create_date':  String(create_date),
                    'edit_date':    String(edit_date),
                    'file_list':    file_list,
                }).then((v) => {
                    console.log('query v ------------------------------------------- =>', v)
                    // 将已上传文件的属性更改 article_id is_tmp

                    let promise_list = []

                    for (let i=0; i<file_list.length; i++) {
                        console.log(`file_list[i]['file_id'] ------------------- =>`, file_list[i]['file_id'])
                        promise_list.push(
                            () => {
                                return new Promise((resolve, reject) => {
                                    mongodb_model_files.updateOne({
                                            "_id": file_list[i]['file_id']
                                        }, { 
                                        $set: {
                                            article_id: v._id,
                                            is_tmp: false
                                        }
                                    }).then((v) => {
                                        resolve(v)
                                    }).catch((err) => {
                                        reject(err)
                                    })
                                })
                            }

                        )
                    }

                    Promise.all(promise_list).then((v) => {
                        // 返回
                        res.json({ 'stat': 1, 'msg':  'ok', 'data': v })

                    }).catch((err) => {
                        // 返回
                        res.json({ 'stat': 1, 'msg':  'err', 'data': err })
                    })
                }).catch((err) => {
                    const msg = (err.code === 11000 ? '用户已被注册' : '')
                    // 返回
                    res.json({ 'stat': 0, 'msg': msg, 'data':  err, })
                })

            } else {
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
        })
    }
}