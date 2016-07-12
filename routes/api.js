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


module.exports = router;
