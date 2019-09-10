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
            // 搜索字段
            const h1_search    = String(req.body.h1_search) || ''
            const label_search = req.body.label_search === 'All' ? '' : req.body.label_search

            if (analyz_stat === 1) {
                // 查询数据库
                self.mongodb_model_article.find(
                    // 查询条件
                    { 
                        'author_id': user_info['_id'],
                        $and: [
                            { $or: [ { 'h1': new RegExp(h1_search, 'i') } ] },
                            { $or: [ { 'label': new RegExp(label_search, 'i') } ] }
                        ]
                        
                    },
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
    // 按页码查询当前用户文章
    queryPageById () {
        let self = this
        self.router.post('/api/article/queryPageById', self.middleWare, function (req, res) {
            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            // 搜索字段
            const h1_search    = String(req.body.h1_search) || ''
            const label_search = req.body.label_search === 'All' ? '' : req.body.label_search
            const page         = Number(req.body.page)
            const size         = Number(req.body.size)

            console.log("para =>", page, size, h1_search, label_search)
            if (analyz_stat === 1) {
                // 查询数据库
                self.mongodb_model_article.findAsPage(
                    // 查询条件
                    { 
                        'author_id': user_info['_id'],
                        $and: [
                            { $or: [ { 'h1': new RegExp(h1_search, 'i') } ] },
                            { $or: [ { 'label': new RegExp(label_search, 'i') } ] }
                        ]
                        
                    },
                    // skip
                    (page - 1) * size,
                    // limit
                    size,
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

                    // 查询结果对象
                    let tmp_obj = {
                        '_id':          v['id'],
                        'content_type': v['content_type'],
                        'h1':           v['h1'],
                        'content':      v['content'],
                        'label':        v['label'],
                        'author_id':    v['author_id'],
                        'create_date':  v['create_date'],
                        'edit_date':    v['edit_date'],
                        'file_list':    []
                    }

                    // ---------------------------------
                    // 查询 files id 对应的file
                    self.mongodb_model_files.find({
                        'article_id': article_id
                    }).then((v1) => {
                        
                        tmp_obj['file_list'] = v1

                        console.log('v1 ------------ =>', v1)
                        res.json({ 'stat': 1, 'msg':  'ok', 'data': tmp_obj })
                    }).catch((err1) => {
                        res.json({ 'stat': 0, 'msg':  'err', 'data': err1 })
                    })
                    // ---------------------------------

                    
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
                    console.log('edit ------------------ =>', v, file_list)

                    // ---------------------------------------------

                    // / 将已上传文件的属性更改 article_id is_tmp
                    Promise.all(file_list.map((ite) => {
                        self.mongodb_model_files.updateOne(
                            {
                                "_id": ite['file_id']
                            },
                            { $set: {
                                article_id: article_id,
                                is_tmp: false
                            }}
                        )
                    })).then((v) => {
                        console.log('promise.all -------------- =>', v)
                        // 返回
                        res.json({ 'stat': 1, 'msg':  'ok', 'data': v })

                    }).catch((err) => {
                        // 返回
                        res.json({ 'stat': 1, 'msg':  '文件表处理失败', 'data': err })
                    })

                    // ---------------------------------------------
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
        let self = this
        self.router.post('/api/article/deleteById', self.middleWare, function (req, res) {
            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile

            if (analyz_stat === 1) {
                const author_id  = user_info._id
                const article_id = req.body.id

                self.mongodb_model_article.deleteOne({
                    "_id": article_id
                }).then((v) => {

                    // 将文章下文件变成临时文件
                    self.mongodb_model_files.updateMany(
                        {
                            "article_id": article_id
                        },
                        { $set: {
                            article_id: '',
                            is_tmp: true
                        }}
                    ).then((v1) => {
                        res.json({ 'stat': 1, 'msg': 'ok', 'data': v1 })

                    }).catch((err1) => {
                        res.json({ 'stat': 0, 'msg': err1 })
                    })

                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg': err })
                })

            } else {
                res.json({ 'stat': 0, 'msg': '用户验证失败' })
            }
        })
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

                    // 将已上传文件的属性更改 article_id is_tmp
                    Promise.all(file_list.map((ite) => {
                        self.mongodb_model_files.updateOne(
                            {
                                "_id": ite['file_id']
                            },
                            { $set: {
                                article_id: v._id,
                                is_tmp: false
                            }}
                        )
                    })).then((v) => {
                        // 返回
                        res.json({ 'stat': 1, 'msg':  'ok', 'data': v })

                    }).catch((err) => {
                        // 返回
                        res.json({ 'stat': 1, 'msg':  '文件表处理失败', 'data': err })
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