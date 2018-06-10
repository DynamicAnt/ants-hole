let CounterDao = require('./CounterDao');
let CatalogModel = require('../model/CatalogModel');
const TASK = "catalog";

CatalogDao = function(){

}
/**
 * 查询所有的目录信息
 */
CatalogDao.getAllCatalogs = function(){
    return CatalogModel.find().exec();
};

CatalogDao.findOneById = function(id){
    return CatalogModel.find({id:id}).exec();
};

CatalogDao.insert = function(catalog){
    return CounterDao.getSequence(TASK).then(function(rst){
        return new CatalogModel({
            id: rst.value,
            name:catalog.name,
            num:0
        }).save();
    });

};
CatalogDao.del = function(id){
    var conditions = {id: id};
    return CatalogModel.remove(conditions, callback);
}

CatalogDao.update = function(params){
    var conditions = {id:params.id};
    var update = {$set:params};
    let b  = CatalogModel.update(conditions,update).exec();
    return b;
};

CatalogDao.updateNum = function(id){
    return CatalogModel.findOneAndUpdate(
        {id : id},
        {$inc:{num:1}},
        {new: true}).exec(callback);
};
module.exports = CatalogDao;