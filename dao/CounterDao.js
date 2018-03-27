let Counter = require('../model/CounterModel');

function getCounter(name){
    return Counter.findOne({name:name}).select('value').exec();
}

function update(params){
    var conditions = {name:params.name};
    var update = {$set:{value:params.value}};
    return Counter.update(conditions,update);
}
function findOneAndUpdate(params){
    return Counter.findOneAndUpdate({name:params.name},{$set:{value:params.value}},{new: true});
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
exports.findOneAndUpdate = findOneAndUpdate;
