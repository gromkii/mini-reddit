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

User.getAllUsers = function(){
  return new Promise( (resolve, reject) => {
    User.fetchAll().then(results => {
      resolve(results)
    });
  });
}


module.exports = bookshelf.model('User', User);
