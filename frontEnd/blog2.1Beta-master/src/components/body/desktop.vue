<template>
    <div class="desktop_container_list" v-if="this.$store.state.setDesktopLayout == 0">
        <DesktopIcon v-for="i in this.$store.state.desktopIconList" :label="i.label" :img="i.img" :url="i.url" :id="i.id" :date="i.date"></DesktopIcon>
    </div>
    <div class="desktop_container" v-else-if="this.$store.state.setDesktopLayout == 1">
        <DesktopIcon v-for="i in this.$store.state.desktopIconList" :label="i.label" :img="i.img" :url="i.url" :id="i.id" :date="i.date"></DesktopIcon>
    </div>
</template>

<script>
import DesktopIcon from './desktopIcon'
export default {
    components: {
        DesktopIcon
    },
    created () {
        this.$store.commit('requestDesktopIconList')
    }
}
</script>

<style>
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
    overflow: auto;
}
</style>
