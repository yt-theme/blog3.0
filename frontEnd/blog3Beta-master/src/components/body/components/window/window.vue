<!-- can move -->
<template>
  <div :id="'_' + id" :ref="'_' + id" 
    @mousedown="handleClick()" 
    @mouseenter="handleMouseEnter($event)"
    :style="{'z-index': zIndex}" class="window-container window">
      <div @mousedown="tabHandleMouseDown($event)" class="window-container-header text_no_select">
        <!-- 标题 -->
        <span>{{h1 ? h1 : ' '}}</span>
        <div>
            <!-- 文件 -->
            <button class="button_edit"
              @click="showUploadBox">FileList({{$store.state.windowData[id] ? $store.state.windowData[id].file_list.length : 0}})</button>
            <!-- 编辑 -->
            <button class="button_edit"
              @click="articleToEdit(
                'Edit -- ' + $store.state.windowData[id].h1 + ' -- ' + id, 
                $store.state.windowData[id]._id, 
                $store.state.windowData[id].h1,
                $store.state.windowData[id].content,
                $store.state.windowData[id].label,
                $store.state.windowData[id].content_type,
                file_lists
              )">Edit</button>
              &nbsp;&nbsp;&nbsp;
            <i title="close the window" @click="deleteWindow($event)"></i>
        </div>
      </div>
      <div class="divBody">
          <div v-if="$store.state.windowData[id]">
            <div style="display: flex;justify-content:space-between;align-items:center">
              <!-- <span class="docu_id">ID {{ id ? id : 'loading...' }}</span> -->
              
            </div>
<!-- type no1 -->
            <template v-if="$store.state.windowData[id].content_type == 'web'">
              <!-- <h3>{{$store.state.windowData[id].h1}}</h3> -->
              <div class="v_html" v-html="$store.state.windowData[id].content"></div>
            </template>
