let CatalogModel = require('../model/CatalogModel');
let CounterDao = require('./CounterDao');
const TASK = "catalog";

let callback = function(err,rst){
    console.log("This is in catalogDao");
    if(err){
        console.log("Error:",err);
    } else{
        // console.log("rst:",rst);
    }
};

/**
 * 查询所有的目录信息
 */
function getAllCatalogs(userid){
    return CatalogModel.find({userid:userid}).exec();
}

function findOneByName(name){
    return CatalogModel.find({name:name}).exec(callback);
}

function insert(catalog){
    return CounterDao.getSequence(TASK).then(function(rst){
        console.log("rst:"+rst);
        let cata = new CatalogModel({
            id: rst.value,
            userid:catalog.userid,
            name:catalog.name,
            num:0
        });
        return cata.save();
    });

}
function del(id){
    var conditions = {id: id};
    return CatalogModel.remove(conditions, callback);
}

function delBatch(ids){
    var conditions = {id: {$in:ids}};
    return CatalogModel.remove(conditions, callback);
}

function update(params){
    var conditions = {id:params.id};
    var update = {$set:params};
    let b  = CatalogModel.update(conditions,update).exec(callback);
    console.log("b:",b);
    console.log('promise:');
    return b;
}
function updateNum(id){
    console.log("catalog id",id);
    return CatalogModel.findOneAndUpdate(
        {id : id},
        {$inc:{num:1}},
        {new: true}).exec(callback);
}
exports.getAllCatalogs = getAllCatalogs;
exports.findOneByName = findOneByName;
exports.insert = insert;
exports.update = update;
exports.updateNum = updateNum;
exports.del = del;

// updateNum(2);


// del({
//     id:0
// });

// delBatch([1,2,3,4,5,6]);

// insert({
//     name:"javascript"
// })