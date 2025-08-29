import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
    await prisma.seat.deleteMany();
    await prisma.theater.deleteMany();

    const seedTheaters = [
        {
            name: 'Vinewood Cinema',
            slug: 'vinewood-cinema',
            address: 'Vinewood Boulevard, Los Santos',
        },
        {
            name: 'Idlewood Theater',
            slug: 'idlewood-theater',
            address: 'Idlewood Street, Los Santos',
        },
        {
            name: 'Los Santos Drive-In',
            slug: 'ls-drive-in',
            address: 'Las Colinas Avenue, Los Santos',
        },
    ];

    for (const theater of seedTheaters) {
        const createdTheater = await prisma.theater.create({ data: theater });

        const rows = ['A', 'B', 'C', 'D', 'E'];
        for (const rowLetter of rows) {
            for (let seatNumber = 1; seatNumber <= 5; seatNumber++) {
                await prisma.seat.create({
                    data: {
                        theaterId: createdTheater.id,
                        rowLetter,
                        seatNumber,
                    },
                });
            }
        }
    }

    console.log('Theaters and 25 seats each seeded successfully!');

    const seedMovies = [
        {
            imdbId: 'tt0120737',
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: '2001',
            rated: 'PG-13',
            released: new Date('2001-12-18'),
            runtime: '178 min',
            genre: 'Adventure, Drama, Fantasy',
            director: 'Peter Jackson',
            actors: 'Elijah Wood, Ian McKellen, Orlando Bloom',
            plot: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
            poster: 'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0167261',
            title: 'The Lord of the Rings: The Two Towers',
            year: '2002',
            rated: 'PG-13',
            released: new Date('2002-12-17'),
            runtime: '179 min',
            genre: 'Adventure, Drama, Fantasy',
            director: 'Peter Jackson',
            actors: 'Elijah Wood, Ian McKellen, Viggo Mortensen',
            plot: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0167260',
            title: 'The Lord of the Rings: The Return of the King',
            year: '2003',
            rated: 'PG-13',
            released: new Date('2003-12-16'),
            runtime: '201 min',
            genre: 'Adventure, Drama, Fantasy',
            director: 'Peter Jackson',
            actors: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
            plot: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0095016',
            title: 'Die Hard',
            year: '1988',
            rated: 'R',
            released: new Date('1988-07-19'),
            runtime: '132 min',
            genre: 'Action, Thriller',
            director: 'John McTiernan',
            actors: 'Bruce Willis, Alan Rickman, Bonnie Bedelia',
            plot: 'A New York City cop, John McClane, tries to save his estranged wife and several others taken hostage by terrorists during a Christmas Eve party at the Nakatomi Plaza Skyscraper in Los Angeles, California.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMGNlYmM1NmQtYWExMS00NmRjLTg5ZmEtMmYyYzJkMzljYWMxXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0099423',
            title: 'Die Hard 2',
            year: '1990',
            rated: 'R',
            released: new Date('1990-07-02'),
            runtime: '124 min',
            genre: 'Action, Thriller',
            director: 'Renny Harlin',
            actors: 'Bruce Willis, William Atherton, Bonnie Bedelia',
            plot: 'John McClane must race against time to save hundreds of lives (including his wife\'s) when a group of terrorists take control of Washington Dulles Airport\'s systems, and threaten to crash several planes if their demands are not met.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTA1OGFlZWUtZjE4Yy00MzFmLTlhYjctOGY5ZmZjOWFlOWUwXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0993846',
            title: 'The Wolf of Wall Street',
            year: '2013',
            rated: 'R',
            released: new Date('2013-12-24'),
            runtime: '180 min',
            genre: 'Biography, Comedy, Crime',
            director: 'Martin Scorsese',
            actors: 'Leonardo DiCaprio, Jonah Hill, Margot Robbie',
            plot: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0829482',
            title: 'Superbad',
            year: '2007',
            rated: 'R',
            released: new Date('2007-08-16'),
            runtime: '113 min',
            genre: 'Comedy',
            director: 'Greg Mottola',
            actors: 'Michael Cera, Jonah Hill, Christopher Mintz-Plasse',
            plot: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
            poster: 'https://m.media-amazon.com/images/M/MV5BNjk0MzdlZGEtNTRkOC00ZDRiLWJkYjAtMzUzYTRiNzk1YTViXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0418279',
            title: 'Transformers',
            year: '2007',
            rated: 'PG-13',
            released: new Date('2007-07-02'),
            runtime: '144 min',
            genre: 'Action, Adventure, Sci-Fi',
            director: 'Michael Bay',
            actors: 'Shia LaBeouf, Megan Fox, Josh Duhamel',
            plot: 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.',
            poster: 'https://m.media-amazon.com/images/M/MV5BZjM3ZDA2YmItMzhiMi00ZGI3LTg3ZGQtOTk3Nzk0MDY0ZDZhXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt1055369',
            title: 'Transformers: Revenge of the Fallen',
            year: '2009',
            rated: 'PG-13',
            released: new Date('2009-06-23'),
            runtime: '149 min',
            genre: 'Action, Adventure, Sci-Fi',
            director: 'Michael Bay',
            actors: 'Shia LaBeouf, Megan Fox, Josh Duhamel',
            plot: 'Sam Witwicky leaves the Autobots behind for a normal life. But when his mind is filled with cryptic symbols, the Decepticons target him and he is dragged back into the Transformers\' war.',
            poster: 'https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt1399103',
            title: 'Transformers: Dark of the Moon',
            year: '2011',
            rated: 'PG-13',
            released: new Date('2011-06-28'),
            runtime: '154 min',
            genre: 'Action, Adventure, Comedy',
            director: 'Michael Bay',
            actors: 'Shia LaBeouf, Rosie Huntington-Whiteley, Tyrese Gibson',
            plot: 'The Autobots learn of a Cybertronian spacecraft hidden on the moon, and race against the Decepticons to reach it and to learn its secrets.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0099685',
            title: 'Goodfellas',
            year: '1990',
            rated: 'R',
            released: new Date('1990-09-20'),
            runtime: '145 min',
            genre: 'Biography, Crime, Drama',
            director: 'Martin Scorsese',
            actors: 'Robert De Niro, Ray Liotta, Joe Pesci',
            plot: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
            poster: 'https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_SX300.jpg'
        },
        {
            imdbId: 'tt0110912',
            title: 'Pulp Fiction',
            year: '1994',
            rated: 'R',
            released: new Date('1994-10-13'),
            runtime: '154 min',
            genre: 'Crime, Drama',
            director: 'Quentin Tarantino',
            actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
            plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            poster: 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_SX300.jpg'
        },
    ];

    for (const movie of seedMovies) {
        await prisma.movie.create({ data: movie });
    }

    console.log('Movies seeded successfully!');

    const schedules = [];
    const theaters = await prisma.theater.findMany();
    const movies = await prisma.movie.findMany();

    for (const theater of theaters) {
        const shuffledMovies = movies.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffledMovies.slice(0, 4);

        for (const movie of selectedMovies) {
            for (let i = 0; i < 3; i++) {
                const startHour = 10 + i * 3;
                const startTime = new Date();
                startTime.setHours(startHour, 0, 0, 0);

                schedules.push({
                    movieId: movie.id,
                    theaterId: theater.id,
                    startTime
                });
            }
        }
    }

    for (const schedule of schedules) {
        const createdSchedule = await prisma.schedule.create({ data: schedule });

        const seats = await prisma.seat.findMany({ where: { theaterId: schedule.theaterId } });
        const seatReservations = seats.map(seat => ({
            seatId: seat.id,
            scheduleId: createdSchedule.id
        }));

        await prisma.seatReservation.createMany({ data: seatReservations });
    }

    console.log('Schedules and seat reservations seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });