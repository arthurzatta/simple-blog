import { response } from 'express';
import bcrypt from 'bcrypt'; 
import User from '../configs/models/users';

export default new class UserController {

    async create(request, response) {
        try {
            const { username, email, description, password } = request.body;

            const [ matchUser ] = await User.find({ email });

            if(matchUser) {
                return response.status(400).json( { error: 'Email used' });
            }

            //Maybe this is not recommended 
            if( !(username && email && password) ) {
                return response.status(400).json({ error: 'Informations not provided'})
            }

            //Using salt => this technique adds another random string to the hash string generated  
            const passwordHash =  await bcrypt.hashSync(password, 10);

            //I need to remember how to do JWT
            //After storage authentication needs to be made, so check up the email and password conditions
            const user = await new User({ username, email, password: passwordHash, description }).save();

            return response.status(200).json(user);
        } catch(error) {
            console.log(error);
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