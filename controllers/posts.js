const Post = require('../models/post');
const upload = require("../services/fileUpload");

module.exports = {
    allPosts,
    new: newPost,
    create,
    update,
    makeComment
}

function allPosts(req, res) {
    Post.find({}).populate('user').exec(function (err, posts) {
        if (req.user) {
            console.log(req.user._id);
        }
        res.render('index', {
            title: 'Col-Echo | Home',
            posts, 
            user: req.user,
        })
    })
    
}

// async 
function makeComment(req, res){
    let comm = req.body
    Post.findById(req.body.post_id, function(err, post){
        post.comments.push(comm)
        post.save()
    })

    }
// }



function update(req, res){
    Post.findById(req.params.id, function(err, post) {
        // console.log("USER ID:", toString(req.user._id) , "POST:", toString(post.user) , "Params" , req.params)
        if(toString(req.user._id) != toString(post.user) ){
            res.redirect('/')
            console.log(' if statment not working')
        } else  {
            res.render('posts/update', {
                title: 'Col-Echo | Edit',
                post,
                user: req.user,
            }, 
            console.log('Render is firing'))
        }
    })
}  



function newPost(req, res) {
    res.render('posts/new', {title: "Col-Echo | Post to Col-Echo"})
}

function create(req, res) {
    const thumbAndMediaUpload = upload.fields([{name: "media-upload"}, {name: 'thumb-nail'}]);
    
    thumbAndMediaUpload(req, res, function (err) {
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

        const fileArray = req.files;

        post.mediaUrl = fileArray['media-upload'][0].location;
        post.thumbNail = fileArray['thumb-nail'][0].location;
        
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