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

    // 加入
    async join () {
        console.log('this.groupid', this.groupId)

        try {
            this.groupMemberCount = this.socket_server.sockets.adapter.rooms[this.groupId].length
        } catch (e) {
            this.groupMemberCount = 0
        }

        // 加入工作组
        await this.socket.join(this.groupId)
        this.groupMemberCount = this.socket_server.sockets.adapter.rooms[this.groupId].length
        // 对工作组中所有人发通知
        this.socket_server.sockets.in(this.groupId).emit('notify', `新用户加入${this.groupId}组 成员有${this.groupMemberCount}人`)
    }
}