/**
 * 博客相关业务
 * @type {*|createApplication}
 */
let express = require('express');
let router = express.Router();
let blogService = require('../../service/BlogService');
let catalogService = require('../../service/CalalogService');
/**
 * 所有的请求都会先走这个中间件
 */
router.use(function(req,res,next){
    res.locals.current = "blog";
    next();
});
function pagination(req,res,next){
    let pageSize = req.query.pageSize||10;
    let pageNum = req.query.pageNum||0;
    let page = {
        pageSize:parseInt(pageSize),
        pageNum:parseInt(pageNum),
    };
    req.body.page = page;
    next();
}
/**
 * 博客列表
 */
router.get('/',pagination, (req, res, next) =>{
    blogService.findAllBlogs(req.body.page).then(function(result){
        res.render('blog/index',{
            list:result.list,
            totalNum:result.totalNum,
            'title':'博客列表'
        });
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});

/**
 * 用户博客列表页
 */
router.get('/:userid/list',pagination,(req,res,next)=>{
    //TODO:用户博客列表页
});
/**
 * 用户博客列表页-目录搜索结果页
 */
router.get('/:userid/:catalogid/list',pagination,(req,res,next)=>{
    //TODO:用户博客列表页-目录搜索结果页
});

/**
 * 博客详情
 */
router.get('/detail/:id', function(req, res, next) {
    blogService.findBlogById(req.params.id).then(function(result){
        res.render('blog/detail', {
            title: result.title,
            blog:result
        });
    });
});





module.exports = router;
