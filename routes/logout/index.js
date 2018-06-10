/**
 * 注销
 * @author qiumingsheng
 * @type {*|createApplication}
 */
let express = require('express');
let router = express.Router({});

router.get('/', function(req, res, next) {
    req.session.user = null;
    res.redirect('/logon');
});

module.exports = router;
