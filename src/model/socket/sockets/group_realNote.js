module.exports = class {
    constructor (groupInfo, socket_server, socket, data) {
        this.groupInfo     = groupInfo
        this.socket_server = socket_server
        this.socket        = socket
        this.data          = data

        // 工作组id
        this.groupId = this.data.groupId
        // 工作组成员数
        this.groupMemberCount = 0
    }

    // 工作
    init () {
        const self = this
        // 成员编辑了实时笔记
        self.socket.on('realNote_edited', (data) => {
            console.log('成员编辑了实时笔记 =>', data)
            // 刷新笔记事件
            self.socket_server.sockets.in(data.groupId).emit('realNote_othersEdit', 'refresh')
        })
    }
}