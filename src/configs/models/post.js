import mongoose from '../../database/config';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    tags: [{
        type: String,
        require: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Post = mongoose.model('Post', PostSchema);

export default Post;