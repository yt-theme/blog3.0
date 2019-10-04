// realNote 实时笔记
module.exports = class {
    constructor (router, mongodb_model_user, mongodb_model_realNote, middleWare) {
        this.router                 = router
        this.mongodb_model_user     = mongodb_model_user
        this.mongodb_model_realNote = mongodb_model_realNote
        this.middleWare             = middleWare ? middleWare : null
    }
    // 创建笔记
    create() {
        let self = this
        self.router.post('/api/realNote/create', self.middleWare, function (req, res) {

            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info._id
            // 请求字段
            const class_id      = String(req.body.class_id) || '' // 分类id为_id 如果不传id而且有分类名则认为新增分类
            const label         = String(req.body.label) || '' // 分类名
            const is_pub        = String(req.body.is_pub) || false     // 是否公开
            const content_type  = String(req.body.content_type) || ''    // 内容类型
            const content       = String(req.body.content) || ''    // 内容
            const create_date   = String(req.body.date) || '' // 创建时间
            const edit_date     = String(req.body.date) || '' // 修改时间

            if (analyz_stat === 1) {
                if (label) {
                    // 操作数据库
                    self.mongodb_model_realNote.updateOne(
                        // 查询条件
                        { _id: class_id },
                        // 更新数据
                        {   $set: {
                                // 分类名
                                label:         label,
                                // 是否公开
                                is_pub:        is_pub,
                                // 作者
                                author_id:     '',
                                // 创建日期
                                create_date:   create_date,
                                // 修改日期
                                edit_date:     edit_date,
                                // 内容类型 text || markdown
                                content_type:  content_type,
                                // 内容
                                content:       content
                            }
                        }
                    )
                    .then((v) => { res.json({ 'stat': 1, 'msg':  'ok', 'data': v }) })
                    .catch((err) => { res.json({ 'stat': 0, 'msg':  err }) })
                }
                // 如果class_name不存在则返回错误
                else { res.json({ 'stat': 0, 'msg':  '参数错误' }) }
            } else { res.json({ 'stat': 0, 'msg':  '用户验证失败' }) }
        })
    }
    // 编辑笔记
    edit() {
        let self = this
        self.router.post('/api/article/queryAllById', self.middleWare, function (req, res) {

            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info._id
            // 请求字段
            const class_id      = String(req.body.class_id) || '' // 分类id为_id 如果不传id而且有分类名则认为新增分类
            const label         = String(req.body.label) || '' // 分类名
            const is_pub        = String(req.body.is_pub) || false     // 是否公开
            const content_type  = String(req.body.content_type) || ''    // 内容类型
            const content       = String(req.body.content) || ''    // 内容
            const create_date   = String(req.body.date) || '' // 创建时间
            const edit_date     = String(req.body.date) || '' // 修改时间

            if (analyz_stat === 1) {

                // 如果有class_id则认为是修改当前分类内容
                if (class_id) {
                    // 操作数据库
                    self.mongodb_model_realNote.updateOne(
                        // 查询条件
                        { _id: class_id },
                        // 更新数据
                        {   $set: {
                                // 分类名
                                // label:         label,
                                // 是否公开
                                is_pub:        is_pub,
                                // 作者
                                // author_id:     '',
                                // 创建日期
                                // create_date:   create_date,
                                // 修改日期
                                edit_date:     edit_date,
                                // 内容类型 text || markdown
                                content_type:  content_type,
                                // 内容
                                content:       content
                            }
                        }
                    )
                    .then((v) => { res.json({ 'stat': 1, 'msg':  'ok', 'data': v }) })
                    .catch((err) => { res.json({ 'stat': 0, 'msg':  err }) })
                }
                // 如果class_id不存在则返回错误
                else { res.json({ 'stat': 0, 'msg':  '参数错误' }) }
            } else { res.json({ 'stat': 0, 'msg':  '用户验证失败' }) }
        })
    }
}