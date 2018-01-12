let mongoose = require('../dao/connect');
mongoose.Promise = Promise;
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    id : { type: Number },                    //id
    user_name: {type: String},                //昵称
    log_user_name: {type: String},            //登录名
    password:{type:String},                   //密码
    email:{type:String},                      //邮箱
    mobile:{type:String},                     //手机
    identity:{type:Number}                    //身份 1-管理员、2-普通用户
});

module.exports = mongoose.model("core_user_maint",UserSchema,"core_user_maint");

