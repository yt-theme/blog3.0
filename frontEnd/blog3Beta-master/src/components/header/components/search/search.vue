<template>
    <div class="search_container">
        <select @change="typeChange" v-model="search_type_data">
            <option value='All' selected>All</option>
            <option value='normal'>normal</option>
            <option value='note'>note</option>
            <option value='important'>important</option>
            <option value='website'>website</option>
        </select>
        <input v-model="search_input_data" @keyup="inputKeyUp"
            :class="[search_input_data != '' ? activeStyle : normalStyle, normalStyle]" placeholder="Search"/>
        <img @click="clearAll" :src="allDelete" title="clear"/>
    </div>
</template>
<script>
import allDelete from '@/assets/deleteWindow.svg'
export default {
    data () {
        return {
            search_type_data: 'All',
            search_input_data: '',
            activeStyle: 'activeStyle',
            normalStyle: 'normalStyle',
            allDelete: allDelete
        }
    },
    methods: {
        typeChange(e) {
            this.inputKeyUp()
        },
        inputKeyUp(e) {
            let dat = {
                'label_search': this.search_type_data,
                'h1_search':    this.search_input_data
            }
            setTimeout(
                () => {this.$store.dispatch('requestDesktopIconList', dat)}
            , 0)
        },
        clearAll() {
            let dat = {
                'label_search': 'All',
                'h1_search': ''
            }
            this.search_type_data = 'All'
            this.search_input_data = ''
            this.$store.dispatch('requestDesktopIconList', dat)
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
@keyframes sidebarIconShadow {
    0% {box-shadow: 0 0 27px #489799 inset,0 0 27px #B0B6B6 inset;}
    25% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #489799 inset;}
    50% {box-shadow: 0 0 27px #489799 inset,0 0 27px #B0B6B6 inset;}
    75% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #489799 inset;}
    100% {box-shadow: 0 0 27px #489799 inset,0 0 27px #B0B6B6 inset;}
}
.search_container {
    display: flex;
    height: 25px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #113336;
    /* box-shadow: 0 0 3px #B0B6B6 inset; */
    color: #ddd;
    text-shadow: 0 0 6px #B0B6B6;
    border-radius: 4px;
    border: 2px solid #489799;
    box-shadow: 0 0 6px #489799;
}
.search_container> input, .normalStyle {
    width: 14em;
    height: 100%;
    color: #113336;
    border: none;
    outline: none;
    border-radius: 0 0 0 0;
    background-color: #ddd;
    margin: 0;
    padding: 0.1em 1em;
    font-style: italic;
}
.activeStyle {
    box-shadow: 0 0 14px #113336;
    animation: sidebarIconShadow 4s infinite;
}
.search_container> select {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border: none;
    appearance: none;
    border-radius: 4px 1px 1px 4px;
    background-color: #113336;
    color: #ddd;
    text-shadow: 0 0 5px #000;
    outline: none;
    text-align: center;
    /* box-shadow: 0 0 3px #B0B6B6 inset; */
    padding: 0 0.2em;
}
.search_container> img {
    width: 17px;
    height: 17px;
    margin: 0 5px;
    cursor: pointer;
}
</style>
