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
    computed: {
        window_item () {
            return this.$store.state.windowItem
        }
    },
    watch: {
        window_item () {
            // 更改新窗口位置
            const new_wind  = this.$store.state.windowItem[this.$store.state.windowItem.length - 1]
            const click_pos = this.$store.state.clickedIconPosition
            if (new_wind.id === click_pos.id) {
                const dom_id = new_wind.id
                this.$nextTick(() => {
                    const new_dom = document.getElementById('_' + dom_id)
                    new_dom.style.left = (this.$store.state.clickedIconPosition.x) + 'px'
                    new_dom.style.top = (this.$store.state.clickedIconPosition.y) + 'px'
                })
            }
        }
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
