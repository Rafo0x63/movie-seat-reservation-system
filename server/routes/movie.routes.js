import { Router } from 'express';
import { OMDB_API_KEY } from "../config/env.js";
import axios from 'axios';
import { PrismaClient } from '../generated/prisma/client.js';
import {isAdmin} from "../middleware/isAdmin.middleware.js";
import {authenticateToken} from "../middleware/auth.middleware.js";

const moviesRouter = Router();
const prisma = new PrismaClient();


moviesRouter.get('/', async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json(movies);
});
moviesRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.movie.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete movie' });
    }
});
moviesRouter.get('/search',  authenticateToken, isAdmin, async (req, res) => {
    const title = req.query.title;

    if (!title) {
        return res.status(400).json({ error: "Missing title" });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                s: title,
                apikey: OMDB_API_KEY
            }
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: "No movies found" });
        }

        const movies = response.data.Search
            .filter(r => r.Type === 'movie')
            .map(movie => ({
                title: movie.Title,
                year: movie.Year,
                imdbId: movie.imdbID,
                poster: movie.Poster,
            }))

        res.json(movies);
    } catch (err) {
        console.error('Error fetching from OMDb: ', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});
moviesRouter.get('/search/:id', authenticateToken, isAdmin, async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Missing id" });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                i: id,
                apikey: OMDB_API_KEY
            }
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: "No movie found" });
        }

        const movie = {
            imdbId: response.data.imdbID,
            title: response.data.Title,
            year: response.data.Year,
            rated: response.data.Rated,
            released: response.data.Released,
            runtime: response.data.Runtime,
            genre: response.data.Genre,
            director: response.data.Director,
            actors: response.data.Actors,
            plot: response.data.Plot,
            poster: response.data.Poster
        };

        res.json(movie);
    } catch (err) {
        console.error('Error fetching from OMDb: ', err);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});
moviesRouter.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const {
            imdbId,
            title,
            year,
            rated,
            released,
            runtime,
            genre,
            director,
            actors,
            plot,
            poster,
        } = req.body;

        const existingMovie = await prisma.movie.findUnique({
            where: { imdbId },
        });

        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exist' });
        }

        const releaseDate = new Date(released);
        const movie = await prisma.movie.create({
            data: {
                imdbId,
                title,
                year,
                rated,
                released: releaseDate,
                runtime,
                genre,
                director,
                actors,
                plot,
                poster,
            }
        });

        res.status(201).json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add movie' });
    }
});

export default moviesRouter;