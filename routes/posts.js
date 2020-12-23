var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts.js');

router.get('/', postsCtrl.allPosts);
router.get('/new', isLoggedIn, postsCtrl.new)
router.get('/:id/update', isLoggedIn, postsCtrl.update)
router.post('/', isLoggedIn, postsCtrl.create)




function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/google') // TODO update for FB oauth
    }
}

module.exports = router;