<template>
    <div class="realNote_container">
        <!-- 操作栏 -->
        <div class="realNote_operateBar">
            <!-- 操作按钮 -->
            <span>
                <img @click="refresh" title="refresh" class="realNote_operateBarIcon" :src="refreshIcon"/>
            </span>
            
            <span>
                <img @click="create" title="create" class="realNote_operateBarIcon" :src="createIcon"/>
            </span>

            <!-- 占位 -->
            <div class="realNote_pos">
                {{title}}
            </div>

            <span>
                <img @click="save" title="save" class="realNote_operateBarIcon" :src="saveIcon"/>
            </span>
        </div>
        <!-- 正文 -->
        <div class="realNote_main">
            <!-- 分类列表 -->
            <ul class="realNote_list_l">
                <li v-for="ite in classTypeList"
                    :class="[ite._id === activeLeftLi ? 'realNote_list_l_item_active' : 'realNote_list_l_item']"
                    @click="clickAndQueryContent(ite._id)">
                    <!-- label -->
                    <span>{{ite.label}}</span>
                </li>
            </ul>
            <ul class="realNote_list_r">
                <li v-show="ite._id === activeLeftLi" v-for="ite in classContentList">
                    <textarea>{{ite.content}}</textarea>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RefreshIcon from '../../../assets/refresh.svg'
import SaveIcon from '../../../assets/save.svg'
import CreateIcon from '../../../assets/create.svg'
export default {
    props: {

    },
    data () {
        return {
            activeLeftLi: '',
            // 标题
            title: '',
            refreshIcon: RefreshIcon,
            saveIcon: SaveIcon,
            createIcon: CreateIcon
        }
    },
    computed: {
        classTypeList () {
            return this.$store.state.realNote_classTypeList
        },
        classContentList () {
            return this.$store.state.realNote_classContentList
        }
    },
    methods: {
        // 请求内容
        clickAndQueryContent (_id) {
            // 将当前item作为激活样式
            this.activeLeftLi = _id
            // 设置标题
            const list = this.$store.state.realNote_classTypeList
            for (let i=0; i<list.length; i++) {
                if (list[i]._id === _id) {
                    this.title = `Editing →   ${list[i].label}`
                    break
                }
            }
            // 请求内容
            this.$store.dispatch("query_realNote_classContentById", { class_id: _id })
        },
        // 刷新
        refresh () {
            // 请求数据 笔记分类列表
            this.$store.dispatch("query_realNote_classTypeList", true)
            // 刷新当前已选笔记
            if (this.activeLeftLi) {
                this.clickAndQueryContent(this.activeLeftLi)
            }
        },
        // 创建类别
        create () {

        },
        // 保存
        save () {

        }
    },
    mounted () {

    }
}
</script>

<style scoped>
.realNote_container {
    position: absolute;
    top: 33px;
    left: 10.5vw;
    display: flex;
    flex-direction: column;
    width: 79vw;
    height: 65vh;
    min-height: 500px;
    border-radius: 4px;
    box-shadow: 0 0 6px #489799;
    border: 1px solid #489799;
    background-color: #113236;
    z-index: 1000;
}
.realNote_operateBar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 33px;
    border-bottom: 1px dashed #489799;
    padding: 0 9px;
}
.realNote_operateBar> span {
    display: inline-flex;
    font-weight: bolder;
}
.realNote_operateBar> span> img {
    cursor: pointer;
}
.realNote_operateBarIcon {
    width: 17px;
    height: 17px;
    margin: 0 7px;
}
.realNote_operateBarIcon_txt {
    height: 21px;
    color: #dfdfdf;
    margin-left: 17px;
}
.realNote_main {
    display: flex;
    height: calc(100% - 33px);
}
.realNote_container ul {
    list-style: none;
    padding: 9px;
}
.realNote_list_l {
    display: flex;
    flex-direction: column;
    border-right: 1px dashed #489799;
    overflow-y: auto;
}
.realNote_list_l li {
    display: flex;
    align-items: center;
    width: 200px;
    border-radius: 4px;
    padding: 9px;
    cursor: pointer;
}
.realNote_list_l li:hover, .realNote_operateBar> span:hover {
    color: #489799;
}
.realNote_list_l_item_active {
    display: flex;
    align-items: center;
    width: 200px;
    border-radius: 4px;
    color: #489799;
    box-shadow: 0 0 6px #489799;
    border: 1px solid #489799;
    padding: 9px;
}
.realNote_list_r {
    width: calc(100% - 200px - 18px);
    height: calc(100%);
    border-radius: 4px;
    padding: 9px;
}
.realNote_pos {
    width: 100%;
    text-align: center;
}
.realNote_list_r li {
    width: 100%;
    height: 100%;
    color: #B0B6B6;
    overflow: auto;
}
.realNote_list_r li textarea {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: #113236;
    color: #B0B6B6;
    border: 0;
    resize: none;
    outline: none;
}
</style>
