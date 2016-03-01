/**
 * Api routes
 */

var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');

// User Api Controller
var User = require('../api/user');
// Post Api Controller
var Post = require('../api/post');
// Comment Api Controller
var Comment = require('../api/comment');

// Post
router.get('/posts', Post.get);
router.post('/posts', auth.loginRequired, Post.add)

// Login
router.post('/login', User.login);


module.exports = router;
