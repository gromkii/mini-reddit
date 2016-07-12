var bookshelf = require('../db/bookshelf');

require('./user');
require('./post');

var Comment = bookshelf.Model.extend({
  tableName:'comments',
  post: function(){
    return this.belongsTo('Post');
  },
  user: function(){
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Comment', Comment);
