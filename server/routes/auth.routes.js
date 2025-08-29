import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const authRouter = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

authRouter.post('/register', async (req, res) => {
    const { fullName, email, password, username } = req.body;
    console.log(req.body)
    const user = await prisma.user.create({
        data: {
            fullName,
            username,
            email,
            password
        }
    });

    res.status(200).json(user);
});
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        //const passwordMatches = await bcrypt.compare(password, user.password || '');
        const passwordMatches = password === user.password;
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});
authRouter.post('/logout', (req, res) => {
    res.send("Log out");
});
authRouter.get('/:id', async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            id: Number(req.params.id)
        }
    });

    res.json(user);
});

export default authRouter;