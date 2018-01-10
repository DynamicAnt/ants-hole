let express = require('express');
let router = express.Router();
let blogService = require('../../../service/BlogService');
let catalogService = require('../../../service/CalalogService');

router.all('*',function(req,res,next){
    res.locals.item = 'blog';
    next();
});
router.get('/list',function(req,res,next){
    let pageSize = req.query.pageSize||10;
    let pageNum = req.query.pageNum||0;
    let page = {
        pageSize:pageSize,
        pageNum:pageNum
    };
    if(req.query.catalog_id){
        page.params = {
            catalog_id:req.query.catalog_id
        };
    }
    Promise.all([blogService.findAllBlogs(page),catalogService.findAllCatalogs()]).then(function(result){
        let catalogMap = {};
        for(let i=0;i<result[1].length;i++){
            let catalog = result[1][i];
            catalogMap[catalog.id] = catalog.name;
        }
        for(let i=0;i<result[0].length;i++){
            let blog = result[0][i];
            blog.catalogName = catalogMap[blog.catalog_id];
        }

        res.render('admin/blog/list',{
            blogList:result[0],
            catalogList:result[1],
            catalogMap:catalogMap,
            'title':'博客管理页'
        });
    });
});
router.get('/add',function(req,res,next){
    catalogService.findAllCatalogs().then(function(list){
        res.locals.opt = "add";
        res.render('admin/blog/new',{
            catalogList:list,
            'title':'新增博客'
        });
    });
});
router.post('/add',function(req,res,next){
    let blog = {
        title:req.body.title,
        content:req.body.content,
        catalog_id:req.body.catalog_id
    };

    blogService.insert(blog).then(function(data){
        res.redirect("/admin/blog/list");
    }).catch(function(message){
        res.render('admin/blog/new',{
            error:message,
            blog:blog,
            'title':'新增博客'
        });
    });
});
router.get('/update',function(req,res,next){
    let id = req.query.id;
    res.locals.opt = "update";
    Promise.all([blogService.findBlogById(id),catalogService.findAllCatalogs()]).then(function(result){
        res.render('admin/blog/new',{
            blog:result[0],
            catalogList:result[1],
            'title':'修改博客'
        });
    });
});
router.post('/update',function(req,res,next){
    let blog = {
        id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        catalog_id:req.body.catalog_id
    };
    blogService.update(blog).then(function(){
        res.redirect("/admin/blog/list");
    }).catch(function(message){
        res.render('admin/blog/new',{
            error:message,
            blog:{
                title:req.body.title,
                content:req.body.content,
                catalog_id:req.body.catalog_id
            },
            'title':'修改博客'
        });
    });
});

router.post('/delete',function(req,res,next){
    blogService.del(req.body.id).then(function(){
        res.json({flag:1});
    }).catch(function(message){
        res.json({
            flag:0,
            msg:message
        });
    });
});

module.exports = router;