import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

export const SignUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password});
    user.password = await user.encryptPasswd(user.password);
    const newUser = await user.save();

    const token: string = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET || 'TokenMaestro');
    res.header('auth-token', token).status(200).json(token);
};

export const SignIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    /* Validate Email */
    const user = await User.findOne({email});
    if (!user) return res.status(400).json('Email no encontrado 🥴');

    /* Validate Password */
    const correctPasswd: boolean = await user.validatePasswd(password)
    if (!correctPasswd) return res.status(400).json('Invalid Password 🤨');

    const token: string = jwt.sign({_id: user._id}, process.env.JWT_SECRET || 'TokenMaestro', {
        expiresIn: 60 * 60 * 24 /* Vence en 60 seg, multiplicado por 60, que será en 1 hora, multiplicado por 24 que será en 24 Horas = 1 Día */
    });
    res.header('auth-token', token).status(200).json(token);
};

export const Profile = async (req: Request, res: Response) => {
    const user =  await User.findById(req.userId, { password: 0 }); //Exclude returning Pwd
    if (!user) return res.status(404).json('User not found! 🤨');

    res.json(user);
};