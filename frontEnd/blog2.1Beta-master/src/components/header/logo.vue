<template>
    <div class="logo_contaienr">
        <img title="action" class="logo" src='../../assets/logo.png'/>
        <ul class="logo_menu_list">
            <li @click="logout">logout</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        logout () {
            window.localStorage.setItem('token', '')
            window.localStorage.setItem('name', '')
            this.$store.commit('checkLoginState', false)
            location.reload(true)
        }
    }
}
</script>

<style scoped>
.logo {
    width: 20px;
    height: 20px;
    margin-right: 6px;
}
.logo_contaienr:hover  .logo_menu_list {
    display: block;
}
.logo_menu_list {
    position: absolute;
    top: 30px;
    left: 0;
    display: none;
    list-style: none;
    background-color: rgba(204, 209, 210, 0.999);
    color: #113034;
    padding: 11px;
    cursor: pointer;
}
.logo_menu_list:hover {
    background-color: #666;
    color: #B0B6B6;
}
</style>
