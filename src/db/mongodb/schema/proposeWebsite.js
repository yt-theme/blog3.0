module.exports = (mongoose) => {
    return mongoose.Schema({
        // url
        url:    { type: String },
        // 标签
        label:  { type: String },
    })
}