const Post = require('../models/post');

module.exports = {
    allPosts
}

function allPosts(req, res) {
    res.render('index', {
        title: 'Col-Echo | Home'
    })
}