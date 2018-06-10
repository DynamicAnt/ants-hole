let mongoose = require('../dao/connect');
let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    id: Number,
    c_id: Number,
    title: String,
    desc: String,
    status:Number,
    add_time:{type:Date,required:true,default:new Date()},
    update_time:{type:Date,required:true,default:new Date()}
});

module.exports = mongoose.model('BlogModel',BlogSchema,'blog');