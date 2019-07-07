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
                'type': this.search_type_data,
                'input': this.search_input_data
            }
            setTimeout(
                () => {this.$store.dispatch('request_search', dat)}
            , 0)
        },
        clearAll() {
            let dat = {
                'type': 'All',
                'input': ''
            }
            this.search_type_data = 'All'
            this.search_input_data = ''
            this.$store.dispatch('request_search', dat)
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
@keyframes sidebarIconShadow {
    0% {box-shadow: 0 0 27px #ebd15f inset,0 0 27px #29814b inset;}
    25% {box-shadow: 0 0 27px #29814b inset,0 0 27px #ebd15f inset;}
    50% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #29814b inset;}
    75% {box-shadow: 0 0 27px #29814b inset,0 0 27px #ebd15f inset;}
    100% {box-shadow: 0 0 27px #ebd15f inset,0 0 27px #29814b inset;}
}
.search_container {
    display: flex;
    height: 23px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #666;
    box-shadow: 0 0 3px #B0B6B6 inset;
    color: #B0B6B6;
    border-radius: 4px;
}
.search_container> input, .normalStyle {
    width: 14em;
    height: 100%;
    color: #666666;
    border: none;
    outline: none;
    border-radius: 0 0 0 0;
    margin: 0;
    padding: 0.1em 1em;
    font-style: italic;
}
.activeStyle {
    box-shadow: 0 0 14px #113336;
    animation: sidebarIconShadow 4s infinite;
}
.search_container> select {
    height: 100%;
    border: none;
    appearance: none;
    border-radius: 4px 1px 1px 4px;
    background-color: #666;
    color: #f1f2f3;
    outline: none;
    text-align: center;
    color: #B0B6B6;
    box-shadow: 0 0 3px #B0B6B6 inset;
    padding: 0 0.2em;
}
.search_container> img {
    width: 17px;
    height: 17px;
    margin: 0 5px;
    cursor: pointer;
}
</style>
