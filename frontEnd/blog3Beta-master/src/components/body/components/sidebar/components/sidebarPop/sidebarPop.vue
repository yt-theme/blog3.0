<template>
    <div v-if="sidebarPopShow" class="sidebarPop_container">
        <i class="close" @click="closePop"></i>
        <div class="body">
            
            <!-- 输入密码区域 -->
            <div class="password_cover" v-if="this.$store.state.sidebarPopEditPasswordCheck">
                <div class="password_cover_container">
                    <div style="display:flex;justify-content: space-between;align-items: center">
                        <span>Input Password</span>
                        <!-- get key -->
                        <div>
                            <!-- <button @click="setSidebarPopEditPassword" style="margin:0">Get key</button> -->
                            <button @click="checkSidebarPopEditPassword">Confirm</button>
                        </div>
                    </div>
                    <input v-model="setSidebarPopPwdInputData" type="password" :placeholder="passwdPlaceholder"/>
                </div>
            </div>
            
            <template v-if="titleTop">
                <h1>{{ this.$store.state.sidebarPoptitle ? this.$store.state.sidebarPoptitle : titleTop }}</h1>
            </template>

            <div class="table_head">
                <!-- <ul style="display: flex;" v-if="this.$store.state.sidebarPopData['id'] !== 'num1'">
                    <li><span>NameList</span></li>
                    <li><span>Date</span></li>
                    <li><span>Id</span></li>
                </ul> -->
            </div>

            <div class="content_container">
                <table v-if="this.$store.state.sidebarPopData['id'] == 'history'">
                    <tr>
                    <td>NameList</td>
                    <td>Date</td>
                    <td>Id</td>
                    </tr>
                    <tr v-for="i in $store.state.desktopIconList">
                    <td>{{i.h1}}</td>
                    <td>{{i.create_date}}</td>
                    <td>{{i._id}}</td>
                    <td><button @click='sidebarPopHistoryDelete(i._id, i.label)'>Del</button></td>
                    </tr>
                </table>

                <!-- --------------------------------------------------------------- -->

                <!-- new / edit article -->
                <div class="article" v-if="this.$store.state.sidebarPopData['id'] == 'new'">

                    <div class="article_header">
                        <input class="article_title" placeholder="Title" maxlength="14" v-model="VModelSidebarPopArticleInputData"/>
                        <div style="display:flex;align-items:center">

                            <!-- 显示上传文件列表 -->
                            <button @click="toggleArticleUpload" class="article_upload_toggle">fileList ({{this.$store.state.uploadFileAll_list.length}}) </button>
                            <!-- 上传文件及列表 -->
                            <div v-show="article_upload_box_show" class="article_upload_box_wrapp">
                                <UploadBox :height="uploadBoxHeight" :max_height="uploadBoxMaxHeight" :file_list="uploadFileBox_list"></UploadBox>
                            </div>
                            
                            IconLabel
                            <select v-model="VModelSidebarPopArticleIconLabelData">
                                <option value="normal" selected>normal</option>
                                <option value="note">note</option>
                                <option value="important">important</option>
                                <option value="website">website</option>
                            </select>
                            Type
                            <select v-model="VModelSidebarPopArticleTypeData">
                                <option value="web" selected>web</option>
                                <option value="txt">txt</option>
                            </select>
                            → &nbsp;
                            <button class="article_submit" @click="submit">Submit</button>
                        </div>
                    </div>
                    <textarea class="article_main" placeholder="Your think " v-model="VModelSidebarPopArticleTextareaData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UploadBox from '../../../../../public/uploadBox/uploadBox'
