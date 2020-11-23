const Post = require('../models/post');
const multer = require('multer');

module.exports = {
    allPosts,
    new: newPost,
    create,
    update
}

function allPosts(req, res) {
    Post.find({}).populate('user').exec(function (err, posts) {
        res.render('index', {
            title: 'Col-Echo | Home',
            posts, user: req.user
        })
    })
}
function update(req, res){
    Post.findById(req.params.id, function(err, post){
        console.log("USER ID:", req.user._id, "POST:", post.user, "Params" , req.params)
        if(req.user._id != post.user ){
            res.redirect('/')
            console.log(' if statment not working')
        }
        else  {
        res.render('posts/update', {
            title: 'Col-Echo | Edit',
            post,
            user: req.user
        },
        console.log('Render is firing'))
    
        
    }
})
}  



function newPost(req, res) {
    res.render('posts/new', {title: "Col-Echo | Post to Col-Echo"})
}

function create(req, res) {

    const post = new Post(req.body);

    console.log(req.file, req.body);

    post.user = req.user._id;
    post.save(function (err){
        if(err) return res.render('posts/new'); // TODO return error to user
        res.redirect('/posts');
    })
}