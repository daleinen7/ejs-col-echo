const Post = require('../models/post');
const upload = require("../services/fileUpload");

module.exports = {
    allPosts,
    new: newPost,
    create
}

function allPosts(req, res) {
    Post.find({}).populate('user').exec(function (err, posts) {
        res.render('index', {
            title: 'Col-Echo | Home',
            posts, user: req.user
        })
    })
}

function newPost(req, res) {
    res.render('posts/new', {title: "Col-Echo | Post to Col-Echo"})
}

function create(req, res) {
    const singleUpload = upload.single("media-upload");
    
    singleUpload(req, res, function (err) {
        const post = new Post(req.body);

        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        
        let update = { mediaUpload: req.file.location };
        
        post.mediaUrl = update.mediaUpload;
        post.user = req.user._id;
        post.save(function (err, post){
            if(err) {
                console.log(err);
                return res.redirect('posts/new'); // TODO return error to user
            }   
            res.redirect('/');
        })
    });
}