<template>
  <div class="index">
    <Header></Header>
    <Body></Body>
    <LoginPop></LoginPop>
  </div>
</template>

<script>
import Header from './header/header'
import Body from './body/body'
import LoginPop from './public/loginPop/loginPop'
export default {
  components: {
    Header,
    Body,
    LoginPop
  },
  name: 'index',
  data () {
    return {

    }
  },
  mounted () {
    let checkName  = window.localStorage.key('token')
    let checkToken = window.localStorage.key('name')
    let dat = {}
    if (checkName && checkToken) {
        dat = {
            token: window.localStorage.getItem('token'),
            name: window.localStorage.getItem('name'),
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
.index {
    width: 100vw;
    min-width: 850px;
    height: 100vh;
    background: url('../assets/bgi.jpg') no-repeat;
    background-size: cover;
    overflow: hidden;
}
</style>
