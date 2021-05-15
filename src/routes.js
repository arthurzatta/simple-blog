import express from 'express';
import PostsController from './controllers/PostsController';

const routes = express();
routes.use(express.json());

routes.get('/', PostsController.list);
routes.post('/create', PostsController.create);
routes.put('/update/:id', PostsController.update);
routes.delete('/delete', PostsController.delete)


routes.listen(3333);

export default routes;