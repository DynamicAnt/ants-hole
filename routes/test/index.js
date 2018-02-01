var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/hbs/expression', function(req, res, next) {
    let article = {
        title:"This is an article",
        "#comments":[{title:"1",body:"111"},{title:"2",body:"222"},{title:"3",body:"333"}]
    };
    let articles = [];
    articles.push(article);
    articles.push({
        title:"invalid identifier",
        "#comments":[{title:"1",body:"111"},{title:"2",body:"222"},{title:"3",body:"333"}]
    });
    res.render('test/hbs/expression',{
        article:article,
        articles:articles,
        nav: [
            {url: 'foo', test: true, title: 'bar'},
            {url: 'bar'}
        ],
        escaped:'&lt;1&gt;2',
        title: "All about <p> Tags",
        body: "<p>This is a post about &lt;p&gt; tags</p>"
    })

});
router.get('/hbs/block/expression', function(req, res, next) {
    let peoples = [{
        name:"sean",
        books:[{
            name:"book name A"
        },{
            name:"book name B"
        }]
    },{
        name:"<div>red</div>",
        books:[{
            name:"book name 1"
        },{
            name:"book name 2"
        }]
    }];
    let colors = ["red","green","gray"];
    res.render('test/hbs/block_expression',{
        peoples:peoples,
        list:"this is a list string",
        colors:colors

    });
});

router.get('/hbs/partial', function(req, res, next) {
    let variablePartial = 'partialTest';
    let name = 'this is a basic partial';

    res.render('test/hbs/partial',{
        variablePartial:variablePartial,
        name:name,
        children:[{name:"index"},{name:"blog"},{name:"catalog"}]
    });
});

module.exports = router;
