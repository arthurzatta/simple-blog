import Post from '../configs/models/post';

export default new class PostsController {
    async create(request, response) {
        try{
            const data = request.body;
            const post = await new Post(data).save();
            return response.status(200).json(post);
        } catch(error){
            console.log(error);
            return response.status(400);
        }
    } 
    
    async list(request, response) {
        try {
            const posts = await Post.find();
            return response.status(200).json(posts);
        } catch (error) {
            return response.status(400).json({error: error});
        }
    }

    async postsSingleUser(request, response) {
        try {
            const { user } = request.body;
            const posts = await Post.find({ user });

            return response.status(200).json(posts);
        } catch (error) {
            console.log(error);
            return response.status(400).json({ error: "Not find" })
        }
    }

    async update(request, response) {
        try{

            const { id } = request.params;
            const { title, content, tags } = request.body;


            //Is it the update by the object send as argument or theres another argument who needs to be provided to the function?
            const updatedPost = await Post.findOneAndUpdate({ _id: id }, { title, content, tags }, {
                new: true,
                timestamps: true,
                useFindAndModify: false
            });

            return response.status(200).json(updatedPost);

        } catch(error) {
            return response.status(400).json({error: error});
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            //Theres not garantee that the selected post will be deleted by your owner
            const { value } = await Post.findByIdAndRemove(id, {
                useFindAndModify: false,
                rawResult: true
            });
            
            if(!value) {
                return response.status(400).json({ error: 'Object not found'});
            }

            return response.status(200).json(value);
            
        } catch(error) {
            return response.status(400).json({ error: error })
        }
    }
}