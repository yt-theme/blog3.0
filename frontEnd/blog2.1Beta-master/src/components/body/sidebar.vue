<template>
    <div class="sidebar_container text_no_select">
        <ul class="sidebar_nav_container">
            <li @click="showPopAction('num0')"><a>Update History</a></li>
            <li @click="showPopAction('num1')"><a>New Article</a></li>
            <!-- <li @click="showPopAction('num2')"><a>Article History</a></li>
            <li @click="showPopAction('num3')"><a>New Note</a></li>
            <li @click="showPopAction('num4')"><a>Note History</a></li> -->
        </ul>
        <div class="sidebarIcon_list">
            <SidebarIcon v-for="i in this.$store.state.sidebarIconList" :label="i.label" :img="i.img" :url="i.url" ></SidebarIcon>
        </div>
        <SidebarFileUploadList></SidebarFileUploadList>
        <SidebarPop></SidebarPop>
    </div>
</template>

<script>
import SidebarIcon from './sidebarIcon'
import SidebarPop from './sidebarPop'
import SidebarFileUploadList from './sidebarFileUploadList'
export default {
    components: {
        SidebarIcon,
        SidebarPop,
        SidebarFileUploadList
    },
    methods: {
        showPopAction (id) {
            this.$store.dispatch('setSidebarPoptitle', '')
            // clear edit id
            this.$store.dispatch('set_windowEdit_id', '')
            // request data
            this.$store.dispatch('requestSidebarPopContent', id)
            // set id
            this.$store.dispatch('setSidebarPopSelectId', id)
            // show
            this.$store.dispatch('toggleSidebarPop', true)
            this.$store.dispatch('sidebarPopEditPasswordTrue')
            this.$store.commit('clearSidebarPopPwdInputData')
            if (id='num1') {
                this.$store.commit('clearSidebarPopData')
                return false
            }
        }
    },
    created () {
        this.$store.commit('requestSidebarIconList')
    }
}
</script>

<style scoped>
@keyframes sidebarListShadow {
    0% {box-shadow: 0 0 27px #B0B6B6 inset;}
    50% {box-shadow: 0 0 27px #113337 inset;}
    100% {box-shadow: 0 0 27px #B0B6B6 inset;}
}
.sidebar_container {
    width: calc(10vw - 20px);
    /* min-width: 199px; */
    min-width: 279px;
    height: calc(100vh - 53px);
    margin-left: 10px;
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
    overflow: auto;
}
.sidebar_container> ul {
    list-style: none;
}
.sidebar_container> ul> li {
    line-height: 3;
    border-radius: 9px;
    box-shadow: 0 0 27px #B0B6B6 inset;
    margin-bottom: 11px;
    cursor: pointer;
}
.sidebar_container> ul> li:hover {
    /* box-shadow: 0 0 27px #113337 inset; */
    /* transition: all 1s; */
    animation: sidebarListShadow 1s infinite;
}
.sidebar_container> ul> li> a {
    color: #B0B6B6;
    text-shadow: 0 0 5px #000;
    padding: 0 1.8em;
}
.sidebar_nav_container {
    display: block;
    border-radius: 4px;
    /* box-shadow: 0 0 300px #113236 inset; */
}
.sidebarIcon_list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    text-shadow: 0 0 5px #000;
    border-radius: 4px;
    margin-top: 30px;
    overflow: auto;
}
</style>
