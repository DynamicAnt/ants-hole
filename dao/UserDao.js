let counterDao = require('./CounterDao');
let userModel = require('../model/UserModel');
let LogonInfoDao = require('./LogonInfoDao');
const TASK = "user";
let callback = function(err,rst){
    if(err){
        console.log("Error:",err);
    }
};

function insert(user){
    return counterDao.getSequence(TASK).then((rst)=>{
        let u = new userModel({
            id: rst.value,
            nick_name: user.nick_name,
            status: 1,
            email: user.email,
            power: user.power,
            add_time: new Date(),
            update_time: new Date()
        });
        return u.save().then((userInfo)=>{
            return LogonInfoDao.register(user.log_user_name,user.password,userInfo.user_id);
        });
    });
}

function findUserByParams(params) {
    return userModel.findOne(params).exec(callback);
}

function update(params){
    var conditions = {id:params.id};
    var update = {$set:params};
    return userModel.update(conditions,update).exec(callback);
}
exports.insert = insert;
exports.findUserByParams = findUserByParams;
exports.update = update;