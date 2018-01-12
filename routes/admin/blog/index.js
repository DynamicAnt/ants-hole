let express = require('express');
let router = express.Router();
let blogService = require('../../../service/BlogService');
let catalogService = require('../../../service/CalalogService');

router.all('*',function(req,res,next){
    res.locals.item = 'blog';
    next();
});

function pagination(req,res,next){
    let pageSize = req.query.pageSize||10;
    let pageNum = req.query.pageNum||0;
    let page = {
        pageSize:parseInt(pageSize),
        pageNum:parseInt(pageNum),
    };
    page.params = {
        userid:1
    }
    if(req.params.catalogid){
        page.params.catalog_id=req.params.catalogid;
    }
    req.body.page = page;
    next();
}
router.get('/list',pagination,function(req,res,next){
    blogService.getUserBlogs(req.body).then(function(result){
        result.title = '博客管理页';
        res.render('admin/blog/list',result);
    });
});
router.get('/:catalogid/list',pagination,function(req,res,next){
    blogService.getUserBlogs(req.body).then(function(result){
        result.title = '博客管理页';
        res.render('admin/blog/list',result);
    });
});
router.get('/add',pagination,function(req,res,next){
    let userid = req.body.page.params.userid;
    catalogService.findAllCatalogs(userid).then(function(list){
        res.locals.opt = "add";
        res.render('admin/blog/new',{
            catalogList:list,
            'title':'新增博客'
        });
    });
});
router.post('/add',pagination,function(req,res,next){
    let blog = {
        userid:req.body.page.params.userid,
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
router.get('/update',pagination,function(req,res,next){
    let id = req.query.id;
    res.locals.opt = "update";
    Promise.all([blogService.findBlogById(id),catalogService.findAllCatalogs(req.body.page.params.userid)]).then(function(result){
        res.render('admin/blog/new',{
            blog:result[0],
            catalogList:result[1],
            'title':'修改博客'
        });
    });
});
router.post('/update',pagination,function(req,res,next){
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