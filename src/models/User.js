import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        nome: String,
        email: String,
        senha: String,
    }
);

export default mongoose.model('User', UserSchema);