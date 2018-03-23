let express = require('express');
let router = express.Router();
// var fr = require('fresh');

function isEmpty(value){
   for (var t in value){
      return !1;
   }
   return !0;
}

router.get('/request',function(req,res,next){
   let cookies = "empty";
   let signedCookies = "empty";
   if(req.cookies&&!isEmpty(req.cookies)){
      console.log("req.cookies:",req.cookies);
      cookies = JSON.stringify(req.cookies);
   }
   if(req.signedCookies&&!isEmpty(req.signedCookies)){
      console.log("req.cookies:",req.signedCookies)
      signedCookies = JSON.stringify(req.signedCookies);
   }
    req.path = '3';
    // req.url = '4';
   let show = [
       {name:"req.baseUrl",value:req.baseUrl},
       {name:"req.path",value:req.path},
       {name:"req.url",value:req.url},
       {name:"req.originalUrl",value:req.originalUrl},
       {name:"req.route",value:JSON.stringify(req.route)},
       {name:"req.cookies",value:cookies},
       {name:"Signed Cookies",value:signedCookies},
       {name:"req.fresh",value:req.fresh,flag:true,url:"/monitor/fresh"},
       {name:"req.stale",value:req.stale},
       {name:"req.hostname",value:req.hostname},
       {name:"req.ip",value:req.ip},
       {name:"req.ips",value:req.ips},
       {name:"req.protocol",value:req.protocol},
       {name:"req.secure",value:req.secure},
       {name:"req.xhr",value:req.xhr},
       {name:"req.get('Content-Type')",value:req.get('Content-Type')},
       {name:"req.get('connection')",value:req.get('connection')},
       {name:"req.headers",value:JSON.stringify(req.headers)},
       {name:"req.is('html')",value:req.is('html')},
       {name:"app['trust proxy']",value:req.app.get('trust proxy')},
   ];
   res.render('monitor/index',{
      title:req.app.locals.appName+req.app.locals.appVersion,
      properties:show
    });
});

router.get('/response',function(req,res,next){
    res.locals.router = "response";
    let show = [
        {name:"res.headersSent",value:res.headersSent},
        {name:"res.locals.router",value:res.locals.router},
        {name:"res.attachment",value:"",flag:true,url:"/admin/file/attachment"},
        {name:"res.download",value:"",flag:true,url:"/admin/file/download"},
        {name:"res.format",value:"",flag:true,url:"/admin/file/format"},
        {name:"res.links",value:res.get('Link')||"empty",flag:true,url:"/monitor/properties?property=Link"},
        {name:"res.location",value:res.get('Location')||"empty",flag:true,url:"/monitor/properties?property=Location"},
        {name:"res.vary",value:res.get('Vary')||"empty",flag:true,url:"/monitor/properties?property=Vary"},

    ];
    res.render('monitor/index',{
        title:"response",
        properties:show
    },function(err,html){
        if(err){
            console.log(err);
        }else{
            res.send(html);
        }
    });
});

router.get('/send',function(req,res,next){
   if(req.query.type==='buffer') {
       res.send(new Buffer('<p>some html</p>'));
   }else if(req.query.type==='string') {
       res.send('<p>some html</p>');
   }else if(req.query.type==='array') {
       res.send([1,2,3]);
   }else if(req.query.type==='json') {
       res.json([1,2,3]);
   }else if(req.query.type==='jsonp') {
       //http://localhost:3000/monitor/send?type=jsonp&callback=?
       res.jsonp([1,2,3]);
   }else if(req.query.type==='render') {
       res.render('monitor/index',{
           title:"response",
       },function(err,html){
          if(err){
              console.log('err:',err);
          } else{
              console.log('html:',html);
          }
          // res.end()
          res.send(html);
       });
   }else{
       Buffer()
       res.end();
   }
});

router.get('/status',function(req,res,next){
   var status = req.query.status||200;
   res.sendStatus(status);
   // res.status();
});

router.get('/properties',function(req,res,next){
    var property = req.query.property;
    if(property==="Link"){
        res.links({
            next: 'http://api.example.com/users?page=2',
            last: 'http://api.example.com/users?page=5'
        });
    }else if(property==="Location"){
        res.location('/foo/bar');
    }else if(property==="Vary"){
        res.vary('vary-test');
    }
res.set()

   res.sendStatus(200);
});

router.get('/fresh',function(req,res,next){
    // var test = fr(req,res);
    let show = [
        {name:"req.fresh",value:req.fresh},
        {name:"req.stale",value:req.stale},
        {name:"req['cache-control']",value:req['cache-control']},
        {name:"req['if-none-match']",value:req['if-none-match']},
        {name:"req['if-modified-since']",value:req['if-modified-since']},
        {name:"res['last-modified']",value:res['last-modified']},
        {name:"res['etag']",value:res['etag']}
    ];
    res.render('monitor/index',{
        title:"req.fresh",
        properties:show,
        section:"fresh"
    });
});

router.get('/params/*/test/*',function(req,res,next){
    let show = [];
    if(!isEmpty(req.params)){
        for(let i in req.params) {
            show.push({
                name:'params['+i+']',
                value:req.params[i]
            });
        }
    }

    res.render('monitor/index',{
        title:"req.params",
        properties:show,
        section:"params"
    });
});


module.exports = router;