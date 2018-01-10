var hbs = require('hbs');
var moment = require('moment');

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
    var args = arguments;
    var key = argumnets[0];
    var params = arguments[1].hash;
    return "http://localhost:3000";
});

hbs.registerHelper('formatDate', function(date,formate){
    if(typeof formate !== "string"){
        formate = 'YYYY-MM-DD HH:mm:ss';
    }
    return new hbs.SafeString(moment(date).format(formate));
})



