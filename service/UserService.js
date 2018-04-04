const UserDao = require('../dao/UserDao');
const LogonInfoDao = require('../dao/LogonInfoDao');
const crypto = require('crypto');


function UserService(){

}

/**
 * 判断邮箱是否已经存在
 * @param email
 * @returns {Promise|RegExpExecArray}
 */
UserService.isEmailExisted = function(email){
    return UserDao.isEmailExisted(email);
};

/**
 * 新增用户信息
 * @param user
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
UserService.add = function(user){
    return this.isEmailExisted(user.email)
        .then(data=>{
            if(data){
                return LogonInfoDao.isUserExisted(user.log_user_name)
            .then(UserDao.insert(user))
                    .then(data=>{
                        let password = crypto.createHash('md5').update(user.password).digest('hex');
                        return LogonInfoDao.register(user.log_user_name,password,data.id);
                    });
            }else{

            }
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

