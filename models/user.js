var bookshelf = require('../db/bookshelf');

require('./post');
require('./comment');

var User = bookshelf.Model.extend({
  tableName:'users',
  post: function(){
    return this.hasMany('Post');
  },
  comment: function(){
    return this.hasMany('Comment');
  }
});

module.exports = bookshelf.model('User', User);
