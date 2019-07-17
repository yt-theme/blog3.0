<!-- can move -->
<template>
  <div @click="handleClick()" :style="{'z-index': zIndex}" class="ProjectTab-container window" ref="ProjectT">
      <div @mousedown="tabHandleMouseDown($event)" class="ProjectTab-container-header text_no_select">
          <span>{{h1 ? h1 : '&nbsp;'}}</span>
          <i title="close the window" @click="deleteWindow($event)"></i>
      </div>
      <div class="divBody">
          <!-- <template v-m v-for="i in [$store.state.windowData]"> -->
              <div v-if="$store.state.windowData[id]">
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <span>documentID -- {{ id ? id : 'loading...' }}</span>
                  <span>
                    <!-- 文件 -->
                    <button class="button_edit"
                      @click="showUploadBox">FileList({{$store.state.windowData[id].file_list.length}})</button>
                    <!-- 编辑 -->
                    <button class="button_edit"
                      @click="articleToEdit('Edit -- ' +
                        $store.state.windowData[id].h1 + ' -- ' + id, 
                        $store.state.windowData[id]._id, 
                        $store.state.windowData[id].h1,
                        $store.state.windowData[id].content,
                        $store.state.windowData[id].label,
                        $store.state.windowData[id].content_type)">Edit</button>
                  </span>
                </div>
                <hr/>
<!-- type no1 -->
                <template v-if="$store.state.windowData[id].content_type == 'web'">
                  <h3>{{$store.state.windowData[id].h1}}</h3>
                  <div class="v_html" v-html="$store.state.windowData[id].content"></div>
                </template>
<!-- type no2 -->
                <template v-if="$store.state.windowData[id].content_type == 'txt'">
                  <h1>{{$store.state.windowData[id].h1}}</h1>
                  <!-- <p>{{i.data[0].content}}</p> -->
                  <textarea v-text="$store.state.windowData[id].content"></textarea>
                </template>

              </div>
          <!-- </template> -->
      </div>

      <!-- 文件框 -->
      <div v-show="uploadBoxShow" class="uploadBoxWrapp">{{file_lists}}
        <Uploadbox 
          :height="'320px'"
          :file_list="file_lists"></Uploadbox>
      </div>
  </div>
