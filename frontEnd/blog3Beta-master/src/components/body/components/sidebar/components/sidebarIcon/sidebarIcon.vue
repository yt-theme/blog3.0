<template>
    <a class="sidebarIcon_container" :href="url" target="_blank">
        <img :src="img"/>
        <span>{{label}}</span>
    </a>
</template>

<script>
export default {
    props: ['url', 'label', 'img']
}
</script>

<style scoped>
    @keyframes sidebarIconShadow {
        0% {box-shadow: 0 0 27px #113337 inset,0 0 0px #113337 inset;}
        25% {box-shadow: 0 0 27px #113337 inset,0 0 100px #ebd15f inset;}
        50% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #29814b inset;}
        75% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 100px #e78e3b inset;}
        100% {box-shadow: 0 0 27px #113337 inset,0 0 0px #e44439 inset;}
    }
    .sidebarIcon_container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #B0B6B6;
        text-decoration: none;    
        height: 30px;
        outline: none;
        border-radius: 4px;
        box-shadow: 0 0 60px #113236 inset;
        margin-right: 10px;
        margin-top: 10px;
        padding: 0 1em;
    }
    .sidebarIcon_container:hover {
        animation: sidebarIconShadow 4s infinite;
    }
</style>
