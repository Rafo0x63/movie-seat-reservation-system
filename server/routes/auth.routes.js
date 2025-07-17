import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
    res.send("Register");
});
authRouter.post('/login', (req, res) => {
    res.send("Log in");
});
authRouter.post('/logout', (req, res) => {
    res.send("Log out");
});

export default authRouter;