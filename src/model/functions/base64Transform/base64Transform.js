const fs = require('fs')

module.exports = class {
    constructor ({ data, path }) {
        // 参数
        this.data = data ? data : '' // 文本或buffer
        this.path = path ? path : '' // 读写文件绝对路径
    }

    // 文字转base64 返回base64
    textToBase64 () {
        return Buffer.from(this.data).toString('base64')
    }
    // base64转文字 返回文本
    base64ToText () {
        return Buffer.from(this.data, 'base64').toString()
    }

    // 二进制文件流转base64 返回base64 或 按绝对路径读取文件转换base64 返回base64
    binaryToBase64 () {
        const self = this
        // 存储结果base64字符串
        let buf_base64 = ''
        // 如果给路径和文件名则进行读取文件buffer再转换成base64
        if (self.path) {
            return new Promise((resolve, reject) => {
                let streamRead = fs.createReadStream(self.path, { highWaterMark: 640 })
                streamRead.on('data', (chunk) => {
                    buf_base64 += new Buffer(chunk).toString('base64')
                })
                // 读取完毕返回字符串
                streamRead.on('end', (chunk) => {
                    resolve(buf_base64)
                })
                streamRead.on('error', (err) => {
                    reject(err)
                })
            })
        } 
        // 否则把data按照buffer转换成base64
        else if (self.data) {
            return Buffer.from(this.data).toString('base64')
        }
    }
    // base64转二进制文件 返回文件路径
    base64ToBinary () {
        const self = this
        const buf = new Buffer(self.data, 'base64')
        return new Promise((resolve, reject) => {
            fs.writeFile(self.path, buf, (err) => {
                if (err) {
                    console.log('base64Transform base64ToBinary fs.writeFile err =>', err)
                    reject(err)
                } else {
                    resolve(self.path)
                }
            })
        })
    }
}