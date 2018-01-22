const querystring = require('querystring');
function serilize(params) {
    return params?"?"+querystring.stringify(params):"";
}
module.exports = {
    "blog.list": function(params){
        return "/blog" + serilize(params);
    },
    "blog.detail":function(params){
        return "/blog/"+params.blogId+serilize(params);
    }
}