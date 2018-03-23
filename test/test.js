const assert = require('assert');
let SequenceDao = require('../dao/CounterDao');

describe('CounterDao', function() {
    describe('#insert()', function() {
        it('should return -1 when the value is not present', function() {
            var param = {name:'mocha',value:1};
            return new SequenceDao.insert({name:'mocha',value:1}).then((data)=>{
                assert.equal(param.name,'1');
                console.log('insert data:',data);
            }).catch((err)=>{
                console.log('error:',err);
            });
        });
    });
    describe('#del()', function() {
        it('should return -1 when the value is not present', function() {
            return new SequenceDao.del({name:'mocha'}).then((data)=>{
                // console.log('delete data:',data);
                assert.equal(2,data.result.n);
            }).catch((err)=>{
                console.log('error:',err);
            });
        });
    });
});

