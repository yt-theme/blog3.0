<template>
    <div class="actionButtonArea_container">
        <img :src="deleteWindow" @click="closeAllWindow" title="close all window"/>
        <img :src="iconIcon" @click="changeDesktopLayout(1)" title="icon mode"/>
        <img :src="listIcon" @click="changeDesktopLayout(0)" title="list mode"/>
    </div>
</template>

<script>
import listIcon from '@/assets/listMode.svg'
import iconIcon from '@/assets/iconMode.svg'
import deleteWindow from '@/assets/deleteWindow.svg'
export default {
    data () {
        return {
            listIcon: listIcon,
            iconIcon: iconIcon,
            deleteWindow: deleteWindow,
        }
    },
    methods: {
        changeDesktopLayout (type) {
            this.$store.dispatch('changeDesktopLayout', type)
        },
        closeAllWindow () {
            this.$store.dispatch('deleteAllWindow')
        }
    }
}
</script>

<style scoped>
.actionButtonArea_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    background-color: #666;
    box-shadow: 0 0 3px #B0B6B6 inset; 
}
.actionButtonArea_container> img {
    width: 17px;
    height: 17px;
    margin: 0 7px;
    cursor: pointer;
}
</style>
