const jwt = require('jsonwebtoken')

module.exports = (req, res, next, mongodb_model_user, TOKEN_SECRET) => {
    // 获取请求头中 authorization 的 token 值
    const req_authorization = req.headers.authorization || ''
    // token 解析结果
    let tokenReal = null

    if (req_authorization) {
        // token 解密
        // 判断 token 解密是否成功
        try {
            tokenReal = jwt.verify(req_authorization, TOKEN_SECRET)
            console.log('tokenReal1 ==============>', tokenReal)
        } catch (err) {

            if (String(err.name) === 'JsonWebTokenError') {
                console.log('tokenReal ==============>', 'JsonWebTokenError')
                req.analyz_stat = 0
                req.analyz_msg = 'token解密失败'
                req.analyz_profile = null

                // 返回
                res.json({
                    'stat': req.analyz_stat,
                    'msg': req.analyz_msg,
                    'data': req.analyz_profile
                })

                return false
            }
        }
        // 从 mongodb 查找 此用户信息
        mongodb_model_user.findOne({
            '_id': tokenReal.id
        }).then((v) => {
            // 解密成功则
            req.analyz_stat = 1
            req.analyz_msg = 'ok'
            req.analyz_profile = v
            next()
        }).catch((err) => {
            // 解密失败则
            req.analyz_stat = 0
            req.analyz_msg = err
            req.analyz_profile = null
            
            // 返回
            res.json({
                'stat': req.analyz_stat,
                'msg': req.analyz_msg,
                'data': req.analyz_profile
            })

        })
    } else {
        req.analyz_stat = 0
        req.analyz_msg = '无authorization'
        req.analyz_profile = null

        // 返回
        res.json({
            'stat': req.analyz_stat,
            'msg': req.analyz_msg,
            'data': req.analyz_profile
        })


    }
}