export default {
    props: ['title'],
    components: {
        UploadBox
    },
    data () {
        return {
            passwdPlaceholder: 'input key',
            // 上传文件列表是否显示
            article_upload_box_show: false,
            // 文件上传框高度
            uploadBoxHeight: '50%',
            uploadBoxMaxHeight: '450px'
        }
    },
    methods: {
        closePop () {
            this.article_upload_box_show = false
            // sidebarPop show
            this.$store.dispatch('toggleSidebarPop', false)
            // clear edit id
            this.$store.dispatch('set_windowEdit_id', '')
        },
        setSidebarPopEditPassword () {
            this.$store.dispatch('setSidebarPopEditPassword')
            this.passwdPlaceholder = 'key has sending'
        },
        checkSidebarPopEditPassword () {
            this.passwdPlaceholder = 'input key'
            let pwd = this.$store.state.sidebarPopPwdInputData
            this.$store.dispatch('checkSidebarPopEditPassword', pwd)
            this.$store.dispatch('clearSidebarPopPwdInputData')
        },
        submit () {
            if (this.$store.state.VModelSidebarPopArticleInputData) {
                let timer = new Date()
                let Y = timer.getFullYear()
                let M = (Number(timer.getMonth()) + 1)
                let D = timer.getDate()
                let week = timer.getDay()
                let h = Number(timer.getHours()); if (h<10) { h = '0' + h }
                let m = Number(timer.getMinutes()); if (m<10) { m = '0' + m }
                let s = Number(timer.getSeconds()); if (s<10) { s = '0' + s }
                let dat = {
                    'id': this.$store.state.windowEdit_id,
                    'contentType': this.$store.state.VModelSidebarPopArticleTypeData,
                    'h1': this.$store.state.VModelSidebarPopArticleInputData,
                    'label': this.$store.state.VModelSidebarPopArticleIconLabelData,
                    'content': this.$store.state.VModelSidebarPopArticleTextareaData,
                    'date': Y + '-' + M + '-' + D + ' week ' + week + ' ' + h + ':' + m + ':' + s,
                    'files': this.$store.state.uploadFileAll_list
                }
                this.$store.dispatch('submitArticle', dat)
            } else {
                this.$store.dispatch('showNotifyPop', 'Least Input Title')
            }
        },
        sidebarPopHistoryDelete (id, type) {
            this.$store.dispatch('deleteArticle', {id: id, type: type})
        },
        // 显示隐藏文件上传列表
        toggleArticleUpload () {
            this.article_upload_box_show = !this.article_upload_box_show
        },

    },
    computed: {
        sidebarPopShow () {
            this.article_upload_box_show = false
            return this.$store.state.sidebarPopShow
        },
        uploadFileBox_list() {
            let boxFileList = this.$store.state.curUploadFileMultiple_list
            let allFileList = this.$store.state.uploadFileAll_list
            let resultList  = boxFileList.concat(allFileList)
            console.log('resultList =>', resultList)
            // 将box文件列表合并时all
            this.$store.dispatch('setUploadFileAll_list', resultList)
            return resultList
        },
        titleTop () {
            let id = this.$store.state.sidebarPopData['id']
            switch (id) {
                case 'history':
                    return 'Update History'
                    break;
                case 'new':
                    return 'New Article'
                    break;
                case 'num2':
                    return 'Article History'
                    break;
                case 'num3':
                    return 'New Note'
                    break;
                case 'num4':
                    return 'Note History'
                    break;
                default:
                    break;
            }
        },
        setSidebarPopPwdInputData: {
            get () {
                return this.$store.state.sidebarPopPwdInputData
            },
            set (dat) {
                this.$store.dispatch('setSidebarPopPwdInputData', dat)
            }
        },
        VModelSidebarPopArticleInputData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleInputData
            },
            set (dat) {
                this.$store.dispatch('VModelSidebarPopArticleInputData', dat)
            }
        },
        VModelSidebarPopArticleTextareaData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleTextareaData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleTextareaData', dat)
            }
        },
        VModelSidebarPopArticleIconLabelData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleIconLabelData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleIconLabelData', dat)
            }
        },
        VModelSidebarPopArticleTypeData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleTypeData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleTypeData', dat)
            }
        }
    },
    created () {
        this.article_upload_box_show = false
        // 上传框高度
        this.uploadBoxHeight = (document.body.clientHeight - 354) + 'px'
        window.onresize = () => { this.uploadBoxHeight = (document.body.clientHeight - 354) + 'px' }
    }
}
</script>

