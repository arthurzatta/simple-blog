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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Post = mongoose.model('Post', PostSchema);

export default Post;