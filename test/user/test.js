let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

let UserDao = require('../../dao/UserDao');
let SequenceDao = require('../../dao/CounterDao');

describe('UserDao', function() {
    let user,user_en;
    let sequence = 0;
    before(function(){
        return SequenceDao.getCounter("user").then(data=>{
            sequence = data.value;
            user = {
                id:sequence+1,
                nick_name:'动感蚂蚁',
                email:'20232386483a@qq.com',
                log_user_name:"testname",
                power:0,
                status:1
            };
            user_en = {
                id:sequence+2,
                nick_name:'sean',
                email:'neimaozhan@made-in-china.com',
                log_user_name:"neimaozhan",
                power:0,
                status:1
            };
        });
    });
    after(function(){
        UserDao.del(user.id).then();
        UserDao.del(user_en.id).then();
        return SequenceDao.findOneAndUpdate({name:'user',value:sequence}).then(data=>{
            console.log('after sequence:',data.value);
        });
    });
    describe('#insert()', function() {
        it('should return user.id', function() {
            return UserDao.insert(user)
                .should.eventually.have.property('id').equal(user.id);
        });
        it('should return user_en.id', function() {
            return UserDao.insert(user_en)
                .should.eventually.have.property('id').equal(user_en.id);
        });
    });
    describe('#isUserExisted()', function() {

        it('should return false"', function() {
            return UserDao.isEmailExisted('232')
                .should.eventually.be.a('null');
        });
        it('should return true', function() {
            return UserDao.isEmailExisted(user.email)
                .should.eventually.have.property('email').equal(user.email);
        });
    });

    describe('#find()', function() {
        it('should return 2', function() {
            return UserDao.find({})
                .should.eventually.have.length(2);
        });
    });
    describe('#findOneByParams()', function() {
        it('should return one user and id equal user.id', function() {
            return UserDao.findOneByParams({id:user.id})
                .should.eventually.have.property('id').equal(user.id);
        });
        it('should return one user and log_user_name equal user.log_user_name', function() {
            return UserDao.findOneByParams({log_user_name:user.log_user_name})
                .should.eventually.have.property('log_user_name').equal(user.log_user_name);
        });
        it('should return null', function() {
            return UserDao.findOneByParams({log_user_name:'test'})
                .should.eventually.be.a('null');
        });
    });

    describe('#modify()', function() {
        it('should return true', function() {
            var params = {
                id: user.id,
                power:10,
                update_time:new Date()
            };
            return UserDao.update(params)
                .should.eventually.have.property('power').equal(params.power);
        });
    });

    describe('#del()', function() {
        it('should return 1 when finish delete', function() {
            return UserDao.del(user.id)
                .should.eventually.have.property('result').have.property('n').equal(1);
        });
        it('should return 0', function() {
            return UserDao.del(-1)
                .should.eventually.have.property('result').have.property('n').equal(0);
        });
    });
});

