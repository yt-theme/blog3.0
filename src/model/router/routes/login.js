class Login {
    constructor (router) {
        this.router = router
    }
    login() {
        this.router.post('/api/login', function (req, res) {
            
        })
        console.log('login')
    }
    check() {

    }
    register() {

    }
}

module.exports = {
    Login
}