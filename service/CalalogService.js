let catalogDao = require('../dao/catalogDao');

/**
 * 查询所用目录
 * @returns {*}
 */
function findAllCatalogs(userid){
    return catalogDao.getAllCatalogs(userid);
}
function findOneByName(name){
    console.log('检查目录是否存在 ',name);
    return catalogDao.findOneByName(name).then(function(rst){
        console.log('findOneByName rst',rst);
        if(rst.length!==0){
            return Promise.reject("该目录名称已存在");
        }else{
            return Promise.resolve("success");
        }
    }).catch(function(err) {
        return Promise.reject(err);
    });
}
function insert(catalog){
    return findOneByName(catalog.name).then(function(){
        return catalogDao.insert(catalog);
    }).catch(function(err){
        return Promise.reject(err);
    })

}

function update(catalog){
    return catalogDao.update(catalog);
}

function del(id){
    return catalogDao.del(id);
}

exports.findAllCatalogs = findAllCatalogs;
exports.insert = insert;
exports.update = update;
exports.del = del;