<template>
    <div v-if="this.$store.state.desktopLayout === 0" class="desktopIcon_container_list text_no_select" @click="addWindow($event, h1,id)">
        <img :src="
            img == 'normal' ? defaultImg :
                img == 'note'  ? note :
                    img == 'important' ? important :
                        img == 'website' ? website : defaultImg
        "/>
        <span>{{h1}}</span>
        <span>{{date}}</span>
    </div>
    <div v-else-if="this.$store.state.desktopLayout === 1" class="desktopIcon_container text_no_select" @click="addWindow($event, h1,id)" :title="h1 + ' @ ' + date">
        <img :src="
            img == 'normal' ? defaultImg :
                img == 'note'  ? note :
                    img == 'important' ? important :
                        img == 'website' ? website : defaultImg
        "/>
        <span>{{h1}}</span>
    </div>
</template>

<script>
import defaultImg from "@/assets/tux.svg"
import note from "@/assets/note.svg"
import important from "@/assets/important.svg"
import website from "@/assets/website.svg"
export default {
    props: ['h1', 'img', 'id',  'date'],
    data () {
        return {
            defaultImg: defaultImg,
            note: note,
            important: important,
            website: website
        }
    },
    methods: {
        addWindow (event, h1, id) {
            // 记录当前点击桌面图标鼠标位置 用于计算窗口出现位置
            this.$store.dispatch('currentClicked_iconPosition', { 'id': id, 'x': event.clientX, 'y': event.clientY })
            // reset window data
            // this.$store.dispatch('addchangeWindowDataKey', id)
            // update data
            // this.$store.commit('requestWindowContent', this.id)
            this.$store.dispatch('requestWindowContent', { 'article_id': id })

            let obj = {
                'component': 'window',
                'h1': h1,
                'id': id
            }

            // 打开窗口
            this.$nextTick(() => { this.$store.dispatch('addWindow', obj) })
        }
    }
}
</script>

<style>
@keyframes desktopIconShadow {
    0% {box-shadow: 0 0 7px #113337;background-color: #113034; border-radius: 4px;}
    15% {box-shadow: 0 0 27px #dfdfdf;background-color: #113034; border-radius: 4px;}
    25% {box-shadow: 0 0 27px #dfdfdf;background-color: #113034; border-radius: 4px;}
    50% {box-shadow: 0 0 27px #B0B6B6; background-color: #113034; border-radius: 4px;}
    100% {box-shadow: 0 0 7px #113337;background-color: #113034; border-radius: 4px;}
}
.desktopIcon_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 135px;
    height: 140px;
    color: #dfdfdf;
    outline: none;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    border: 2px solid #489799;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
.desktopIcon_container_list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
}
.desktopIcon_container_list> img {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 33px;
    height: 33px;
    color: #dfdfdf;
    outline: none;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    margin: 10px;
    padding: 5px;
    cursor: pointer;
}
.desktopIcon_container_list> span {
    text-shadow: 0 0 14px #dfdfdf;
}
.desktopIcon_container_list> span:nth-child(2) {
    min-width: 220px;
    margin-left: 11px;
}
.desktopIcon_container_list> span:nth-child(3) {
    width: unset;
    margin-left: 33px;
}
.desktopIcon_container:hover, .desktopIcon_container_list:hover {
    animation: desktopIconShadow 1s infinite;
}
.desktopIcon_container_list:hover img {
    box-shadow: unset;
}
.desktopIcon_container> img {
    width: 75px;
    height: 75px;
    margin-top: 14.1px;
}
.desktopIcon_container> span {
    text-shadow: 0 0 14px #dfdfdf;
    text-align: center;
    margin-bottom: 11px;
    font-size: 14px;
    padding: 1px 6px;
}
</style>
