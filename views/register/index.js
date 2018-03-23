const express = require('express');
let router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('index');
});

router.post('/',(req,res,next)=>{

    res.redirect('/vo');
});

exports = router;