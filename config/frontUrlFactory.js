const querystring = require('querystring');
function serilize(params,keys) {
    if(keys){
        if(typeof keys==='string'){
            key = keys;
            keys = [];
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            delete params[keys[i]];
        }

    }
    return params?"?"+querystring.stringify(params):"";
}
module.exports = {
    "blog.list": function(params){
        return "/blog" + serilize(params);
    },
    "blog.detail":function(params){
        return "/blog/"+params.blogId+serilize(params,"blogId");
    }
}