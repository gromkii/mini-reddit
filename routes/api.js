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
    })
  })

router.route('/users/:id')
  .get((req, res) => {
    User.where('id', req.params.id)
      .fetch()
      .then( results => {
        var user = results.toJSON();
        res.json(user);
      })
  })


module.exports = router;
