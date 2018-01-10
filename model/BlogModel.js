let mongoose = require('mongoose');
mongoose.Promise = Promise;

let BlogSchema = mongoose.Schema({
   id: Number,
   title: String,
   content: String,
   catalog_id: Number,
   add_time:Date,
   update_time: Date
});

module.exports = mongoose.model('core_blog_maint',BlogSchema,'core_blog_maint');