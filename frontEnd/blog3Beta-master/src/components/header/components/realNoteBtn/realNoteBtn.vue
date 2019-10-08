<template>
    <div :class="[$store.state.realNoteShow_state ? 'realNoteBtn_c_container_active' : 'realNoteBtn_c_container']" @click="changeRealNoteWinState()">
        realNote
    </div>
</template>

<script>
export default {
    methods: {
        createWebSocket() {
            // this.$store.dispatch('createSysMonitorWebSocket')
        },
        changeRealNoteWinState () {
            // 显示 pop
            if (this.$store.state.realNoteShow_state) {
                this.$store.dispatch("set_realNoteShow_state", false)
            } else {
                this.$store.dispatch("set_realNoteShow_state", true)
                // 请求数据 笔记分类列表
                this.$store.dispatch("query_realNote_classTypeList", true)
            }
        }
    },
    created() {
        this.createWebSocket()
    }
}
</script>

<style scoped>
@keyframes BtnShadowSport {
    0% {box-shadow: 0 0 27px #B0B6B6 inset;}
    50% {box-shadow: 0 0 27px #113337 inset;}
    100% {box-shadow: 0 0 27px #B0B6B6 inset;}
}
.realNoteBtn_c_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    color: #ddd;
    background-color: #113336;
    border: 2px solid #489799;
    box-shadow: 0 0 6px #489799;
    text-shadow: 0 0 5px #000;
    margin-right: 6px;
    padding: 0 6px;
    cursor: default;
}
.realNoteBtn_c_container_active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    color: #ddd;
    background-color: #113336;
    border: 2px solid #489799;
    box-shadow: 0 0 6px #489799;
    text-shadow: 0 0 5px #000;
    margin-right: 6px;
    padding: 0 6px;
    cursor: default;
    animation: BtnShadowSport 1s infinite;
}
</style>
