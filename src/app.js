import express from 'express';
import routes from './routes'

class App {
    constructor(){
        this.middlewares();
        this.server();
    }

    middlewares() {
        // routes.use(express.json());
    }

    server() {
        express.use(routes);
    }
}