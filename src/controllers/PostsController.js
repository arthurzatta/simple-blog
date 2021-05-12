import Post from '../configs/models/post';

export default new class PostsController {
    async create(request, response) {
        try{
            const { title, content, tags} = request.body;
            const post = await new Post({ title, content, tags });
            post.save()
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


    async update(request, response) {
        try{

            const { id } = request.params;
            const { title, content } = request.body;
            
            const post = await Post.updateOne({title: title, content: content });

            return 
        } catch(error) {
            return response.status(400).json({error: error});
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            const deletedStatus = await Post.deleteOne({ id: id });
            
            if (!!deletedStatus.ok) {
                return response.status(401).json({ error: "This post doesn't exist"});
            }

            return response.status(200);
            
        } catch(error) {
            return response.status(400).json({ error: error })
        }
    }
}