let mongoose = require('../dao/connect');
mongoose.Promise = Promise;

let BlogSchema = mongoose.Schema({
   id: Number,
   catalog_id: Number,
   userid:Number ,
   title: String,
   content: String,
   add_time:Date,
   update_time: Date,
   tag:String,
   attachmentid:Number
});

module.exports = mongoose.model('core_blog_maint',BlogSchema,'core_blog_maint');