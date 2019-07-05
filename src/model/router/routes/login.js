const { Mongodb_model_user } = require('../../../db/mongodb/mongodb')

module.exports = class {
    constructor (router) {
        this.router = router
    }
    login() {
        console.log('login')
        this.router.post('/api/login', function (req, res) {
            console.log('req body =>', req.body, 'req query =>', req.query)
            // Mongodb_model_user().find({
            //     // username: req.body.username,
            // }).then((v) => {

            // }).catch((err) => {

            // })
            res.json({
                'stat': 1,
                'data': 'dfaf'
            })
        })
    }
    checkLogin() {

    }
    register() {

    }
}