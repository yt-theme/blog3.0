<template>
    <div class="window_container">
        <Header></Header>
        <Body></Body>
        <LoginPop></LoginPop>
    </div>
</template>

<script>
import Header from './header/header'
import Body from './body/body'
import LoginPop from './Public/loginPop'
export default {
    components: {
        Header,
        Body,
        LoginPop
    },
    data () {
        return {

        }
    },
    mounted() {
        let storage = window.localStorage
        let checkName  = storage.key('token')
        let checkToken = storage.key('name')
        // console.log(checkName, checkToken)
        // storage.setItem('token', '123456789012')
        // storage.setItem('name', 'admin')
        let dat = {}
        if (checkName && checkToken) {
            dat = {
                token: storage.getItem('token'),
                name: storage.getItem('name'),
            }
        } else {
            dat = {
                token: '',
                name: ''
            }
        }
        this.$store.dispatch('checkLoginState', dat)
    }
}
</script>

<style>
.window_container {
    width: 100vw;
    min-width: 850px;
    height: 100vh;
    background: url('../assets/bgi.jpg') no-repeat;
    background-size: cover;
    overflow: hidden;
}
</style>
