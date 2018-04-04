const express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('join', {
      title: 'Express',
      layout: 'layout/default'
  });
});

router.post('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
