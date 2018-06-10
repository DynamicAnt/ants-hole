let BlogModel = require('../model/BlogModel');
let CatalogDao = require('./CatalogDao');
let CounterDao = require('./CounterDao');
const TASK = "blog";

BlogDao = function(){

};

/**
 * 查询所有的目录信息
 */
BlogDao.getAllBlogs = function (page){
    return BlogModel.find({}).limit(page.pageSize).skip((page.pageNum-1)*page.pageSize).exec();
};


BlogDao.findBlogByParams = function(page){
    return BlogModel.find(page.params).limit(page.pageSize).skip(page.pageNum).exec();
};

BlogDao.findBlogById = function(id){
    return BlogModel.findOne({id:id}).exec();
};

BlogDao.insert = function(blog){
    return CounterDao.getSequence(TASK).then(function(rst){
        return new BlogModel({
            id: rst.value,
            c_id: blog.c_id,
            title: blog.title,
            desc: blog.desc,
            status:blog.status
        }).save().then(()=>{
            return CatalogDao.updateNum(blog.catalog_id);
        });
    });

};
BlogDao.del = function(id){
    let conditions = {id: id};
    return BlogModel.remove(conditions);
};

BlogDao.delBatch = function(ids){
    let conditions = {id: {$in:ids}};
    return BlogModel.remove(conditions);
};

BlogDao.update = function(params){
    let conditions = {id:params.id};
    params.update_time = new Date();
    let update = {$set:params};
    return BlogModel.update(conditions,update).exec();
};

BlogDao.getTotalNumber = function(params){
    if(!params){
        params = {};
    }
    return BlogModel.count(params,callback);
};

module.exports = BlogDao;