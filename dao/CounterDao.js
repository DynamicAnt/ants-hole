let Counter = require('../model/CounterModel');

let callback = function(err,rst){
    if(err){
        console.log("Error:",err);
    } else{
        console.log("rst:",rst);
    }
};

function getCounter(name){
    var query = Counter.findOne({name:name});
    query.select('value');
    query.exec(function(err,rst) {
        if(err){
            console.log("Error:",err);
        } else{
            console.log("getCounter rst:",rst);
            return rst.value;
        }
    });
}

function update(params){
    var conditions = {name:params.name};
    var update = {$set:{value:params.value}};
    return Counter.update(conditions,update,callback);
}
function insert(params){
    var counter = new Counter({
        "name":params.name,
        "value":params.value
    });
    return counter.save();
}
function del(params){
    var conditions = {name: params.name};
    return Counter.remove(conditions);
}
function getSequence(name){
    return Counter.findOneAndUpdate(
        {name : name},
        {$inc:{value:1}},
        {new: true}
    ).exec();
}

exports.getCounter = getCounter;
exports.getSequence = getSequence;
exports.insert = insert;
exports.update = update;
exports.del = del;

// update({
//    name:"catalog",
//    value:1
// });
// insert({
//     "name":"user",
//     "value":2
// });

// getCounter("catalog");
// getSequence("catalog");