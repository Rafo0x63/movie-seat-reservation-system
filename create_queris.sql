create table users (
id serial primary key,
full_name text,
username text,
email text,
password text,
created_at timestamp,
updated_at timestamp
);

create table theaters (
id serial primary key,
name text,
address text,
created_at timestamp,
updated_at timestamp
);

create table seats (
id serial primary key,
row char(1),
number int,
constraint theater_id foreign key (id)
references theaters(id) on delete cascade
);

create table movies (
id serial primary key,
name text,
genre text,
age_restriction text,
synopsis text,
duration text,
release_date date,
created_at timestamp,
updated_at timestamp,
constraint theater_id foreign key (id)
references theaters(id) on delete cascade
);

create table schedules (
id serial primary key,
date date,
time time,
created_at timestamp,
updated_at timestamp,
constraint movie_id foreign key(id)
references movies(id) on delete cascade
);

create table seat_reservations (
id serial primary key,
is_reserved boolean,
created_at timestamp,
updated_at timestamp,
constraint seat_id foreign key (id)
references seats(id) on delete cascade,
constraint schedule_id foreign key (id)
references schedules(id) on delete cascade
);

create table receipts (
id serial primary key,
total_price float,
payment_method text,
paid_at timestamp,
created_at timestamp,
updated_at timestamp,
constraint user_id foreign key (id)
references users(id) on delete cascade
);

create table tickets (
id serial primary key,
price float,
created_at timestamp,
updated_at timestamp,
constraint user_id foreign key (id)
references users(id) on delete cascade,
constraint seat_reservation_id foreign key (id)
references seat_reservations(id) on delete cascade,
constraint receipt_id foreign key (id)
references receipts(id) on delete cascade
);