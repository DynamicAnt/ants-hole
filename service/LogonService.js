let LogonInfoDao = require('../dao/LogonInfoDao');
let UserDao = require('../dao/UserDao');

function LogonService(){

}

/**
 * 登陆
 * @param logUsername
 * @param password
 * @returns {*}
 */
LogonService.logon = function(logUsername,password){
    return LogonInfoDao.logon(logUsername,password);
};

/**
 * 注销
 * @returns {boolean}
 */
LogonService.logout = function(){
    return true;
};

LogonService.isExisted = function(logUsername){
    return LogonInfoDao.isUserExisted(logUsername).then((user)=>{

    });
};

/**
 * 修改密码
 * @param logUsername
 * @param password
 * @returns {boolean}
 */
LogonService.modifyPassword = function(logUsername,password){
    return false;
}

LogonService.register = function(user){
    return UserDao.insert(user).then((userInfo)=>{
        return Promise.resolve({});
    }).catch((err)=>{
        return Promise.reject(err);
    });
}

exports = LogonService;