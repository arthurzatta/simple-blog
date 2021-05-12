import mongoose from '../../database/config';

const TagSchema = mongoose.Schema({
    label: {
        type: String,
        require: true,
    }   
})

const Tags = mongoose.model('Tags', TagSchema);

export default Tags;