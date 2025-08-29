CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       full_name VARCHAR(255),
                       username VARCHAR(255),
                       email VARCHAR(255),
                       `password` VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE theaters (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          NAME VARCHAR(255),
                          address VARCHAR(255),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE seats (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       theater_id INT,
                       row_letter CHAR(1),
                       seat_number INT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE
);

CREATE TABLE movies (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        NAME VARCHAR(255),
                        genre VARCHAR(100),
                        age_restriction VARCHAR(10),
                        synopsis TEXT,
                        duration VARCHAR(20),
                        release_date DATE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           movie_id INT,
                           theater_id INT,
                           schedule_date DATE,
                           schedule_time TIME,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
                           FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE
);

CREATE TABLE seat_reservations (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   seat_id INT,
                                   schedule_id INT,
                                   is_reserved BOOLEAN,
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                   FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE,
                                   FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
);

CREATE TABLE receipts (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          user_id INT,
                          total_price FLOAT,
                          payment_method VARCHAR(50),
                          paid_at TIMESTAMP,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tickets (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         user_id INT,
                         seat_reservation_id INT,
                         receipt_id INT,
                         price FLOAT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (seat_reservation_id) REFERENCES seat_reservations(id) ON DELETE CASCADE,
                         FOREIGN KEY (receipt_id) REFERENCES receipts(id) ON DELETE CASCADE
);

------------ SEEDING DATA ------------

INSERT INTO theaters (NAME, address)
VALUES
    ('Grand Cinema Hall', '123 Main St'),
    ('Retro Movie Palace', '456 Vintage Ave');

INSERT INTO users (full_name, username, email, PASSWORD)
VALUES
    ('Alice Johnson', 'alicej', 'alice@example.com', 'hashedpass1'),
    ('Bob Smith', 'bobsmith', 'bob@example.com', 'hashedpass2');

-- Seats for Theater 1 (id = 1)
INSERT INTO seats (theater_id, row_letter, seat_number)
VALUES
    (1, 'A', 1), (1, 'A', 2), (1, 'A', 3), (1, 'A', 4), (1, 'A', 5),
    (1, 'B', 1), (1, 'B', 2), (1, 'B', 3), (1, 'B', 4), (1, 'B', 5),
    (1, 'C', 1), (1, 'C', 2), (1, 'C', 3), (1, 'C', 4), (1, 'C', 5),
    (1, 'D', 1), (1, 'D', 2), (1, 'D', 3), (1, 'D', 4), (1, 'D', 5);

-- Seats for Theater 2 (id = 2)
INSERT INTO seats (theater_id, row_letter, seat_number)
VALUES
    (2, 'A', 1), (2, 'A', 2), (2, 'A', 3), (2, 'A', 4), (2, 'A', 5),
    (2, 'B', 1), (2, 'B', 2), (2, 'B', 3), (2, 'B', 4), (2, 'B', 5),
    (2, 'C', 1), (2, 'C', 2), (2, 'C', 3), (2, 'C', 4), (2, 'C', 5),
    (2, 'D', 1), (2, 'D', 2), (2, 'D', 3), (2, 'D', 4), (2, 'D', 5);

INSERT INTO movies (NAME, genre, age_restriction, synopsis, duration, release_date)
VALUES
    ('Back to the Future', 'Sci-Fi', 'PG', 'Time-traveling adventure with a DeLorean.', '01:56', '1985-07-03'),
    ('The Shining', 'Horror', 'R', 'A family is isolated in a haunted hotel.', '02:26', '1980-05-23'),
    ('The Breakfast Club', 'Drama', 'PG-13', 'Five high school students bond in detention.', '01:37', '1985-02-15'),
    ('Raiders of the Lost Ark', 'Action', 'PG', 'Indiana Jones searches for the Ark.', '01:55', '1981-06-12'),
    ('E.T. the Extra-Terrestrial', 'Sci-Fi', 'PG', 'A boy befriends an alien left behind on Earth.', '01:55', '1982-06-11');

INSERT INTO schedules (movie_id, theater_id, schedule_date, schedule_time)
VALUES
    (1, 1, '2025-08-08', '14:00:00'),
    (2, 1, '2025-08-08', '18:00:00'),
    (3, 2, '2025-08-09', '16:00:00'),
    (4, 2, '2025-08-09', '20:00:00'),
    (5, 1, '2025-08-10', '13:30:00'),
    (1, 2, '2025-08-10', '17:00:00'),
    (2, 1, '2025-08-11', '19:00:00'),
    (3, 1, '2025-08-11', '15:00:00'),
    (4, 2, '2025-08-12', '18:30:00'),
    (5, 2, '2025-08-12', '21:00:00'),
    (1, 1, '2025-08-13', '14:00:00'),
    (2, 2, '2025-08-13', '19:00:00'),
    (3, 1, '2025-08-14', '16:00:00'),
    (4, 1, '2025-08-14', '20:00:00'),
    (5, 2, '2025-08-15', '18:00:00');

