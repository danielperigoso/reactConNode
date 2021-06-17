import express from 'express';
import {cadastrarUsuario, logarUsuario, listarUsuarios, areaLogada} from '../controllers/user.controller.js';
import {garanteAutenticadoMiddleware} from '../middlewares/user.middleware.js';

const {Router} = express;

const userRoutes = Router();

//Acessar área logada usando middleware
userRoutes.post('/painel', garanteAutenticadoMiddleware, areaLogada)

//Listar usuários
userRoutes.get('/', listarUsuarios)

//Cadastrar usuário
userRoutes.post('/usuario', cadastrarUsuario)

//Autenticar usuário
userRoutes.post('/login', logarUsuario)


export {userRoutes}