
let express = require('express'),
    multer = require('multer');
let router = express.Router();
let upload = multer({'dest':'public/upload/'});
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/upload/");
    },
    filename:function(req,file,cb) {
        let name = file.originalname;
        let arr = name.split('.');
        let curName = arr[0]+new Date().getTime()+'.'+arr[1];
        cb(null,curName);
    }
});
let upload2 = multer({storage:storage});


router.all('*',function(req,res,next){
    res.locals.item = 'file';
    next();
});

function validateFile(req,res,next) {
    let rst = req.accepts(["image/jpg","image/jpeg"]);
    if(rst){
        next();
    }else{
        res.send('仅允许上传jpg格式的图片');
    }
}

router.get('/',function(req,res,next){
    res.render("admin/file/test",{
        title:"上传文件"
    });
});

router.get('/attachment',function(req,res,next){
    res.attachment('files/tup.png');
    res.send("ok");

});
router.get('/download',function(req,res,next){
    // res.download('files/tup.png');
    // res.download('files/tup.png','logo.png');
    res.download('files/tup.png','logo.png',function(err){
        if(err){
            console.log("file download:",err);
        }else{
            console.log("file download success");
        }
    });
});

router.get('/sendfile',function(req,res,next){
    res.sendFile()
});

router.get('/format',function(req,res,next){
    console.log(req.accepts());
    console.log(req.accepts('image/png'));
   res.format({
       'text/plain': function(){
           res.send('hey');
       },

       'text/html': function(){
           res.send('<p>hey</p>');
       },

       'application/json': function(){
           res.send({ message: 'hey' });
       },
       'image/png': function(){
           res.send('this is png');
       },

       'default': function() {
           // log the request and respond with 406
           res.status(406).send('Not Acceptable');
       }
   });
});

router.post('/format',function(req,res,next){
    console.log(req.accepts());
    console.log(req.accepts('image/png'));
    res.format({
        'text/plain': function(){
            res.send('hey');
        },

        'text/html': function(){
            res.send('<p>hey</p>');
        },

        'application/json': function(){
            res.send({ message: 'hey' });
        },
        'image/png': function(){
            res.send('this is png');
        },

        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });
});


//此时没有指定文件存储的文件名和后缀名，因此multer会生成一个随机的文件名，且不带后缀名
router.post('/upload_single',validateFile,upload.single('txt'),function(req,res,next){
    console.log("req.get('Content-Type'):",req.get('Content-Type'));
    console.log("req.is('html'):",req.is('html'));
    res.end('上传成功');
});

//利用storage改写了存储路径和文件名称
router.post('/upload_single2',validateFile,upload2.single('txt'),function(req,res,next){
    res.end('上传成功');
});

module.exports = router;