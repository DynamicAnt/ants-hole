let UserModel = require('../model/UserModel');
let SequenceDao = require('./CounterDao');
const extend = require('extend');
const TASK = "user";

function UserDao(){

}

/**
 * 查询email是否已经被使用
 * @param email
 * @returns {Promise|RegExpExecArray}
 */
UserDao.isEmailExisted = function(email){
    return UserModel.findOne({email:email}).exec();
};

/**
 * 新增用户
 * @param user
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
UserDao.insert = function(user){
    return SequenceDao.getSequence(TASK).then(data=>{
        return new UserModel(extend(user,{id:data.value})).save();
    });
};

/**
 * 查找匹配条件的所有用户
 * @param user
 * @returns {Promise|RegExpExecArray}
 */
UserDao.find = function(user){
    return UserModel.find(user).exec();
};

/**
 * 查找符合条件的用户，只返回一条
 * @param user
 * @returns {Promise|RegExpExecArray}
 */
UserDao.findOneByParams = function(user){
    return UserModel.findOne(user).exec();
};

/**
 * 修改用户信息
 * @param user
 * @returns {*}
 */
UserDao.update = function(user){
    return UserModel.findOneAndUpate({id:user.id},{$set:user},{new:true});
};

/**
 * 物理删除用户信息
 * @param id
 * @returns {*}
 */
UserDao.del = function(id) {
    return UserModel.remove({id:id});
};

module.exports = UserDao;