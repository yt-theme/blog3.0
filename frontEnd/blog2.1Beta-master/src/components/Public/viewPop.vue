<template>
    <div ref="viewpop" class="viewPop" draggable="true" @mousedown="tabHandleMouseDown($event)">
      <!-- title -->
      <span>{{title}}</span>
      <!-- content -->
      <textarea disabled="true" class="text_sure_select">{{text}}</textarea>
      <!-- close -->
      <i @click="closeViewPop()"></i>
    </div>
</template>

<script>
export default {
  props: ['text', 'title'],
  data () {
    return {
        // 拖拽状态
        dragStat: false
    }
  },
  methods: {
    closeViewPop () {
      this.$store.dispatch('set_viewPopShow_state', false)
    },
   tabHandleMouseDown: function($event) {
      this.dragStat = true
      let e = $event.target
      // e.style.zIndex            = "99999"
      // e.parentNode.style.zIndex = "99999"
      let viewpop  = this.$refs.viewpop
      let startX  = $event.clientX-viewpop.offsetLeft
      let startY  = $event.clientY-viewpop.offsetTop
      this.startX = startX
      this.startY = startY
      this.viewpop = viewpop
      window.onmousemove = this.tabHandleMouseMove
      document.onmouseup = this.tabHandleMouseUp
    },
    tabHandleMouseMove: function(e) {
      this.viewpop.style.left = e.clientX-this.startX+"px"
      this.viewpop.style.top  = e.clientY-this.startY+"px"
      console.log((e.clientY-this.startY))
      if ((e.clientY-this.startY) <= 33) {
        this.viewpop.style.top = "33px"
      }
    },
    tabHandleMouseUp: function() {
      this.dragStat = false
      window.onmousemove = null
      window.onmouseup   = null
    },
  },
}
</script>

<style scope>
.viewPop {
  position: fixed;
  left: 15vw;
  width: 50%;
  min-width: 500px;
  height:60%;
  min-height: 300px;
  border: 3px solid #B0B6B6;
  border-radius: 4px;
  box-shadow: 0 0 13px #bb7570;
  background-color: #113236;
  padding-top: 2em;
}
.viewPop> span {
  position: absolute;
  left: 5px;
  top: 0;
  display: block;
  background-color: #B0B6B6;
  font-style: normal;
  color: #113236;
  border-radius: 0 0 4px 4px;
  padding: 2px 1em;
  cursor: default;
}
.viewPop> textarea {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  color: #f1f2f1;
  resize: none;
  padding: 11px;
}
.viewPop> i {
  position: absolute;
  right:5px;
  top:5px;
  width: 21px;
  height:21px;
  display: block;
  background-color: #B0B6B6;
  font-style: normal;
  color: #113236;
  border-radius: 100%;
  cursor: pointer;
}
.viewPop> i:hover {
  background-color: #bb7570;
  transition: all 0.5s;
}
</style>
