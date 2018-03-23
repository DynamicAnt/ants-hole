let mongoose = require('../dao/connect');
let Schema = mongoose.Schema;

let LogonInfoSchema = new Schema({
    id:{type:Number},
    user_id:{type:Number},
    log_user_name:{type:String},
    password:{type:String},
    add_time:{type:Date},
    update_time:{type:Date}
});

exports = mongoose.model('LogonInfoModel', LogonInfoSchema, 'core_logon_info');
