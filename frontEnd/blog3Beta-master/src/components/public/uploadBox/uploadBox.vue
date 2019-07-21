<template>
    <!-- 上传文件及列表 -->
    <div class="article_upload_box" >
        <!-- file search upload -->
        <div class="article_upload_box_fileSearch_wrapp">
            <input v-model="searchVal" placeholder="Search file" class="article_upload_box_fileSearch"/>
            <!-- 文件上传 -->
            <p>
                <form enctype="multipart/form-data">
                    <input @change="selectMultipleFile" v-show="false" ref="article_upload_box_fileUpload" class="article_upload_box_fileUpload" type="file" multiple="multiple"/>
                </form>
                <button v-if="!readonly" @click="clickArticleUpload" class="article_upload_box_fileUpload_button">Upload files</button>
            </p>
        </div>
        
        <div v-bind:style="{height: `calc(${height} - 64px - 32px)`, minHeight: 'calc(190px - 64px)', maxHeight: max_height}">
            <ul class="article_upload_box_fileArea">

                <li v-for="i in file_list_data_arr">
                    <!-- 此处显示文件地址链接 -->
                    <p>
                        <input :value="i.file_url"/>
                    </p>
                    <div>
                        <!-- left预览图片如果有 -->
                        <div>
                            <img @click="openFileNewTab(i.file_url)" :src="i.file_url || ''"/>
                        </div>
                        <!-- right 文件信息 -->
                        <div>
                            <!-- top文件名 -->
                            <p>{{i.file_name || ''}}</p>
                            <!-- bottom left文件上传时间 center文件类型 right文件大小 -->
                            <p>
                                <span v-if="i.file_uploadDate">{{new Date(parseInt(i.file_uploadDate/1)).getFullYear() + '-' + (new Date(i.file_uploadDate/1).getMonth() + 1) + '-' + new Date(i.file_uploadDate/1).getDate()}}</span>
                                <span><nobr>{{i.file_type || ''}}</nobr></span>
                                <span>{{`${
                                        Number(i.file_size)>1000000000
                                        ?
                                            i.file_size/1000000000 + 'GB'
                                        :
                                            Number(i.file_size)>1000000
                                            ?
                                                i.file_size/1000000 + 'MB'
                                            :
                                                Number(i.file_size)>1000
                                                ?
                                                    i.file_size/1000 + 'KB'
                                                :
                                                    i.file_size/1 + 'B'
                                    }`}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 删除按钮 -->
                    <img v-if="!readonly" @click="deleteFile(i.file_id)" class="article_upload_box_delete" title="delete" :src="allDelete"/>
                </li>
                
            </ul>
        </div>
        <span style="display:flex;height:8px;"></span>
        
    </div>
</template>

<script>
import allDelete from '@/assets/deleteWindow.svg'
export default {
    props: ['height', 'max_height', 'file_list', 'readonly'],
    data () {
        return {
            // 删除图标
            allDelete: allDelete,
            // 搜索值
            searchVal: '',
            // 使用文件列表
            file_list_data_arr: []
        }
    },
    computed: {
        file_list_data: {
            get () {
                return this.file_list
            },
            set (v) {
                console.log('v =>', v)
                this.file_list_data_arr = v
            }
        }
    },
    watch: {
        file_list(val) {
            this.file_list_data = val
        },
        // 搜索值
        searchVal(val) {
            let allFileList = this.file_list

            let reg = new RegExp(val,"g")
            let tmp_arr = []
            for(let i=0; i<allFileList.length; i++) {
                if (reg.test(allFileList[i]['file_name'])) {
                    tmp_arr.push(allFileList[i])
                }
            }

            this.file_list_data = tmp_arr
        }
    },
    methods: {
         // 触发上传按钮
        clickArticleUpload () {
            this.$refs.article_upload_box_fileUpload.dispatchEvent(new MouseEvent('click')) 
        },
        // 文件上传选择文件
        selectMultipleFile (event) {
            let filesDom = this.$refs.article_upload_box_fileUpload
            let files = filesDom.files
            console.log('files', files)

            var formdata = new FormData()
            for (let i=0; i<files.length; i++) {
                formdata.append("file",files[i])
            }

            this.searchVal = ''

            // 文件上传通知
            this.$store.dispatch('showNotifyPop', 'uploading..')

            // 进行上传文件
            this.$store.dispatch('uploadFileMultiple', formdata)
            this.$refs.article_upload_box_fileUpload.value = ''
        },
        // 新标签打开文件链接
        openFileNewTab (url) { window.open(url, '_blank').location },
        // 删除
        deleteFile (id) {
            // 先从列表中删除文件对象 uploadFileAll_list
            let uploadFileAll_list = this.$store.state.uploadFileAll_list
            console.log('uploadFileAll_list', uploadFileAll_list)
            for (let i=0; i<uploadFileAll_list.length; i++) {
                if (uploadFileAll_list[i]['file_id'] === id) {

                    // 请求删除文件接口
                    this.$store.dispatch('requestDeleteFile', uploadFileAll_list[i]['file_id']) 
                    
                    // 删除此对象
                    uploadFileAll_list.splice(i, 1)
                    this.$store.dispatch('setUploadFileAll_list', uploadFileAll_list)
                }
            }
        }
    },
    mounted () {
        this.file_list_data = this.file_list
    }
}
</script>

<style>
.article_upload_box {
    width: 100%;
    max-width: 999px;
    min-height: 190px;
    background-color: #113337;
    box-shadow: 0 0 8px #B0B6B6;
    border-radius: 4px;
}
.article_upload_box> div:nth-child(2) {
    padding: 0 8px;
    overflow: auto;
    /* width: 100%;
    min-width: 261px;
    max-width: 961px;
    min-height: 190px;
    max-height: calc(80vh - 254px);
    padding: 0 8px;
    overflow-y: auto;
    overflow-x: hidden; */
}
.article_upload_box .article_upload_box_fileSearch_wrapp {
    padding: 8px;
}
.article_upload_box .article_upload_box_fileSearch {
    width: 100%;
    height: 30px;
    background-color: #B0B6B6;
    border-radius: 4px;
    border: 0;
    padding: 0 11px;
}
.article_upload_box .article_upload_box_fileArea {
    display: block;
    width: 100%;
    height: calc(100% - 38px);
    list-style: none;
}
.article_upload_box .article_upload_box_fileArea> li {
    position: relative;
    color: #113337;
    background-color: #489799;
    border-radius: 4px;
    margin: 0.5em 0;
    padding: 8px;
    overflow-x: hidden;
}
.article_upload_box .article_upload_box_fileArea> li:first-child {
    margin-top: 0;
}
.article_upload_box .article_upload_box_fileArea> li:last-child {
    margin-bottom: 0;
}
.article_upload_box .article_upload_box_fileArea> li> p> input {
    width: 100%;
    height: 2em;
    border-radius: 4px;
    border: 0;
    background-color: #2c7e81;
    padding: 0 11px;
    outline: none;
}
.article_upload_box .article_upload_box_fileArea> li> div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 8px;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:first-child {
    width: 50px;
    height: 50px;
    border-radius: 2px;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:first-child> img {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    border-radius: 2px;
    background-color: #113337;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:nth-child(2) {
    width: calc(100% - 50px);
    height: 100%;
    padding-left: 8px;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:nth-child(2)> p {
    display: flex;
    width: 100%;
    text-align: left;
    font-size: 17px;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:nth-child(2)> p:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-top: 0.6em;
}
.article_upload_box .article_upload_box_fileArea> li> div> div:nth-child(2)> p:nth-child(2)> span:nth-child(2) {
    padding: 0 1em;
}
.article_upload_box_delete {
    position: absolute;
    right: -47px;
    top: calc(50% - 15px);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 2px #113337;
    cursor: pointer;
    transition: all 0.3s;
}
.article_upload_box .article_upload_box_fileArea> li:hover .article_upload_box_delete {
    right: 14px;
}
.article_upload_box_fileUpload {
    margin-top: 8px;
}
.article_upload_box_fileUpload_button {
    width: 100%;
    height: 30px;
    background-color: #bb7570;
    border: 0;
    border-radius: 4px;
    color: #113236;
    margin-top: 8px;
}
</style>
