let chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
let SequenceDao = require('../dao/CounterDao');

describe('CounterDao', function() {
    before(function(){
        new SequenceDao.del({name:'mocha'}).then();
    });
    describe('#insert()', function() {
        it('should return name with "mocha"', function() {
            var param = {name:'mocha',value:1};
            return new SequenceDao.insert(param).should.eventually.have.property('name').equal(param.name);
        });
    });
    describe('#query()', function() {
        it('should return 1', function() {
            return new SequenceDao.getCounter('mocha').should.eventually.have.property('value').equal(1);
        });
    });
    describe('#update()', function() {
        it('should return 3 after update', function() {
            var params = {name:'mocha',value:3};
            return new SequenceDao.findOneAndUpdate(params).should.eventually.have.property('value').equal(params.value);
        });
    });
    describe('#del()', function() {
        it('should return 1 when finish delete', function() {
            let pro = new SequenceDao.del({name:'mocha'});
            return pro.should.eventually.have.property('result').have.property('n').equal(1);
        });
    });
});

