<template>
    <div class="sidebarFileUploadList_container">
        <hr/>
        <div :class="[uploadAreavisible ? uploadBtnStyle : '', sidebarFileUploadList_btn]" @click="handleUploadBtn">UploadFile</div>
        <div class="sidebarFileuploadList_uploadArea" v-if="uploadAreavisible">
            <div style="position: relative">
                <!-- select -->
                <div class="inputFile_belowA">
                  <span>Select ></span>
                  <span>File Name:<br/>{{selectedFile.name}}</span>
                  <!-- if (size>0 && size<1000) {
                    return '( ' + size + 'b )'
                  } else if (size>1000 && size<1000000) {
                    return '( ' + (size / 1000).toFixed(2) + 'kb )'
                  } else if (size>1000000) {
                    return '( ' + (size / 1000 /1000).toFixed(2) + 'mb )' -->
                  <span>File Size:<br/>{{
                    selectedFile.size>0 && selectedFile.size<1000 ?
                      selectedFile.size+'b' : selectedFile.size>1000 && selectedFile.size<1000000 ?
                        (selectedFile.size/1000).toFixed(2)+'kb' : selectedFile.size>1000000 ?
                          (selectedFile.size/1000/1000).toFixed(2)+'mb' : ''
                    }}</span>
                </div>
                <input class="inputSelector" type="file" ref="sidebarFileUpload" @change="selectFile()" name="upFile"/>
            </div>
            <!-- preview -->
            <img class="imgSelectShow" ref="sidebarUploadShowImg" src=""/>
            <!-- sure upload -->
            <input @click="sureUploadFile()" v-if="selectedFile" type="button" class="uploadBtn" :disabled="!this.$store.state.file_update_state" :value="this.$store.state.file_update_state ? 'upload' : 'uploading'">
        </div>
        <!-- click img set text -->
        <input class="getUrl" placeholder="Select Img Url" :value="clickedUrl" v-if="clickedUrl"/>
        <div class="fileList" style="calc(width:100%);min-height:199px;overflow:auto;">
            <div class="fileList_item" v-for="i in this.$store.state.fileList.url"  @click="copyLink(i)" @contextmenu="rightKeyOpe($event, i)">
                <!-- {{i}} -->
                <img :src="i" :title="i" width="67px;" height="65px" :alt="i.substring(i.length, i.lastIndexOf('/') + 1)"/>
                <!-- <span>{{ i.substring(i.length, i.lastIndexOf('/') + 1) }}</span> -->
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            uploadAreavisible: false,
            uploadBtnStyle: 'sidebarFileUploadList_btnActive',
            sidebarFileUploadList_btn: 'sidebarFileUploadList_btn',
            // select
            selectedFile: '',

            // click img list
            clickedUrl: ''
        }
    },
    methods: {
        handleUploadBtn () {
            this.uploadAreavisible = !this.uploadAreavisible
            this.selectedFile = ''
        },
        selectFile () {
            this.selectedFile = this.$refs.sidebarFileUpload.files[0]
            console.log(this.selectedFile)
            this.fileShow()
        },
        fileShow () {
            let reader = new FileReader()
            reader.readAsDataURL(this.selectedFile)
            reader.onloadstart = function() {

            }
            // if file img then let show
            let imgs = this.$refs.sidebarUploadShowImg
            if (this.selectedFile.type == 'image/png' ||
                this.selectedFile.type == 'image/svg+xml' ||
                this.selectedFile.type == 'image/jpeg' ||
                this.selectedFile.type == 'image/gif') {

                // get img tag
                // file allready
                reader.onload = function() {
                    imgs.setAttribute('src', reader.result)
                }
            } else {
              imgs.setAttribute('src', '')
            }
        },
        sureUploadFile () {
            this.$store.dispatch('set_file_update_state', false)
            let dat = {
                'selectedFile': this.selectedFile,
                'name'        : this.selectedFile.name,
                'author'      : window.localStorage.getItem('name')
            }
            this.$store.dispatch('sureUploadFile', dat)
        },
        copyLink (lin) {
            this.clickedUrl = lin
        },
        // handle right
        rightKeyOpe (e, s) {
            e.preventDefault()
            window.open(s)
        }
    },
    mounted () {
        let dat = {
            author: window.localStorage.getItem('name'),
            token: window.localStorage.getItem('token')
        }
        this.$store.dispatch('fileList', dat)
    }
}
</script>

<style scoped>
@keyframes animateBtn {
    0% {box-shadow: 0 0 27px #B0B6B6 inset;}
    50% {box-shadow: 0 0 27px #113337 inset;}
    100% {box-shadow: 0 0 27px #B0B6B6 inset;}
}
hr {
    border-bottom: 2px solid #B0B6B6;
}
.sidebarFileUploadList_container {
    margin-top: 9px;
}
.sidebarFileUploadList_container, .sidebarFileuploadList_uploadArea {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
}
.sidebarFileUploadList_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #113236;
    border-radius: 4px;
    padding: 0 16px;
    margin: 9px 0;
    cursor: pointer;
}
.sidebarFileUploadList_btnActive {
    border-radius: 4px;
    padding: 9px;
    overflow: unset;
    animation: animateBtn 1s infinite;
}
.sidebarFileuploadList_uploadArea, .fileList {
    border: 2px solid #113236;
    box-shadow: 0 0 33px #113236 inset;
    border-radius: 4px;
    padding: 9px;
    padding-bottom: 0;
    overflow: unset;
}
.inputFile_belowA {
    display: block;
    width: 100%;
    background-color: #113337;
    border-radius: 4px;
    padding: 9px;
}
.inputFile_belowA> span {
    display: flex;
    width: 100%;
    background-color: rgb(21, 143, 151);
    border-radius: 4px;
    padding: 3px 9px;
}
.inputFile_belowA> span {
    margin-bottom: 4px;
    cursor: pointer;
}
.inputFile_belowA> span:last-child {
    margin-bottom: 0;
}
.inputSelector {
    width: 100%;
    position: absolute;
    top: 9px;
    left: 0;
    opacity: 0;
    cursor: pointer;
    outline: none;
}
.imgSelectShow {
    width: 100%;
    background-color: #ccc;
    margin-top: 9px;
}
.uploadBtn {
    width: 100%;
    height: 31px;
    border-radius: 4px;
    border: none;
    background-color: #B0B6B6;
    color: #113337;
    outline: none;
    cursor: pointer;
    margin-bottom: 9px;
}
.getUrl {
    width: 100%;
    height: 27px;
    box-shadow: 0 0 9px #B0B6B6;
    color: #113337;
    border: none;
    border-radius: 4px;
    padding: 0 9px;
}
.fileList {
    margin-top: 9px;
}
.fileList img {
    display: block;
    box-shadow: 0 0 9px #B0B6B6;
    margin: 3px;
}
.fileList_item {
  display: inline-flex;
  overflow: hidden;
  white-space: pre-wrap;
}
.fileList_item span {
  font-size: small;
}
.popMenu {
    width: 100px;
}
.popMenu> ul {
    list-style: none;
}
</style>
