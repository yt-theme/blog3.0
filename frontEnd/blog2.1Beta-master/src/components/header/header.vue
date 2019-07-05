<template>
    <div class="header_container text_no_select">
      <div class="header_left">
          <Logo></Logo>
          <!-- <MenuList></MenuList> -->
      </div>
      <div class="header_center">
          <Search></Search>
      </div>
      <div class="header_right">
          <WebsocketSysMonitor></WebsocketSysMonitor>
          <ActionButtonArea></ActionButtonArea>
          <NotifyArea></NotifyArea>
      </div>
    </div>
</template>

<script>
import Logo from './logo'
import MenuList from './menuList'
import NotifyArea from './notifyArea'
import ActionButtonArea from './actionButtonArea'
import WebsocketSysMonitor from '../websocket/websocket_sysMonitor'
import Search from './search'
export default {
    components: {
        Logo,
        MenuList,
        NotifyArea,
        ActionButtonArea,
        WebsocketSysMonitor,
        Search
    }
}
</script>

<style scoped>
.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(204, 209, 210, 0.999);
    min-height: 33px;
    max-height: 51px;
    padding: 0 6px;
    color: #666;
    overflow-x: auto;
}
@media screen and (max-width: 850px) {
  .header_container {
    /* flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(204, 209, 210, 0.999);
    min-height: 33px;
    max-height: 51px;
    padding: 0 6px;
    color: #666;
    overflow-x: auto; */
  }
}
.header_left, .header_right {
    display: flex;
    justify-content: center;
}
</style>
