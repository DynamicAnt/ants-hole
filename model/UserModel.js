let mongoose = require('../dao/connect');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    id : { type: Number },                    //id
    nick_name: {type: String},                //昵称
    email:{type:String},                      //邮箱
    power:{type:Number},                      //身份： 0-游客，可以评论；1-博主，可以发博客；3-管理员，有管理权限
    status:{type:Number},                     //状态：1-正常；0-删除
    add_time:{type:Date},
    update_time:{type:Date}
});

module.exports = mongoose.model("core_user_maint",UserSchema,"core_user_maint");

