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
  methods: {
    checkLogin (callback) {
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
      this.$store.dispatch('checkLoginState', { 'dat': dat, 'callback': callback })
    }
  },
  mounted () {
    
  },
  // 全局socket
  sockets: {
    // socket连接时
    connect (data) {
      const self = this
      // 检测用户是否登录
      self.checkLogin((stat) => {
        console.log('登录状态 =>', stat)

        // 如果已登录
        if (stat) {
          // 加入工作组
          self.$socket.emit('join_group', {
            // 工作组id 即当前用户名
             'groupId': window.localStorage.getItem('username')
          })
        } else {
          // 否则退出工作组
          self.$socket.emit('leave', {})
        }
      })
    },
    // 系统通知
    notify (data) {
      const self = this
      console.log('socket系统通知 =>', data)
      self.$store.dispatch('showNotifyPop', data)
      setTimeout(() => { self.$store.dispatch('closeNotifyPop') }, 3000)
    }
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
