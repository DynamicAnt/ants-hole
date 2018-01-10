let blogDao = require('../dao/BlogDao');

/**
 * 查询所用blog
 * @returns {*}
 */
function findAllBlogs(page){
    if(page.params){
        return blogDao.findBlogByParams(page);
    }else{
        return blogDao.getAllBlogs(page);
    }
}

function findBlogById(id){
    return blogDao.findBlogById(id);
}

function insert(blog){
    return blogDao.insert(blog);
}

function update(blog){
    return blogDao.update(blog);
}

function del(id){
    return blogDao.del(id);
}

exports.findAllBlogs = findAllBlogs;
exports.findBlogById = findBlogById;
exports.insert = insert;
exports.update = update;
exports.del = del;