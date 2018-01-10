let express = require('express');
let router = express.Router();
let catalogService = require('../../../service/CalalogService');

router.get('/list',function(req,res,next){
    catalogService.findAllCatalogs().then(function(list){
        res.locals.item = "catalog";
        res.render('admin/catalog/list',{
            list:list,
            'title':'目录列表页'
        })
    });
});
router.post('/add',function(req,res,next){
    let name = req.body.name;
    catalogService.insert({name:name}).then(function(data){
        res.json({flag:1});
    }).catch(function(message){
        res.json({
            flag:0,
            msg:message
        });
    });
});

router.post('/update',function(req,res,next){
    let catalog = {
        id:req.body.id,
        name:req.body.name
    };
    catalogService.update(catalog).then(function(){
        res.json({flag:1});
    }).catch(function(message){
        res.json({
            flag:0,
            msg:message
        });
    });
});

router.post('/delete',function(req,res,next){
    catalogService.del(req.body.id).then(function(){
        res.json({flag:1});
    }).catch(function(message){
        res.json({
            flag:0,
            msg:message
        });
    });
});

module.exports = router;