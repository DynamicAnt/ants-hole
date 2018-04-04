const crypto = require('crypto');

describe('md5',function(){
   it('md5',function() {
       let str = 'hello';
       let hash = crypto.createHash('md5').update(str).digest('hex');
       console.log('hash:',hash);
   });
});