class Model {
    constructor (obj) {
        // 数据库对象 && schema && 表名
        this.mongoose        = obj['mongoose']
        this.schema          = obj['schema']
        this.collection_name = obj['collection_name']
        this.collection      = obj['collection']
        // 模型
        this.model           = this.mongoose.model(this.collection_name, this.schema, this.collection )
    }
    insertOne (document) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return new model(
                document
            ).save((err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else {
                    resolve(result)
                    console.log('增加成功 =>', result)
                }
            })
        })
    }
    insertMany (array) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.insertMany(array, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else {
                    resolve(result)
                    console.log('增加成功 =>', result)
                }
            })
        })
    }
    updateOne (query, update) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.updateOne(query, update, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else if (result["ok"] === 1) {
                    resolve(result)
                    console.log('更新 =>', result)
                } else {
                    reject(err)
                }
            })
        })
    }
    updateMany (query, update) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.updateMany(query, update, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else if (result["ok"] === 1) {
                    resolve(result)
                    console.log('更新 =>', result)
                } else {
                    reject(err)
                }
            })
        })
    }
    deleteOne (query) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.deleteOne(query, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else if (result["ok"] === 1) {
                    resolve(result)
                    console.log('删除 =>', result)
                } else {
                    reject(err)
                }
            })
        })
    }
    deleteMany (query) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.deleteMany(query, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else if (result["ok"] === 1) {
                    resolve(result)
                    console.log('删除 =>', result)
                } else {
                    reject(err)
                }
            })
        })
    }
    findOne (query) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.findOne(query, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else {
                    resolve(result)
                    console.log('查找 =>', result)
                }
            })
        })
    }
    find (query, fields, options) {
        const model = this.model
        return new Promise((resolve, reject) => {
            return model.find(query, fields, options, (err, result) => {
                if (err) {
                    reject(err)
                    return false
                } else {
                    resolve(result)
                    console.log('查找 =>', result)
                }
            })
        })
    }
}

module.exports = {
    Model
}