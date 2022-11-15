CREATE DATABASE animalcrossingplaylist;

\c animalcrossingplaylist;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email VARCHAR(75)
);

CREATE TABLE songs (
  id serial PRIMARY KEY,
  name VARCHAR(25),
  music_uri VARCHAR(100),
  image_uri VARCHAR(100)
);

CREATE TABLE playlist_songs (
  id serial PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (id),
  FOREIGN KEY (song_id)
    REFERENCES songs (id)
);

/*  Execute this file from the command line by typing:
 *    psql postgres < db/config.sql
 *  to create the database and the tables.*/