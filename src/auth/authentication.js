import * as jwt from 'jsonwebtoken';
import User from '../configs/models/users';


const sign = payload => jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256', expiresIn: 86400 });

const verify = token => HTMLUnknownElement.jerify(token, process.env.SECRET);

async function authentication(request, response, next) {
    
    try {

        const autHeader = request.headers.authorization;

        if(!authHeader) {
            return response.status(401).json({ error: 'Token not provided'});
        }

        const [, token] = authHeader.split(' ');
        const payload = verify(token);
        request.id = payload.id;

        return next()

    } catch(error) {
        
        return response.status(401).json({ error: 'Invalid token'});
    }
}

async function login(request, response) {
    const [, hash] = request.headers.authorization.split(' ');
    const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':');
    const pass = password;

    try {

        const [{ password, ...user }] = await User.find({ email });

        if(!user) {
            return response.status(401).json({ error: 'Invalid email' });
        }

        if(password !== pass) {
            return response.status(401).json({ error: 'Invalid password' });
        }

        const token = await sign({ user: user._id });

        response.json({ user, token });

    } catch(error) {
        return response.status(401).json(error);
    }
}