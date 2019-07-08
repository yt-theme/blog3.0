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
            console.log('查询文章 =======================================>')
            // 用户数据
            const user_info = req.analyz_profile
            if (user_info['analyz_stat'] === 1) {
                // 查询数据库
                self.mongodb_model.find({
                    'user_id': user_info['analyz_profile']['_id'],
                }).then((v) => {
                    console.log('查找出用户文章all =>', v)
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '无此用户' })
                })
            } else {
                res.json({ 'stat': 0, 'msg':  '用户验证失败' })
            }
            
                
        })
    }
    // 按文章id查询文章内容
    queryContentById () {
        let self = this
    }
    // 按label搜索文章
    searchByLabel () {
        let self = this
    }
    // 按文章id编辑文章
    editById () {

    }
    // 按文章id删除文章
    deleteById () {

    }
    // 按用户id创建文章
    createById () {
        let self = this
        self.router.post('/api/article/createById', self.middleWare, function (req, res) {
            const user_info = req.analyz_profile
            if (user_info['analyz_stat'] === 1) {
                const label       = req.body.label
                const author      = req.body.author
                const create_date = req.body.create_date
                const edit_date   = req.body.edit_date
                const file_list   = req.body.file_list
                self.mongodb_model.insertOne({
                    'label':       label,
                    'author':      author,
                    'create_date': create_date,
                    'edit_date':   edit_date,
                    'file_list':   file_list,
                    // file_list: [{
                    //     file_name: { type: String },
                    //     file_url:  { type: String },
                    //     file_size: { type: String },
                    //     file_auth: { type: String }
                    // }]
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