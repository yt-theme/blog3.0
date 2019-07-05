<template>
    <div class="body_container">
        <!-- <div class="test" @click="addWindow"></div> -->
        <Desktop></Desktop>
        <notifyPop></notifyPop>
        <Sidebar></Sidebar>
        <component v-for="i in this.$store.state.windowItem" :is="i.component" :label="i.label" :id="i.id"></component>
        <ViewPop v-if="this.$store.state.viewPopShow_state" :text="this.$store.state.monitor_content" title="server monitor"></ViewPop>
    </div>
</template>

<script>
import Desktop from './desktop'
import Sidebar from './sidebar'
import window from './window'
import notifyPop from '../Public/notifyPop'
import ViewPop from '../Public/viewPop'
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
/* .test {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #666;
} */
</style>
