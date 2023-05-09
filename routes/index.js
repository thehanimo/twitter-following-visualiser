var express = require('express');
var router = express.Router();
const passport = require('passport');


// <5> Start authentication flow
router.get(
  '/auth/twitter',
  passport.authenticate('twitter', {
    // <6> Scopes
    scope: ['tweet.read', 'users.read', 'offline.access'],
  })
);

// <7> Callback handler
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter'),
  function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    res.end(
      `<h1>Authentication succeeded</h1> User data: <pre>${userData}</pre>`
    );
  }
);
