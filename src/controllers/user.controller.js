import jsonwebtoken from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const {hash, compare} = bcrypt;
const {sign} = jsonwebtoken;

//Acessar área logada usando middleware
export const areaLogada = (_,res) => {

    res.json({message: 'Está na área logada'});

}

//Listar usuários
export const listarUsuarios = (_, res) => {

    User.find({}, (_, users) => {
        res.json({users});
    });

}

//Cadastrar usuário
export const cadastrarUsuario = async (req, res) => {

    const {nome, email, senha} = req.body;

    const possuiEmail = await User.exists({email});

    if (possuiEmail){
        res.status(409).json({message:'Usuário já cadastrado'});
    }

    const senhaHash = await hash(senha, 5);

    const user = {id: uuidv4(), nome, email, senha: senhaHash}
    
    User.create(user);

    res.status(201).json({message: 'Usuário cadastrado com sucesso', user});

}

//Autenticar usuário
export const logarUsuario = async (req, res) => {

    const {email, senha} = req.body;

    const possuiEmail = await User.exists({email});

    if (!possuiEmail){
        res.status(404).json({message:'Usuário não se encontra na base'});
    }

    const user = await User.findOne({email});

    const senhaEstaOk = await compare(senha, user.senha);

    if (!senhaEstaOk) {
        res.status(401).json({message:'Senha não confere'});
    }

    const token = sign({}, "asdfasdfasdfasdfa", {
        subject: user.id,
        expiresIn: '1m'
    });

    res.status(200).json({message: 'Usuário logado.', token});

}