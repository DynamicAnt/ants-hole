let url = require('url');
const querystring = require('querystring');
const config = require('../config/rewriter');

let inRules = [];
let outRules = [];

(function () {
    let keys = Object.keys(config);
    keys.forEach(function(key){
        let inRule = config[key].in;
        let outRule = config[key].out;
        inRules.push({
            regexp:new RegExp(inRule.from),
            replace:inRule.to
        });
        outRules.push({
            regexp:new RegExp(outRule.from),
            replace:outRule.to
        })
    });
})();

module.exports = {
    inbound:function(){
        return function rewrite(req,res,next){
            let queryStr = querystring.stringify(req.query);
            let src = url.parse(req.originalUrl);
            let pathname = src.pathname;
            inRules.some(function(rule){
                var ret = false;
                if(rule.regexp.test(pathname)){
                    req.url = pathname.replace(rule.regexp,rule.replace);
                    var str = req.url.match(/(.*)(\?.*)/);
                    if (str) {
                        queryStr = str[2]+'&'+queryStr;
                        req.query = querystring.parse(queryStr);
                    }
                    ret = true;
                }
                return ret;
            });
            next();
        }
    },
    outbound:function(src){
        let ret = src;
        outRules.some(function(rule){
            if (rule && rule.regexp.test(src)) {
                ret = src.replace(rule.regexp, rule.replace);
                return true;
            }
        })
        return ret;
    }
}