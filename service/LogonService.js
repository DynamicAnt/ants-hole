let LogonInfoDao = require('../dao/LogonInfoDao');
let UserDao = require('../dao/UserDao');
const ERROR_CONSTANTS = require('../constants/ErrorConstants.json');

function LogonService(){

}

let logonCallback = function(data){
    if(data){
        return Promise.resolve(data);
    }else{
        return Promise.reject(ERROR_CONSTANTS.USER_IS_NOT_EXIST);
    }
};

let logonByUserName = function(logUsername,password){
    return LogonInfoDao.logonByUserName(logUsername,password).then(data=>{
        return logonCallback(data._doc);
    });
};

let logonByEmail = function(email,password){
    return LogonInfoDao.logonByEmail(email,password).then(data=>{
        return logonCallback(data);
    });
};
/**
 * 登陆
 * @param username
 * @param password
 * @returns {*}
 */
LogonService.logon = function(username,password){
    if(username.indexOf('@')!==-1){
        return logonByEmail(username,password);
    }else{
        return logonByUserName(username,password);
    }
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

module.exports = LogonService;