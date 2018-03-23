let mongoose = require('../dao/connect');
// let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CounterSchema = new Schema({
    name : {type: String,required:true},                    //名称
    value: {type: Number,required:true,default:0}                      //序列号
});

module.exports = mongoose.model("counter",CounterSchema,"counter");

