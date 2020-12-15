var mongoose = require('mongoose');
const Schema = mongoose.Schema


let commentSchema = new Schema({
    subject: {type: String, required: true},
    text: {type: String, required: true}
})

let postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    thumbNail: String,
    mediaUrl: String,
    category: {
        type: String,
        enum: ['experimental', 'comedy', 'music', 'prose', 'poetry'],
        required: true
    },
    comments: [{
        type: Schema.Types.Object,
        ref: 'comments'
    }]
}, 
{
    timestamps: true
})

module.exports= mongoose.model('Post', postSchema)