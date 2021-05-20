import * as jwt from 'jsonwebtoken';
import User from '../configs/models/users';
import bcrypt from 'bcrypt';

const sign = payload => jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256', expiresIn: 86400 });

const verify = token => jwt.verify(token, process.env.SECRET);

export async function authentication(request, response, next) {
    
    try {

        const authHeader = request.headers.authorization;

        if(!authHeader) {
            return response.status(401).json({ error: 'Token not provided'});
        }

        const [, token] = authHeader.split(' ');
        const payload = verify(token);
        request.id = payload.id;

        return next()

    } catch(error) {
        //401 => user not authorized
        return response.status(401).json({ error: 'Invalid token'});
    }
}

export async function login(request, response) {
    try {
        const [, hash] = request.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':');

        const accountData = await User.findOne({ email });

        if(!accountData) {
            return response.status(401).json({ error: 'Invalid email' });
        }

        if(!bcrypt.compareSync(password, accountData.password)) {
            return response.status(401).json({ error: 'Invalid password' });
        }

        const token = await sign({ user: accountData._id });

        const { username, description} = accountData;

        response.status(200).json({ username, email, description, token });

    } catch(error) {
        return response.status(401).json(error);
    }
}