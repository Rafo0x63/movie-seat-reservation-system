import { Router } from 'express';

const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
    res.send("GET all movies");
});
moviesRouter.get('/:id', (req, res) => {
    res.send("GET movie by id");
});
moviesRouter.post('/', (req, res) => {
    res.send("CREATE movie");
});
moviesRouter.delete('/:id', (req, res) => {
    res.send("DELETE movie by id");
});
moviesRouter.put('/:id', (req, res) => {
    res.send("UPDATE movie by id");
});

export default moviesRouter;