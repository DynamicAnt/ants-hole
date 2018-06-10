let mongoose = require('../dao/connect');
let Schema = mongoose.Schema;

let CatalogSchema = new Schema({
    id : { type: Number },                      //目录id
    name: {type: String},                       //目录名称
    num: {type: Number},                        //当前目录下博客数量
    add_time:{type:Date,required:true,default:new Date()},
    update_time:{type:Date,required:true,default:new Date()}
});

module.exports = mongoose.model("CatalogModel",CatalogSchema,"catalog");

