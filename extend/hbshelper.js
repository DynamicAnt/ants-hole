var hbs = require('hbs');
var moment = require('moment');
const urlFactory = require('../config/frontUrlFactory');
const rewriter = require('./rewriter');

// hbs.registerPartials('./views/partials/test');
hbs.registerPartials('./views/partials');
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('compare', function(par1,par2,options) {
    if(par1 == par2){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

hbs.registerHelper('addOne', function(index) {
    return index+1;
});

hbs.registerHelper('url', function(src) {
    var params = {};
    switch (arguments.length){
    case 2:params = arguments[1].hash;break;
    case 3:params = arguments[1];break;
    }

    let path = urlFactory[src];
    let url = typeof path==='string'?path:path.call(urlFactory,params);
    url = rewriter.outbound(url);

    return url;
});

hbs.registerHelper('formatDate', function(date,formate){
    if(typeof formate !== "string"){
        formate = 'YYYY-MM-DD HH:mm:ss';
    }
    return new hbs.SafeString(moment(date).format(formate));
});

hbs.registerHelper('list', function(datas,options){
    let html= "<ul>";
    if(datas){
        for(let i=0;i<datas.length;i++){
            html = html+"<li>"+datas[i].name+"</li>";
        }
    }
    html += "</ul>";
    return html;
});
hbs.registerHelper('list1', function(datas,options){
    let html= "<ul>";
    if(datas){
        for(let i=0;i<datas.length;i++){
            html = html+"<li>"+options.fn(datas[i])+"</li>";
        }
    }
    html += "</ul>";
    return html;
});
hbs.registerHelper('list2', function(context,options){
    let html= "<ul>",data;
    if(options.data){
        data = options.data;
    }
    if(context){
        for(let i=0;i<context.length;i++){
            data.index = i+1;
            html = html+"<li>"+options.fn(context[i],{data:data})+"</li>";
        }
    }
    html += "</ul>";
    return html;
});
hbs.registerHelper('raw-helper', function(options) {
    return options.fn();
});
hbs.registerPartial('basicPartial', '{{name}}');
hbs.registerHelper('dynamicPartial', function(number) {
    if(number&&number===1){
        return 'partialTest'
    }else{
        return 'dynamicPartialTest';
    }

});


hbs.registerHelper('paginate', function(totalNum, pageSize) {
    if(totalNum == 0 || totalNum == '') {
        return;
    }
    let pageNum =  Math.ceil(totalNum/pageSize);
    let html = '<a href="" class="page prev js-prev"> << </a>';
    for(let i=1; i<=pageNum; i++){
        html += '<a class="page js-pageNum" href="?pageSize='+pageSize+'&pageNum='+i+'">'+i+'</a>'
    }
    html += '<a href="" class="page next js-next"> >> </a>'
    return html;
})


