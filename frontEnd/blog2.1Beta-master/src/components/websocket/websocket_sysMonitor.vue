<template>
    <div class="websocket_sysMonitor_container" @click="changeViewPopState()">
        monitor
    </div>
</template>

<script>
export default {
    methods: {
        createWebSocket() {
            // this.$store.dispatch('createSysMonitorWebSocket')
        },
        changeViewPopState () {
          // 显示 pop
          this.$store.dispatch("set_viewPopShow_state", true)
          // 请求数据
          this.$store.dispatch("set_monitor_content", true)
        }
    },
    created() {
        this.createWebSocket()
    }
}
</script>

<style scoped>
.websocket_sysMonitor_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    color: #B0B6B6;
    background-color: #666;
    box-shadow: 0 0 3px #B0B6B6 inset;
    margin-right: 6px;
    padding: 0 6px;
    cursor: default;
}
</style>
