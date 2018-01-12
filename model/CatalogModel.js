let mongoose = require('../dao/connect');
mongoose.Promise = Promise;
let Schema = mongoose.Schema;

let CatalogSchema = new Schema({
    id : { type: Number },                      //目录id
    userid:{type:Number},                       //会员id
    name: {type: String},                       //目录名称
    num: {type: Number},                        //当前目录下博客数量
});

module.exports = mongoose.model("core_catalog_maint",CatalogSchema,"core_catalog_maint");