</template>
<script>
import Uploadbox from '../../../public/uploadBox/uploadBox'
export default {
  props: ['h1','id','img'],
  components: {
    Uploadbox
  },
  computed: {
    // 文件列表
    file_lists () {
      return this.$store.state.windowData[this.id].file_list
    }
  },
  data () {
    return {
        zIndex: 99,
        // 拖拽状态
        dragStat: false,
        // 文件上传框显示
        uploadBoxShow: false,
    }
  },
  methods: {
    tabHandleMouseDown: function($event) {
      this.dragStat = true
      let e = $event.target
      e.style.zIndex            = "99999"
      e.parentNode.style.zIndex = "99999"
      let ProjectT  = this.$refs.ProjectT
      let startX  = $event.clientX-ProjectT.offsetLeft
      let startY  = $event.clientY-ProjectT.offsetTop
      this.startX = startX
      this.startY = startY
      this.ProjectT = ProjectT
      window.onmousemove = this.tabHandleMouseMove
      window.onmouseup      = this.tabHandleMouseUp
    },
    tabHandleMouseMove: function(e) {
      this.ProjectT.style.left = e.clientX-this.startX+"px"
      this.ProjectT.style.top  = e.clientY-this.startY+"px"
      if ((e.clientY-this.startY) <= 33) {
        this.ProjectT.style.top = "33px"
      }
    },
    tabHandleMouseUp: function() {
      this.dragStat = false
      window.onmousemove = null
      window.onmouseup   = null
    },
    handleClick: function () {
        let wind = document.getElementsByClassName('window')
        for (let i=0;i<wind.length;i++) {
            wind[i].style.zIndex = wind[i].style.zIndex - 1
            if (wind[i].style.zIndex < 1) {
                wind[i].style.zIndex = 1
            }
        }
        this.zIndex = 99
    },
    deleteWindow: function (e) {
        e.preventDefault()
        // this.$store.commit('deleteWindow', this.id)
        this.$store.dispatch('deleteWindow', this.id)
    },
    // 显示文件框
    showUploadBox () {
      this.uploadBoxShow = !this.uploadBoxShow
    },
    articleToEdit: function (title, id, h1, content, img, type) {
        this.$store.dispatch('setSidebarPoptitle', title)
        // set edit id
        if (id) {
          this.$store.dispatch('set_windowEdit_id', id)
        } else {
          this.$store.dispatch('set_windowEdit_id', '')
        }

        let dat = {
          'id': id,
          'h1': h1,
          'img': img,
          'type': type,
          'content': content
        }
        // add Data to sidebarPop
        this.$store.dispatch('addDataSidebarPopEditArticle', dat)

        let popType = 'num1'
        // request data
        this.$store.dispatch('requestSidebarPopContent', popType)
        // set id
        this.$store.dispatch('setSidebarPopSelectId', popType)
        // show
        this.$store.dispatch('toggleSidebarPop', true)
        this.$store.dispatch('sidebarPopEditPasswordTrue')
        this.$store.commit('clearSidebarPopPwdInputData')

        // close this window
        this.$store.dispatch('deleteWindow', this.id)
    }
  },
  created () {

  }
}
</script>
<style scoped>
.ProjectTab-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 33px;
  position: absolute;
  left: 10px;
  /* width: 12vw; */
  min-width: 600px;
  height: 50vh;
  min-height: 500px;
  border: 3px solid #B0B6B6;
  border-radius: 4px;
  background-color: #113337;
  overflow: auto; /* 加上overflow鼠标离开事件源神奇不影响事件生存 */
  box-shadow: 0 0 11px #489799;
  overflow: hidden;
}
.ProjectTab-container-header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 29px;
  background-color: #113337;
  cursor: move;
  text-align: center;
  color: #B0B6B7;
  padding: 3px 6px;
}
.ProjectTab-container-header> span {
  position: relative;
  top: -3px;
  background-color: #B0B6B7;
  color: #113337;
  border-radius: 0 0 4px 4px;
  padding: 0.19em 1.125em;
}
.ProjectTab-container-header> i {
  position: relative;
  top: -3px;
  display: block;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #B0B6B6;
  cursor: pointer;
  box-shadow: 0 0 14px #489799;
}
.ProjectTab-container-header> i:hover {
  box-shadow: 0 0 14px #bb7570;
  background-color: #bb7570;
  transition: all 1s;
}
.button_edit {
  height: 1.9em;
  border: none;
  background-color: #113337;
  color: #b0b4b4;
  /* text-shadow: 0 0 14px #B0B6B6; */
  box-shadow: 0 0 3px #B0B6B6 inset;
  outline: none;
  border-radius: 4px;
  padding: 0 11px;
  cursor: pointer;
}
.search> input {
  min-width: 279px;
  outline: none;
  border: 0;
  height: 2.1em;
  padding: 0.5em;
  background-color: #00292F;
  color: #b0b4b4;
  border-radius: 4px;
  margin-bottom: 2px;
}
.divBody {
  width: 100%;
  position: relative;
  text-shadow: 0 0 9px #333;
  padding: 0 6px;
  overflow: auto;
}
.divBody hr {
  border: 1px groove #B0B6B6;
  margin: 6px 0;
  box-shadow: 0 0 1px #B0B6B6;
}
/* .searchRes {
  float: left;
  width: 279px;
  height: auto;
  max-height: 200px;
  background: url("../../assets/bgi.jpg") center center;
  overflow: auto;
  border-radius: 4px;
}
.searchRes> ul> li {
  margin: 0;
  padding: 0;
  line-height: 2em;
  overflow: auto;
  color: #b0b4b4;
  padding: 0.5em;
  cursor: pointer;
  border-bottom: 2px solid #489799;
  border-radius: 4px;
} */
.v_html {
  min-width: 100%;
  height: 100%;
}
.divBody textarea {
  min-width: 700px;
  height: 370px;
  background-color: rgba(0, 0, 0, 0);
  color: #f1f2f1;
  text-shadow: 0 0 14px #333;
  border: none;
  resize: none;
}
.player {
  margin: auto;
}
.uploadBoxWrapp {
  position: absolute;
}
</style>
