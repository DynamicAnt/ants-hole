var hbs = require('hbs');
var moment = require('moment');
const urlFactory = require('../config/frontUrlFactory');
const rewriter = require('./rewriter');

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
})

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


