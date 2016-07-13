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

Post.addComment = function(post_id, userModel){
  return new Promise((resolve, reject) =>{
    Promise.all([
      userModel.fetchAll(),
      this.where('id', post_id).fetch()
    ]).then(results=>{
      var commentVars = {
        users :results[0].toJSON(),
        post: results[1].toJSON()
      }

      resolve(commentVars);
    })
  })
}

module.exports = bookshelf.model('Post', Post);
