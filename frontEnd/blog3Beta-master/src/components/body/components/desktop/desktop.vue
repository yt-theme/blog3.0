<template>
    <div class="desktop_container_list" v-if="$store.state.desktopLayout === 0">
        <DesktopIcon v-for="i in $store.state.desktopIconList" :h1="i.h1" :img="i.label" :id="i._id" :date="i.create_date"></DesktopIcon>
    </div>
    <div class="desktop_container" v-else-if="$store.state.desktopLayout === 1">
        <DesktopIcon v-for="i in $store.state.desktopIconList" :h1="i.h1" :img="i.label" :id="i._id" :date="i.create_date"></DesktopIcon>
    </div>
</template>

<script>
import DesktopIcon from './components/desktopIcon/desktopIcon'
export default {
    components: {
        DesktopIcon
    },
    mounted () {
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
