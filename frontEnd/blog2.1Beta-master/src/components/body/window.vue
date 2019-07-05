<!-- can move -->
<template>
  <div @click="handleClick()" :style="{'z-index': zIndex}" class="ProjectTab-container window" ref="ProjectT">
      <div @mousedown="tabHandleMouseDown($event)" class="ProjectTab-container-header text_no_select">{{label ? label : '&nbsp;'}}
          <i title="close the window" @click="deleteWindow($event)"></i>
      </div>
      <div class="divBody">
          <template v-m v-for="i in this.$store.state.windowData">
              <div v-if="i.id == id">
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <span>documentID -- {{ i.id ? i.id : 'loading...' }}</span>
                  <button class="button_edit" @click="articleToEdit('Edit -- ' + label + ' -- ' + i.id, i.id, i.data[0].h1, i.data[0].content, i.img, i.contentType)">Edit</button>
                </div>
                <hr/>
<!-- type no1 -->
                <template v-if="i.contentType == 'web'">
                  <h3>{{i.data[0].h1}}</h3>
                  <div class="v_html" v-html="i.data[0].content"></div>
                </template>
<!-- type no2 -->
                <template v-if="i.contentType == 'txt'">
                  <h1>{{i.data[0].h1}}</h1>
                  <!-- <p>{{i.data[0].content}}</p> -->
                  <textarea v-text="i.data[0].content"></textarea>
                </template>

              </div>
          </template>
      </div>
  </div>
</template>
<script>
export default {
  props: ['label','id','img'],
  data () {
    return {
        zIndex: 99,
        // 拖拽状态
        dragStat: false
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
  display: flex;
  justify-content: center;
  padding-top: 33px;
  position: absolute;
  left: 10px;
  /* width: 12vw; */
  min-width: 600px;
  height: 50vh;
  min-height: 500px;
  border: 3px solid #113337;
  background-color: #489799;
  overflow: auto; /* 加上overflow鼠标离开事件源神奇不影响事件生存 */
  box-shadow: 0 0 14px #113337;
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
.ProjectTab-container-header> i {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #489799;
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
  text-shadow: 0 0 14px #B0B6B6;
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
  border: 1px groove #1C3539;
  margin: 6px 0;
  box-shadow: 0 0 1px #1C3539;
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
</style>