<style>
.sidebarPop_container {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90vw;
    min-width: 930px;
    height: 80vh;
    min-height: 500px;
    background-color: #113337;
    border-radius: 4px;
    box-shadow: 0 0 14px #113337;
}
.close {
    position: absolute;
    top: -17px;
    right: -18px;
    width: 31px;
    height: 31px;
    box-shadow: 0 0 14px #113337;
    border-radius: 50%;
    background-color: #489799;
    cursor: pointer;
}
.close:before {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    content: '';
    width: 100%;
    height: 2px;
    background-color: #113337;

}
.close:hover {
    transform: rotate(180deg);
    transition: all 0.4s;
    box-shadow: 0 0 2em #bb7570;
}
.body {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    text-shadow: 0 0 14px #B0B6B6;
}
.body> h1 {
    margin: 0 20px;
}
.table_head {
    padding: 9px 0 9px 20px;
}
.table_head> ul {
    list-style: none;
    padding-left: 11px;
}
.content_container {
    width: calc(100% - 40px);
    position: absolute;
    padding: 0 20px;
    height: calc(100% - 121px);
    overflow: auto;
}
/* .content_container ul {
    display: block;
    list-style: none;
    overflow: auto;
} */
.content_container table {
  width: 100%;
}
.content_container tr {
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 11px;
    padding: 11px;
}
.content_container tr:hover {
    box-shadow: 0 0px 14px #B0B6B6 inset;
    border-radius: 4px;
}
.content_container tr> td {
  padding: 5px;
}
/* .content_container ul> li> span, .table_head> ul> li> span {
    display: inline-block;
    min-width: 273px;
} */
.content_container button {
    border: none;
    outline: none;
    border-radius: 4px;
    color: #113236;
    text-shadow: 0 0 14px #B0B6B6;
    background-color: #bb7570;
    padding: 3px 14px;
    cursor: pointer;
}
.article {
    position: relative;
    width: 100%;
    height: calc(100% - 5px);
}
.password_cover {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background-color: rgba(17,50,54,0.3);
    z-index: 90;
}
.password_cover_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 359px;
    background-color: #113236;
    border-radius:4px;
    box-shadow: 0 0 8px #B0B6B6;
    padding: 23px;
}
.password_cover_container button {
    height: 2em;
    border-radius: 4px;
    outline: none;
    border: none;
    background-color: #489799;
    cursor: pointer;
    color: #113337;
    padding: 0 11px;
    margin-left: 13px;
}
.password_cover_container> input {
    width: 100%;
    height: 2em;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #B0B6B6;
    margin-top: 13px;
    text-align: center;
    padding: 0 11px;
}
.article_header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.article_header select {
    /* border: none; */
    appearance: none;
    outline: none;
    width: 8em;
    height: 2em;
    border-radius: 4px;
    background-color: #489799;
    border: 1px solid #489799;
    margin:0 11px;
    padding: 0 11px;
}
.article_header select> option {
    line-height: 2em;
}
.article_title, .article_main {
    /* box-shadow: 0 0 3px #113337 inset;  */
}
.article_title {
    width: 15em;
    height: 2em;
    border: none;
    outline: none;
    text-shadow: 0 0 30px #489799;
    background-color: #B0B6B6;
    color: #113337;
    border-radius: 4px;
    padding: 0 11px;
}
.article_submit {
    height: 2em;
    outline: none;
    background-color: #489799;
    text-shadow: 0 0 14px #B0B6B6;
    color: #113337;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    padding: 0 15px;
}
.article_main {
    width: 100%;
    height: calc(100% - 43px);
    border-radius: 4px;
    outline: none;
    color: #113337;
    background-color: #B0B6B6;
    text-shadow: 0 0 14px #489799;
    border: none;
    resize: none;
    margin-top: 11px;
    padding: 11px;
    overflow: auto;
}
.article_header .article_upload_toggle {
    background-color: #489799;
    height: 2em;
    padding: 3px 14px;
    margin: 0 11px;
}
.article_upload_box_wrapp {
    position: absolute;
    top: 49px;
    min-height: 320px;
    overflow: auto;
}
</style>
