import express from 'express';
import { PORT } from './config/env.js'

import moviesRouter from './routes/movie.routes.js'

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to the Movie seat reservation API");
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
    console.log(`Movie seat reservation API running on  http://localhost:${PORT}`);
});