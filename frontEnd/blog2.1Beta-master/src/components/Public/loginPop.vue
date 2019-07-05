<template>
    <div class="loginPop_container" v-if="!this.$store.state.loginState">
        <div class="inputDiv">
            <div class="inputDiv_header">
                <h1>Login</h1>
            </div>
            <div class="inputDiv_content">
                <div>
                    <span>Name</span>
                    <input name="username" v-model="username" @keyup.enter="login"/>
                </div>
                <div>
                    <span>Passwd</span>
                    <input name="userpassword" v-model="userpassword" type="password" @keyup.enter="login"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            userpassword: ''
        }
    },
    methods: {
        login () {
            let dat = {
                'name': this.username,
                'passwd': this.userpassword
            }
            this.$store.dispatch('login', dat)
        }
    }
}
</script>

<style scoped>
.loginPop_container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: #B0B6B6;
    box-shadow: 0 0 calc(200vw) #113034 inset;
}
.inputDiv {
    width: 50%;
    min-width: 328px;
    max-width: 600px;
    height: 50%;
    min-height: 300px;
    max-height: 300px;
    background-color: #113034;
    border-radius: 4px;
    padding: 25hpx 0;
}
.inputDiv_header {
    padding:  14px 40px;
    padding-top: 14px;
}
.inputDiv_header h1 {
    text-shadow: 0 0 14px #B0B6B6;
}
.inputDiv_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inputDiv_content> div> span {
    display: block;
    width: 40px;
    margin-top: 3px;
}
.inputDiv_content> div> input {
    min-width: 300px;
    height: 2em;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #f1f2f3;
    margin-top: 9px;
    padding: 0 1em;
}
.inputDiv_content> div:nth-child(2) {
    margin-top: 14px;
}
</style>
