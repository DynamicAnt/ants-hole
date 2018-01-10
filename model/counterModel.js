let mongoose = require('../dao/connect');
mongoose.Promise = Promise;
let Schema = mongoose.Schema;

let CounterSchema = new Schema({
    name : {type: String},                    //id
    value: {type: Number}                      //目录名称
});

module.exports = mongoose.model("counter",CounterSchema,"counter");

