let SequenceDao = require('./CounterDao');
let LogonInfoModel = require('../model/LogonInfoModel');
const TASK = "logon";

/**
 * 判断登录名是否存在
 * @param logUsername
 */
function isUserExisted(params){
    return LogonInfoModel.findOne(params).exec();
}

/**
 * 注册
 * @param logUsername
 * @param password
 * @param userId
 */
function register(logUsername, password ,userId) {
    return SequenceDao.getSequence(TASK).then((rst)=>{
        return new LogonInfoModel({
            id: rst.value,
            user_id: userId,
            log_user_name: logUsername,
            password: password
        }).save();
    });
}

/**
 * 登陆
 * @param logUsername
 * @param password
 */
function logon(logUsername, password) {
    return isUserExisted({log_user_name:logUsername,password:password});
}

/**
 * 修改密码
 * @param logUsername
 * @param password
 */
function modifyPassword(logUsername, password) {
    let conditions = {log_user_name:logUsername};
    let update = {$set:{password:password}};
    return LogonInfoModel.findOneAndUpdate(conditions,update,{new:true});

}

function del(logUsername){
    return LogonInfoModel.remove({log_user_name:logUsername});
}

exports.isUserExisted = isUserExisted;
exports.logon = logon;
exports.register = register;
exports.modifyPassword = modifyPassword;
exports.del = del;