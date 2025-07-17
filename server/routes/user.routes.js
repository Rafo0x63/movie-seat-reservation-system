import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send("GET all users");
});
userRouter.get('/:id', (req, res) => {
    res.send("GET user by id");
});
userRouter.post('/', (req, res) => {
    res.send("CREATE new user");
});
userRouter.put('/:id', (req, res) => {
    res.send("UPDATE user by id");
});
userRouter.delete('/:id', (req, res) => {
    res.send("DELETE user by id");
});
