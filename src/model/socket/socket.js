const JoinGroup     = require('./sockets/join_group')
const groupRealNote = require('./sockets/group_realNote')

module.exports = function (groupInfo, socket_server) {
    // socket 连接事件
    socket_server.on('connection', (socket) => {
        console.log('socket_server connecton =>')

        // 加入工作组
        socket.on('join_group', (data, callback) => {
            console.log('加入工作组 =>', data)
            // 加入工作组
            new JoinGroup(groupInfo, socket_server, socket, data).join().then((res) => {
                // 加入工作组后实时笔记功能
                new groupRealNote(groupInfo, socket_server, socket, data).init()
            })
            
        })

        // 离开
        socket.on('leave', () => {
            socket.leave()
        })
    })
}