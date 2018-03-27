let mongoose = require('../dao/connect');
let Schema = mongoose.Schema;

let LogonInfoSchema = new Schema({
    id:{type:Number,required:true},
    log_user_name:{type:String,required:true},
    password:{type:String,required:true},
    add_time:{type:Date,required:true,default:new Date()},
    update_time:{type:Date,required:true,default:new Date()}
});

module.exports = mongoose.model('LogonInfoModel', LogonInfoSchema, 'core_logon_info');
