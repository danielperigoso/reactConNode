import express from 'express';
import mongoose from 'mongoose';
import {userRoutes} from '../src/routes/user.routes.js';

const app = express();


mongoose.connect('mongodb+srv://weblogic:88888888@cluster0.cyvkf.mongodb.net/demonstracaoNode?retryWrites=true&w=majority', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
})
.then(() => {console.log('Conectado ao banco de dados')})
.catch(error => console.error('Erro ao conectar'+error));


app.use(express.json());
app.use(userRoutes);


app.listen(4444, () => {console.log('Servidor rodando na porta 4444')});