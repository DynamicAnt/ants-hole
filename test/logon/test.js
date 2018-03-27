let chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

let LogonInfoDao = require('../../dao/LogonInfoDao');
let SequenceDao = require('../../dao/CounterDao');

describe('LogonInfoDao', function() {
    let params = {};
    let sequence = 0;
    before(function(){
        params = {
            log_user_name:"testname",
            password:"password",
        };
        return SequenceDao.getCounter("logon").then(data=>{
            sequence = data.value;
        });
    });
    after(function(){
        LogonInfoDao.del(params.log_user_name).then();
        return SequenceDao.findOneAndUpdate({name:'logon',value:sequence}).then();
    });
    describe('#isUserExisted()', function() {
        it('should return name with "mocha"', function() {
            return LogonInfoDao.isUserExisted({log_user_name:params.log_user_name})
                .should.eventually.be.a('null');
        });
    });
    describe('#register()', function() {
        it('should return name with "mocha"', function() {
            return LogonInfoDao.register(params.log_user_name,params.password,params.user_id)
                .should.eventually.have.property('log_user_name').equal(params.log_user_name);
        });
    });
    describe('#logon()', function() {
        it('should return 1', function() {
            return LogonInfoDao.logon(params.log_user_name,params.password)
                .should.eventually.have.property('log_user_name',params.log_user_name);
        });
    });
    describe('#update()', function() {
        it('should return 3 after update', function() {
            params.password = "newpassword";
            return LogonInfoDao.modifyPassword(params.log_user_name,params.password)
                .should.eventually.have.property('password').equal(params.password);
        });
    });
    describe('#del()', function() {
        it('should return 1 when finish delete', function() {
            return LogonInfoDao.del(params.log_user_name)
                .should.eventually.have.property('result').have.property('n').equal(1);
        });
    });
});

