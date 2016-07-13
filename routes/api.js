var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Post    = require('../models/post'),
    Comment    = require('../models/comment');


router.route('/users')
  .get((req, res) => {
    User.fetchAll().then((results) => {
      var users = results.toJSON();
      res.json(users);
    });
  })
  .post((req, res) => {
    new User({
      full_name:req.body.full_name,
      username:req.body.username,
      img_url:req.body.img_url
    }).save()
      .then(results => {
        res.redirect('/users');
      })
  })

router.route('/users/:id')
  .get((req, res) => {
    User.where('id', req.params.id)
      .fetch()
      .then( results => {
        var user = results.toJSON();
        res.json(user);
      });
  });

router.route('/posts')
  .get((req, res) => {
    Post.fetchAll({withRelated:['user']}).then(results => {
      var posts = results.toJSON();
      res.json(posts);
    })
  })
  .post((req, res) => {
    new Post({
      user_id:req.body.user_id,
      title:req.body.title,
      body:req.body.body
    }).save()
    .then(results=>{
      res.redirect('/posts');
    })
  })

router.route('/posts/:post_id')
  .get((req, res) => {
    Post.where('id', req.params.post_id)
      .fetch({withRelated:['user','comment']})
      .then(results => {
        var post = results.toJSON();
        res.json(post);
      })
  })
  .post((req, res)=>{
    new Comment({
      // Do things
    }).save()
      .then(results=>{
        res.redirect('/posts');
      })
  });
module.exports = router;
