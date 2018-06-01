const express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('join', {
      current:'join',
      title: '注册',
      layout: 'layout/default'
  });
});

router.post('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
