import express from 'express';
import { PORT } from './config/env.js'
import cors from 'cors';
import moviesRouter from './routes/movie.routes.js'
import theaterRouter  from './routes/theater.routes.js'
import scheduleRouter from "./routes/schedule.routes.js";
import seatRouter from "./routes/seat.routes.js";

import { PrismaClient } from './generated/prisma/client.js';
import authRouter from "./routes/auth.routes.js";
import storeRouter from "./routes/store.routes.js";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Movie seat reservation API");
})

app.use('/movies', moviesRouter);
app.use('/theaters', theaterRouter);
app.use('/schedules', scheduleRouter);
app.use('/seats', seatRouter);
app.use('/auth', authRouter);
app.use('/store', storeRouter)

app.listen(PORT, () => {
    console.log(`Movie seat reservation API running on  http://localhost:${PORT}`);
});

const LOCK_TIMEOUT = 3 * 60 * 1000;
const CLEANUP_INTERVAL = 30 * 1000;

setInterval(async () => {
    const expirationDate = new Date(Date.now() - LOCK_TIMEOUT);

    try {
        const result = await prisma.seatReservation.updateMany({
            where: {
                lockedAt: { lt: expirationDate },
                isReserved: false
            },
            data: {
                lockedAt: null,
                userId: null
            },
        });

        if (result.count > 0) {
            console.log(`Unlocked ${result.count} expired seat locks`);
        }
    } catch (error) {
        console.log('Error unlocking expired seats:', error);
    }
}, CLEANUP_INTERVAL);