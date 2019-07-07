<template>
<!-- use 
this.$store.dispatch('showNotifyPop')
this.$store.dispatch('setNotifyPopData', dat)
 -->
    <div :class="[this.$store.state.notifyPopShow ? activeClass : normalClass ]" @click="closeNotifyPop">
        <span>{{this.$store.state.notifyPopData}}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeClass: 'notifyPop_containerActive',
            normalClass: 'notifyPop_container'
        }
    },
    methods: {
        closeNotifyPop () {
            this.$store.dispatch('closeNotifyPop')
        }
    }
}
</script>

<style scoped>
.notifyPop_container {
    position: absolute;
    top: -90px;
    left: calc(50% - 150px);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 90px;
    border-radius: 0 0 4px 4px;
    background-color: #bb7570;
    padding: 11px;
    transition: all 0.4s;
    z-index: 9999999999999999;
}
.notifyPop_containerActive {
    position: absolute;
    top: 0;
    left: calc(50% - 150px);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 90px;
    border-radius: 0 0 4px 4px;
    background-color: #bb7570;
    padding: 11px;
    cursor: normal;
    transition: all 0.4s;
}
.notifyPop_containerActive span, .notifyPop_container span {
    color: #f1f1f1;
    text-shadow: 0 0 14px #113337;
}
</style>
