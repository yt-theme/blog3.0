module.exports = class {
    constructor (datas) {
        // 参数
        this.datas = datas

    }

    // 文字转base64
    textToBase64 () {
        return Buffer.from(this.datas).toString('base64')
    }
    // base64转文字
    base64ToText () {
        return Buffer.from(this.datas, 'base64').toString()
    }

    // 二进制文件转base64
    binaryToBase64 () {

    }
    // base64转二进制文件
    base64ToBinary () {

    }
}