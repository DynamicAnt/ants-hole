var express = require('express');
var router = express.Router();

// router.param('id',function(req,res,next,id){
//   console.log("id:",id);
//   next();
// });
// router.param('name',function(req,res,next,name){
//   console.log("name:",name);
//   next();
// });
router.param(['name'],function(req,res,next,value){
    console.log("1-id:",value);
    console.log("1-name:",value);
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
    res.links({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
    });
    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
    res.append('Warning', '199 Miscellaneous warning');


    res.vary('User-Agent').send('Hello');
    console.log(res.headersSent); // false
});

router.get('/files/0', function(req, res, next) {
    res.attachment('files/tup.png');
    res.send();
});
router.get('/files/1', function(req, res, next) {
    res.download('files/tup.png');
});
router.get('/files/2', function(req, res, next) {
    res.download('files/tup.png','tupian.png');
});
router.get('/files/3', function(req, res, next) {
    res.download('files/tup.png','tupianing.png',function(err){
        if(err){
            console.log('err:',err);
        }else{
            console.log('download finish');
        }
    });
});
module.exports = router;
