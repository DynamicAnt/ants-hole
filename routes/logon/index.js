let express = require('express');
let router = express.Router({});

let LogonService = require('../../service/LogonService');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logon', {
        current:'logon',
        title: '登录',
        layout: 'layout/default'
    });
});

router.post('/', function(req, res, next) {
  LogonService.logon(req.body.username,req.body.password).then((user)=>{
      req.session.user = user;
      res.json({
          code:0,
          nextUrl:req.body.nextUrl||'/'
      });
  }).catch(err=>{
      res.json(err);
  });
});

module.exports = router;
