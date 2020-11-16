var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts.js');
const multer = require('multer');
const upload = multer({ dest: './public/media'});

router.get('/', postsCtrl.allPosts);
router.get('/new', isLoggedIn, postsCtrl.new)
router.post('/', isLoggedIn, upload.single('media-upload'), postsCtrl.create)

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/google') // TODO update for FB oauth
    }
}

module.exports = router;