<template>
    <div class="body_container">
        <!-- <div class="test" @click="addWindow"></div> -->
        <notifyPop></notifyPop>
        <Sidebar></Sidebar>
        <Desktop></Desktop>
        <component v-for="i in $store.state.windowItem"
            :is="i.component"
            :h1="i.h1"
            :id="i.id"></component>
        <ViewPop v-if="$store.state.viewPopShow_state" :text="$store.state.monitor_content" title="server monitor"></ViewPop>
    </div>
</template>

<script>
import Desktop from './components/desktop/desktop'
import Sidebar from './components/sidebar/sidebar'
import window from './components/window/window'
import notifyPop from '../public/notifyPop/notifyPop'
import ViewPop from '../public/viewPop/viewPop'
export default {
    components: {
        Desktop,
        Sidebar,
        window,
        notifyPop,
        ViewPop
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
.body_container {
    display: flex;
    align-items: center;
    color: #B0B6B6;
    width: 100vw;
    height: calc(100vh - 33px);
}
</style>
