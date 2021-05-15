import mongoose from '../../database/config';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    password:{
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.Model('Users', UserSchema);

export default User;