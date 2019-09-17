<template>
    <div id="desktopPager_container">
        <ul>
            <li class="toHome" @click="toHome">
                <div v-if="page !== 1"></div>
                <span class="inner_tip"></span>
            </li>
            <li class="toPrev" @click="toPrev">
                <div v-if="page !== 1"></div>
                <span class="inner_tip"></span>
            </li>
            <li class="inputPager">
                <input @keyup="checkSetNum()" @keyup.enter="toPage()" v-model="page"/>
            </li>
            <li class="toNext" @click="toNext()">
                <div v-if="($store.state.onePageCount * page) <= $store.state.count"></div>
                <span class="inner_tip"></span>
            </li>
            <li class="toEnd" @click="toEnd">
                <div v-if="($store.state.onePageCount * page) <= $store.state.count"></div>
                <span class="inner_tip"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            page: 1
        }
    },
    // computed: {
    //     maxPage: ''
    // },
    methods: {
        // 只输入数字
        checkSetNum () {
            this.page = this.page.replace(/[^\d]/g, '')
            this.toPage()
        },
        toHome () {
            // 页码1请求数据
            this.page = 1
            this.toPage()
        },
        toPrev () {
            if (this.page > 1) {
                this.page = Number(this.page) - 1
            } else {
                this.page = 1
            }
            this.toPage()
        },
        // 跳转页面
        toPage () {
            if (this.page) {
                this.$store.dispatch('setCur_queryPageData', this.page)
            }
        },
        toNext () {
            if ((this.$store.state.onePageCount * this.page) < this.$store.state.count) {
                this.page = Number(this.page) + 1
                this.toPage()
            }
        },
        toEnd () {
            if ((this.$store.state.onePageCount * this.page) < this.$store.state.count) {
                this.page = Math.ceil(this.$store.state.count / this.$store.state.onePageCount)
                this.toPage()
            }
        }
    }
}
</script>

<style scoped>
#desktopPager_container {
    position: fixed;
    right: 0;
    height: 300px;
    top: calc(50vh - 150px);
}
#desktopPager_container> ul {
    list-style: none;
    padding-right: 3px;
}
#desktopPager_container> ul> li {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #113034;
    box-shadow: 0 0 6px #489799;
    margin: 15px 0;
    cursor: pointer;
}
.toHome, .toEnd, .toPrev, .toNext {
    position: relative;
}
.toHome> div, .toPrev> div {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 12px;
    border-radius: 12px 12px 0 0;
    background-color: #489799;
}
.toEnd> div, .toNext> div {
    position: absolute;
    bottom: 3px;
    left: 3px;
    width: 24px;
    height: 12px;
    border-radius: 0 0 12px 12px;
    background-color: #489799;
}
.inner_tip {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 18px;
    height: 18px;
    background-color: #113034;
    border-radius: 50%;
}
.inputPager> input {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    outline: 0;
    color: #489799;
    text-align: center;
}
</style>
