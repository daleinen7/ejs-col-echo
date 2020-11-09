var mongoose = require('mongoose');
const Schema = mongoose.Schema

let postSchema = new Schema({
    postedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    mediaUrl: String,
    category: {
        type: String,
        enum: ['experimental', 'comedy', 'music', 'prose', 'poetry'],
        required: true
    },
}, 
{
    timestamps: true
})

module.exports= mongoose.model('Post', postSchema)