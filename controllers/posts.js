const Post = require('../models/post');

const upload = require("../services/fileUpload");
const singleUpload = upload.single("image");

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

    const post = new Post(req.body);
    
    singleUpload(req, res, function (err) {
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

        let update = { profilePicture: req.file.location };

        User.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });

    post.user = req.user._id;
    post.save(function (err){
        if(err) return res.render('posts/new'); // TODO return error to user
        res.redirect('/posts');
    })
}