/**
 * 博客相关业务
 * @type {*|createApplication}
 */
let express = require('express');
let router = express.Router();
let blogServive = require('../../service/BlogService');
let catalogServive = require('../../service/CalalogService');
/**
 * 所有的请求都会先走这个中间件
 */
router.use(function(req,res,next){
    res.locals.current = "blog";
    next();
});
router.all('*',function(req,res,next){
    res.locals.current = "blog";
    res.locals.catalogs = catalogServive.getCatalogList();
    next();
});
/**
 * 博客列表
 */
router.get('/', (req, res, next) =>{
    let pager = {
        pageNum:req.query.pageNum||1,
        pageSize:req.query.pageSize||10
    }
    let blogInfo = blogServive.getBlogList(pager);
    res.render('blog/index', {
        title: '博客列表',
        list:blogInfo.list,
    });
});
/**
 * 目录列表
 */
router.get('/column/:id', function(req, res, next) {
    let pager = {
        pageNum:req.query.pageNum||1,
        pageSize:req.query.pageSize||10
    }

    let list = blogServive.getBlogByColumnId(req.params.id);
    let catalog = catalogServive.getCatalogById(req.params.id);
    res.render('blog/index', {
        title: catalog.name+'博客列表',
        list:list,
    });
});
/**
 * 搜索结果
 */
router.get('/search', function(req, res, next) {
    let pager = {
        pageNum:req.query.pageNum||1,
        pageSize:req.query.pageSize||10
    }
    let blogInfo = blogServive.getBlogList(pager);
    res.render('blog/index', {
        title: '博客列表',
        list:blogInfo.list,
    });
});

/**
 * 博客详情
 */
router.get('/detail/:id', function(req, res, next) {
    let detail = blogServive.getBlogDetail(req.params.id);
    res.render('blog/detail', {
        title: detail.title,
        blog:detail
    });
});
/**
 * 跳转新增博客页面
 */
router.get('/add', function(req, res, next) {
    res.render('blog/new', {
        title: '新增'
    });
});
/**
 * 新增博客
 */
router.post('/add', function(req, res, next) {
    //TODO: 将博客内容保存到数据库
    console.log('title:',req.body.title);
    console.log('keyword:',req.body.keyword);
    console.log('content:',req.body.content);
    console.log('catalogid:',req.body.catalogid);

    res.redirect('/blog');
});

// router.route('/add')
//     .get(function(req, res, next) {})
//     .post(function(req, res, next) {});

let call1 = function(req,res,next){
    console.log('call1:',req.path);
    if(req.query.source && req.query.source !== "index"){
        next('route');
    }else{
        next();
    }
}
let call2 = function(req,res,next){
    console.log('call2');
    next();
}

router.get('/adv/index',call1,call2,function(req, res,next) {
    res.send('广告首页');
});
// router.get('/adc/:name',function(req, res,next) {
//     res.send('广告页面adc');
// });
router.get('/adv/:name',function(req, res,next) {
    res.send('广告页面');
});





module.exports = router;
