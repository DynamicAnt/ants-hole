/**
 *  数据库连接
 */

const mongoose = require('mongoose');
const DB_URL = "mongodb://39.108.153.3:27017/ants_hole";
// let options = {
//     server: {
//         auto_reconnect: true,
//         poolSize: 5
//     }
// };
mongoose.connect(DB_URL,{useMongoClient:true});

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

mongoose.Promise = Promise;

module.exports = mongoose;