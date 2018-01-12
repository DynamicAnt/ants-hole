let blogDao = require('../dao/BlogDao');
let catalogService = require('./CalalogService');

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

function getUserBlogs(params){
    let page = params.page;
    let userid = params.page.params.userid;
    return Promise.all([findAllBlogs(page),catalogService.findAllCatalogs(userid)]).then(function(result){
        let catalogMap = {};
        for(let i=0;i<result[1].length;i++){
            let catalog = result[1][i];
            catalogMap[catalog.id] = catalog.name;
        }
        for(let i=0;i<result[0].length;i++){
            let blog = result[0][i];
            blog.catalogName = catalogMap[blog.catalog_id];
        }
        return Promise.resolve({
            blogList:result[0],
            catalogList:result[1],
            catalogMap:catalogMap
        })
    });
}

exports.findAllBlogs = findAllBlogs;
exports.findBlogById = findBlogById;
exports.getUserBlogs = getUserBlogs;
exports.insert = insert;
exports.update = update;
exports.del = del;