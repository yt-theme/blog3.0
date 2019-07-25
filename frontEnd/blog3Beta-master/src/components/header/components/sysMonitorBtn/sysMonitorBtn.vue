<template>
    <div class="sysMonitor_container" @click="changeViewPopState()">
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
.sysMonitor_container {
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
</style>
