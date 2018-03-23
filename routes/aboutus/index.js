/**
 * 关于我们
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    const buf = Buffer.from('runoob', 'ascii');
  res.render('index', { title: 'Express' });
});

module.exports = router;
