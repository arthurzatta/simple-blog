import { response } from 'express';
import User from '../configs/models/users';

export default class User {

    async create(request, response) {
        try {
            const { username, email, password, description } = request.body;

            const matchUser = await User.find(email);

            if(matchUser) {
                return response.status(400).json( { error: 'Email used' });
            }

            if( !(username || email || password) ) {
                return response.status(400).json({ error: 'Informations not provided'})
            }

            //I need to remember how to do JWT
            //After storage authentication needs to be made, so check up the email and password conditions
            const user = await new User({ username, email, password, description });
        } catch(error) {
            return response.status(400).json(error);
        }
    }

    async list(request, response) {
        try {

            const users = await User.find();

            return response.status(200).json(users);

        } catch(error) {
            return response.status(400).json(error);
        }
    }

    async update(request, reponse) {
        try {
            //Needs permission of JWT, the data will be send from the body, storage and update in the header session
            const body = request.body;

            const update = await User.findOneAndUpdate( { _id: id }, body, {
                new: true,
                timestamps: true,
                useFindAndModify: false 
            });

            
            return response.status(200).json(update);

        } catch (error) {
            
            return response.status(400).json(error);
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.header;
            
            //This is probably gonna be a inifinity request
            await User.findOneAndDelete({ _id: id });

            return response.status(200).json({ message: 'Account deleted'})

        } catch (error) {
            return response.status(400).json(error);
        }
    }
}