import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
userRouter.post('/', async (req, res) => {
    const { fullName, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            fullName,
            username,
            email,
            password: hashedPassword,
            role: 'admin'
        }
    });

    res.status(200).json(user);
});
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.user.delete({
        where: { id: Number(id) }
    })

    res.status(200).json("User deleted");
});

export default userRouter;
