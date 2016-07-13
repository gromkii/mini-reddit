var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Post    = require('../models/post'),
    Comment    = require('../models/comment');

router.route('/new')
  .get((req, res) => {
    res.render('index');
  })

module.exports = router;
