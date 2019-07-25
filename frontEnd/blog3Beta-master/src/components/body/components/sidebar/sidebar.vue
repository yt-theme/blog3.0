<template>
    <div class="sidebar_container text_no_select">
        <div>
            <ul class="sidebar_nav_container">
                <li @click="showPopAction('history')"><a>Update History</a></li>
                <li @click="showPopAction('new')"><a>New Article</a></li>
                <!-- <li @click="showPopAction('num2')"><a>Article History</a></li>
                <li @click="showPopAction('num3')"><a>New Note</a></li>
                <li @click="showPopAction('num4')"><a>Note History</a></li> -->
            </ul>
            
            <Uploadbox
                style="margin-top: 11px;box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;border: 2px solid #489799;"
                :height="'50vh'"
                :max_height="'80vh'"
                :readonly="false"
                :is_private_mode="true"
                :file_list="$store.state.sidebarUploadBox_dataList"></Uploadbox>
        </div>
        <div class="sidebarIcon_list">
            <SidebarIcon v-for="i in this.$store.state.sidebarWebsiteList" :label="i.label" :img="i.img" :url="i.url" ></SidebarIcon>
            <!-- 填充 -->
            <div style="width: 100%;height: 6px"></div>
        </div>
        <SidebarPop></SidebarPop>
    </div>
</template>

<script>
import SidebarIcon from './components/sidebarIcon/sidebarIcon'
import SidebarPop from './components/sidebarPop/sidebarPop'
// import SidebarFileUploadList from './components/sidebarFileUploadList/sidebarFileUploadList'
import Uploadbox from '@/components/public/uploadBox/uploadBox'
export default {
    components: {
        SidebarIcon,
        SidebarPop,
        Uploadbox
    },
    methods: {
        showPopAction (id) {
            this.$store.dispatch('setSidebarPoptitle', '')
            // clear edit id
            this.$store.dispatch('set_windowEdit_id', '')
            // request pop data
            this.$store.dispatch('requestSidebarPopContent', id)
            // set id
            this.$store.dispatch('setSidebarPopSelectId', id)
            // show
            this.$store.dispatch('toggleSidebarPop', true)
            this.$store.dispatch('sidebarPopEditPasswordTrue')
            this.$store.dispatch('clearSidebarPopPwdInputData')
            if (id='new') {
                this.$store.dispatch('clearSidebarPopData')
                return false
            } else if (id='history') {
                return false
            }
        }
    },
    mounted () {
        this.$store.dispatch('requestSidebarWebsiteList', '')
        this.$store.dispatch('requestSidebarUploadBox_dataList', '')
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
    display: flex;
    flex-direction: column;
    width: calc(10vw - 20px);
    /* min-width: 199px; */
    min-width: 279px;
    height: calc(100vh - 53px);
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
    overflow: auto;
}
.sidebar_container> div> ul {
    list-style: none;
}
.sidebar_container> div> ul> li {
    line-height: 3;
    border-radius: 4px;
    /* box-shadow: 0 0 27px #B0B6B6 inset; */
    background-color: #113337;
    text-shadow: 0 0 5px #000;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    border: 2px solid #489799;
    margin-bottom: 11px;
    cursor: pointer;
}
.sidebar_container> div> ul> li:hover {
    /* box-shadow: 0 0 27px #113337 inset; */
    /* transition: all 1s; */
    animation: sidebarListShadow 1s infinite;
}
.sidebar_container> div> ul> li> a {
    color: #ddd;
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
    /* margin-top: 0px; */
    overflow: auto;
}
</style>
