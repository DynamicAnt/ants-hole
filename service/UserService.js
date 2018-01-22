let userDao = require('../dao/UserDao');

/**
 * 判断邮箱是否已经存在
 * @param email
 * @returns {Promise<T>}
 */
function isEmailExist(email){
    return userDao.findUserByParams({email:email}).then((rst)=>{
        if(rst.length!==0){
            return Promise.reject("邮箱已存在");
        }else{
            return Promise.resolve("success");
        }
    }).catch((err)=>{
        return Promise.reject(err);
    })
}

/**
 * 判断登录名是否已经存在
 * @param logUsername
 * @returns {Promise<T>}
 */
function isLogusernameExist(logUsername){
    return userDao.findUserByParams({log_user_name:logUsername}).then((rst)=>{
        if(rst.length!==0){
            return Promise.reject("登录名已存在");
        }else{
            return Promise.resolve("success");
        }
    }).catch((err)=>{
        return Promise.reject(err);
    })
}

/**
 * 注册入口
 * @param user
 * @returns {*}
 */
function register(user){
    return userDao.insert(user);
}

/**
 * 登陆入口
 * @param logUsername
 * @param password
 * @returns {Promise<T>}
 */
function logon(logUsername,password){
    return userDao.findUserByParams({
        log_user_name:logUsername,
        password:password
    }).then((rst)=>{
        if(rst.length!==0){
            return Promise.reject("用户名或密码有误，请重新输入");
        }else{
            //TODO:计入session
            return Promise.resolve("success");
        }
    }).catch((err)=>{
        return Promise.reject(err);
    })
}

/**
 * 注销
 */
function logout(){

}

exports.isEmailExist = isEmailExist;
exports.register = register;
exports.logon = logon;
exports.logout = logout;