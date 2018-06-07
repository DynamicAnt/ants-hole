const UserDao = require('../dao/UserDao');
const LogonInfoDao = require('../dao/LogonInfoDao');
const ERROR_CONSTANTS = require('../constants/ErrorConstants.json');

function UserService(){

}

/**
 * 判断邮箱是否已经存在
 * @param email
 * @returns {Promise|RegExpExecArray}
 */
UserService.isEmailExisted = function(email){
    return UserDao.isEmailExisted(email).then(data=>{
        if(data){
            return Promise.reject(ERROR_CONSTANTS.EMAIL_EXIST);
        }else{
            return Promise.resolve();
        }
    });
};

UserService.isUserExisted = function(log_user_name){
    return LogonInfoDao.isUserExisted(log_user_name).then(data=>{
        if(data){
            return Promise.reject(ERROR_CONSTANTS.USERNAME_EXIST);
        }else{
            return Promise.resolve();
        }
    });
};

/**
 * 新增用户信息
 * @param user
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
UserService.add = function(user){
    return this.isEmailExisted(user.email).then(()=>{
        return this.isUserExisted(user.log_user_name).then(()=>{
            return UserDao.insert(user).then(data=>{
                return LogonInfoDao.register(user.log_user_name,user.password,data.id);
            });
        });
    }).catch(err=>{
        return Promise.reject(err);
    });

};

/**
 * 更新用户信息
 * @param user
 * @returns {*}
 */
UserService.updateUserInfo = function(user){
    user.update_time = new Date();
    return UserDao.update(user);
};

/**
 * 修改用户权限
 * @param id
 * @param power
 * @returns {*}
 */
UserService.updatePower = function(id, power){
    return this.updateUserInfo({id:id,power:power});
};

/**
 * 修改用户状态
 * @param id
 * @param status
 * @returns {*}
 */
UserService.updateStatus = function(id, status){
    return this.updateUserInfo({id:id,power:status});
};

/**
 * 查找用户
 * @param user
 * @returns {Promise|RegExpExecArray}
 */
UserService.find = function(user){
    return UserDao.find(user);
};

/**
 * 根据用户id查找用户信息
 * @param id
 * @returns {Promise|RegExpExecArray}
 */
UserService.findUserById = function(id){
    return UserDao.findOneByParams({id:id});
};

/**
 * 根据登陆名查找用户信息
 * @param logUserName
 * @returns {Promise|RegExpExecArray}
 */
UserService.findUserByLogUserName = function(logUserName){
    return UserDao.findOneByParams({log_user_name:logUserName});
};

module.exports = UserService;

