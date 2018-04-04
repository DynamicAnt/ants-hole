let mongoose = require('../dao/connect');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    id : { type: Number,required:true },                    //id
    log_user_name:{type:String,required:true},
    nick_name: {type: String,required:true},                //昵称
    email:{type:String,required:true},                      //邮箱
    power:{type:Number,required:true,default:0},           //身份：0-游客，可以评论；1-博主，可以发博客；3-管理员，有管理权限
    status:{type:Number,required:true,default:1},          //状态：1-正常；2-封禁；0-删除
    add_time:{type:Date,required:true,default:new Date()},
    update_time:{type:Date,required:true,default:new Date()}
});

module.exports = mongoose.model("User",UserSchema,"core_user_maint");