<!-- type no2 -->
            <template v-if="$store.state.windowData[id].content_type == 'txt'">
              <!-- <h1>{{$store.state.windowData[id].h1}}</h1> -->
              <textarea ref="windowTextarea" @scroll="windowTextareaScroll($event)" v-text="$store.state.windowData[id].content"></textarea>
            </template>

          </div>
      </div>

      <!-- 文件框 -->
      <div v-show="uploadBoxShow" class="uploadBoxWrapp">
        <Uploadbox 
          :height="'500px'"
          :max_height="'80vh'"
          :readonly="true"
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
      return this.$store.state.windowData[this.id] ? this.$store.state.windowData[this.id].file_list : []
    }
  },
  data () {
    return {
        zIndex: 1,
        // 拖拽状态
        dragStat: false,
        // 文件上传框显示
        uploadBoxShow: false,
    }
  },
  methods: {

// #################### 窗口移动 #################

    tabHandleMouseDown: function($event) {
      this.dragStat = true
      let e = $event.target
      e.style.zIndex            = "99999"
      e.parentNode.style.zIndex = "99999"
      let ProjectT  = this.$refs['_' + this.id]
      let startX  = $event.clientX-ProjectT.offsetLeft
      let startY  = $event.clientY-ProjectT.offsetTop
      this.startX = startX
      this.startY = startY
      this.ProjectT = ProjectT
      window.onmousemove = this.tabHandleMouseMove
      window.onmouseup   = this.tabHandleMouseUp
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

// ################### 窗口调整大小 ################

    handleMouseEnter: function (event) {
      let self = this
      const target_dom = event.target

      const clientHeight = document.body.clientHeight
      const scrollWidth  = target_dom.scrollWidth
      const scrollHeight = target_dom.scrollHeight
      const clientX      = event.clientX
      const clientY      = event.clientY
      const offsetLeft   = target_dom.offsetLeft
      const offsetTop    = target_dom.offsetTop

    },
    handleMouseMove: function (event) {
      const target_dom = event.target

      const clientHeight = document.body.clientHeight
      const scrollWidth  = target_dom.scrollWidth
      const scrollHeight = target_dom.scrollHeight
      const clientX      = event.clientX
      const clientY      = event.clientY
      const offsetLeft   = target_dom.offsetLeft
      const offsetTop    = target_dom.offsetTop

      
      // 如果从右面移动超过 9px
      // if ((clientX - offsetLeft - scrollWidth) < -9) {
      //   target_dom.style.cursor = 'auto'
      // }
      // 如果从左面移动超过 9px
      // if ((clientX - offsetLeft) > 9) {
      //   target_dom.style.cursor = 'auto'
      // }
    },

// #############################################

    handleClick: function () {
      const wind = document.getElementsByClassName('window')

      for (let i=0;i<wind.length;i++) {
          // wind[i].style.zIndex -= 1
          wind[i].style.zIndex = 1
          // if (wind[i].style.zIndex < 1) {
          //   wind[i].style.zIndex = 1
          // }
      }

      this.zIndex += 1
    },
    deleteWindow: function (e) {
        e.preventDefault()
        this.$store.dispatch('deleteWindow', this.id)
    },
    // 显示文件框
    showUploadBox () {
      this.uploadBoxShow = !this.uploadBoxShow
    },
    articleToEdit: function (title, id, h1, content, img, type, file_lists) {
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
          'content': content,
          'file_list': file_lists
        }
        // add Data to sidebarPop
        this.$store.dispatch('addDataSidebarPopEditArticle', dat)

        let popType = 'new'
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
    },
    // textarea鼠标滚动事件
    windowTextareaScroll (e) {

    },
    scrollBar () {

    }
  },
  created () {
    this.scrollBar()
  }
}
</script>
<style scoped>
.window-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 33px;
  position: absolute;
  /* left: 10px; */
  /* width: 12vw; */
  /* width: 30%; */
  min-width: 750px;
  height: 50vh;
  min-height: 600px;
  /* border: 3px solid #B0B6B6; */
  border-radius: 6px;
  background-color: #113337;
  overflow: auto; /* 加上overflow鼠标离开事件源神奇不影响事件生存 */
  box-shadow: 0 0 6px #489799;
  border: 2px solid #489799;
  overflow: hidden;
}
.window-container-header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* min-height: 29px; */
  background-color: #113337;
  cursor: move;
  text-align: center;
  color: #B0B6B7;
  padding: 3px 6px;
}
.window-container-header> span {
  position: relative;
  top: -6.6px;
  background-color: #489799;
  color: #113337;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 14px #489799;
  text-shadow: 0 0 6px #ddd;
  padding: 1px 2em;
}
.window-container-header> div {
  display: flex;
  align-items: center;
}
.window-container-header i {
  position: relative;
  /* top: -3px; */
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #489799;
  cursor: pointer;
  box-shadow: 0 0 14px #489799;
}
.window-container-header> i:hover {
  box-shadow: 0 0 14px #bb7570;
  background-color: #bb7570;
  transition: all 1s;
}
.docu_id {
  color: #489799;
  text-shadow: 0 0 3px #000;
  font-weight: bold;
}
.button_edit {
  height: 30px;
  border: none;
  background-color: #113337;
  color: #489799;
  text-shadow: 0 0 3px #000;
  font-weight: bold;
  /* box-shadow: 0 0 3px #B0B6B6 inset; */
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 11px;
  cursor: pointer;
}
.button_edit:hover {
  text-shadow: 0 0 14px #f1f3f1;
}
.divBody {
  width: 100%;
  position: relative;
  text-shadow: 0 0 9px #333;
  padding: 0 6px;
  overflow: auto;
}
.divBody> div {
  height: 100%;
  padding-bottom: 8px;
}
.divBody hr {
  border: 1px groove #B0B6B6;
  margin: 6px 0;
  box-shadow: 0 0 1px #B0B6B6;
}
.divBody textarea {
  display: inline-block;
  min-width: 600px;
  height: calc(100%);
  background-color: rgba(0, 0, 0, 0);
  text-shadow: 0 0 14px #333;
  line-height: 1.8125;
  color: #dfdfdf;
  border: none;
  resize: none;
  /* overflow: hidden; */
}
.divBody .v_html {
  min-width: 600px;
  height: calc(100%);
  color: #dfdfdf;
}
.player {
  margin: auto;
}
.uploadBoxWrapp {
  position: absolute;
  top: 80px;
  height: 500px;
}
</style>
