let counterDao = require('./CounterDao');
let userModel = require('../model/UserModel');
const TASK = "user";
let callback = function(err,rst){
    if(err){
        console.log("Error:",err);
    }
};

function insert(user){
    return counterDao.getSequence(TASK).then(function(rst){
        let u = new userModel({
            id: rst.value,
            user_name: user.user_name,
            log_user_name: user.log_user_name,
            password: user.password,
            email: user.email,
            mobile:user.mobile,
            identity: user.identity,
        });
        return u.save(callback);
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