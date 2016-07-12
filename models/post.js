var bookshelf = require('../db/bookshelf');

require('./user');
require('./comment');

var Post = bookshelf.Model.extend({
  tableName:'posts',
  user: function(){
    return this.belongsTo('User');
  },
  comment: function(){
    return this.hasMany('Comment');
  }
});

module.exports = bookshelf.model('Post', Post);
