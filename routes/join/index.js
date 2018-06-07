const express = require('express');
const UserService = require('../../service/UserService');
let router = express.Router({});


router.get('/', function(req, res, next) {
  res.render('join', {
      current:'join',
      title: '注册',
      layout: 'layout/default'
  });
});

router.post('/', function(req, res, next) {
    let user = {
        log_user_name:req.body.log_user_name,
        nick_name:req.body.log_user_name,
        email:req.body.email,
        password:req.body.password
    };
    UserService.add(user).then(()=>{
        req.session.user = user;
        res.json({code:0});
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;
