<template>
    <div class="desktop_container_list" ref="desktop_container_list" v-if="$store.state.desktopLayout === 0">
        <DesktopIcon v-for="i in $store.state.desktopIconList" :h1="i.h1" :img="i.label" :id="i._id" :date="i.create_date"></DesktopIcon>
        <DesktopPager></DesktopPager>
    </div>
    <div class="desktop_container" ref="desktop_container" v-else-if="$store.state.desktopLayout === 1">
        <DesktopIcon v-for="i in $store.state.desktopIconList" :h1="i.h1" :img="i.label" :id="i._id" :date="i.create_date"></DesktopIcon>
        <!-- 填充 -->
        <div style="width: 100%;height:1px;"></div>
        <DesktopPager></DesktopPager>
    </div>
</template>

<script>
import DesktopIcon from './components/desktopIcon/desktopIcon'
import DesktopPager from './components/desktopPager/desktopPager'
export default {
    components: {
        DesktopIcon,
        DesktopPager
    },
    data () {
        return {
            desktopIconWidth: 135 + 20,
            desktopIconHeight: 140 + 20
        }
    },
    mounted () {

        // 以desktop_container高度和宽度计算图标数量
        // 每页最多个数
        let onePageCount = ''
        // 如果图标模式
        if (this.$store.state.desktopLayout === 1) {
            const desktopWidth  = this.$refs.desktop_container.offsetWidth
            const desktopHeight = this.$refs.desktop_container.offsetHeight
            // 每行最多个数
            const maxRow = parseInt(desktopWidth / this.desktopIconWidth)
            // 每列最多个数
            const maxCol = parseInt(desktopHeight / this.desktopIconHeight)
            // 每页最多个数
            onePageCount = maxRow * maxCol
        } 
        // 如果列表模式
        else if (this.$store.state.desktopLayout === 0) {
            const desktopHeight = this.$refs.desktop_container_list.offsetHeight
            // 每页最多个数
            onePageCount = parseInt(desktopHeight / 68)
        }
        this.$store.dispatch('set_onePageCount', onePageCount)

        this.$store.commit('requestDesktopIconList', { 'label_search': 'All', 'h1_search': '' })
    }
}
</script>

<style>
.desktop_container, .desktop_container_list {

}
.desktop_container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: calc(90vw - 10px);
    /* min-width: 900px; */
    min-width: 500px;
    height: calc(100vh - 53px);
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
    margin-left: 10px;
    overflow: auto;
}
.desktop_container_list {
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start; */
    width: calc(90vw - 10px);
    /* min-width: 900px; */
    min-width: 219px;
    height: calc(100vh - 53px);
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
    margin-left: 10px;
    overflow: auto;
}
</style>
