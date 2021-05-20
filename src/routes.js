import express from 'express';
import PostsController from './controllers/PostsController';
import UserController from './controllers/UserController';
import { authentication, login } from './auth/authentication';

const PORT = process.env.API_PORT || 3000

const routes = express();
routes.use(express.json());
routes.post('/signup', UserController.create);
routes.get('/login', login);
routes.use(authentication);
routes.get('/'); //Route for personal data
routes.get('/list', UserController.list);
routes.put('/update', UserController.update);
routes.delete('/delete', UserController.delete);
routes.get('/post', PostsController.postsSingleUser);
routes.get('/post/all', PostsController.list);
routes.post('/post/create', PostsController.create);
routes.put('/post/update/:id', PostsController.update);
routes.delete('/post/delete/:id', PostsController.delete)


routes.listen(PORT);

export default routes;