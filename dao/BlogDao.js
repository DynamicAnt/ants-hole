let blogModel = require('../model/BlogModel');
let catalogDao = require('./catalogDao');
let counterDao = require('./counterDao');
const TASK = "blog";

let callback = function(err,rst){
    if(err){
        console.log("Error:",err);
    }
};

/**
 * 查询所有的目录信息
 */
function getAllBlogs(page){
    return blogModel.find({}).limit(page.pageSize).skip(page.pageNum).exec(callback);
}

function findBlogByParams(page){
    return blogModel.find(page.params).limit(page.pageSize).skip(page.pageNum).exec(callback);
}

function findBlogById(id){
    return blogModel.findOne({id:id}).exec(callback);
}

function insert(blog){
    console.log('blog insert',blog);
    return counterDao.getSequence(TASK).then(function(rst){
        let b = new blogModel({
            id: rst.value,
            title: blog.title,
            content: blog.content,
            catalog_id: blog.catalog_id,
            add_time:new Date(),
        });
        return b.save(function(){
            catalogDao.updateNum(blog.catalog_id);
        });
    });

}
function del(id){
    var conditions = {id: id};
    return blogModel.remove(conditions, callback);
}

function delBatch(ids){
    var conditions = {id: {$in:ids}};
    return blogModel.remove(conditions, callback);
}

function update(params){
    var conditions = {id:params.id};
    params.update_time = new Date();
    var update = {$set:params};
    return blogModel.update(conditions,update).exec(callback);
}
exports.getAllBlogs = getAllBlogs;
exports.findBlogByParams = findBlogByParams;
exports.findBlogById = findBlogById;
exports.insert = insert;
exports.update = update;
exports.del = del;



// del({
//     id:0
// });

// delBatch([1,2,3,4,5,6]);

// insert({
//     name:"javascript"
// })