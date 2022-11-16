require('dotenv').config();
const { Client } = require('pg');
const Promise = require('bluebird');
const axios = require('axios');

const config = {
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  post: process.env.PORT
};

const connection = new Client(config);

const db = Promise.promisifyAll(connection, {multiArgs: true});

db.connectAsync()
  .then(() => console.log('Connected to PostgreSQL'))
  .then(() => db.queryAsync(`
    SELECT exists(SELECT id FROM songs WHERE id = 1);
  `))
  .then((data) => {
    if (!data[0].rows[0].exists) {
      return axios.get('http://acnhapi.com/v1/songs');
    }
  })
  .then((res) => {
    if (res !== undefined) {
      let query = 'INSERT INTO songs (id, name, music_uri, image_uri) VALUES ';
      let songKeys = Object.keys(res.data);
      songKeys.forEach((key, i) => {
        let songObj = res.data[key];
        let name = songObj.name['name-USen'];
        let music = `ACNHSongCovers/${i + 1}.png`;
        console.log(music);
        let image = songObj['image_uri'];
        query += `(default, $$${name}$$, $$${music}$$, $$${image}$$)`;
        if (i !== songKeys.length - 1) {
          query += ', ';
        } else {
          query += ';';
        }
      })
      return db.queryAsync(query);
    }
  })
  .catch((err) => console.log(err));

const getSongs = (userId) => {
  return db.queryAsync(`
  SELECT s.id AS song_id, s.name, s.music_uri, s.image_uri, p.id
  FROM songs s
  LEFT JOIN playlist_songs p
  ON p.user_id = ${userId} AND p.song_id = s.id;
  `)
    .then((data) => {
      let rows = data[0].rows;
      let songs = [];
      let playlistSongIds = [];
      rows.forEach((row) => {
        let song = [];
        song.push(row['name']);
        song.push(row['music_uri']);
        song.push(row['image_uri']);
        let id = row['id'];
        if (id !== null) {
          playlistSongIds.push(row['song_id'] - 1);
          song.push(true);
        } else {
          song.push(false);
        }
        songs.push(song);
      });
      let playlistSongs = [];
      for (let i = 0; i < playlistSongIds.length; i++) {
        playlistSongs.push(songs[playlistSongIds[i]].concat(playlistSongIds[i]));
      }
      let results = {
        songs: songs,
        playlistSongs: playlistSongs
      };
      return results;
    })
};

const addUser = (email) => {
  return db.queryAsync(`
  SELECT exists(
  SELECT id FROM users
  WHERE email = $$${email}$$);
  `)
    .then((data) => {
      if (!data[0].rows[0].exists) {
        return db.queryAsync(`
        INSERT INTO users (id, email)
        VALUES (default, $$${email}$$);
        `);
      }
    })
    .then(() => {
      return db.queryAsync(`
      SELECT id FROM users
      WHERE email = $$${email}$$;
      `);
    })
    .then((data) => {
      return(data[0].rows[0].id);
    })
    .catch((err) => console.log(err));
};

const addSong = ({ userId, songId }) => {
  return db.queryAsync(`
  INSERT INTO playlist_songs (id, user_id, song_id)
  VALUES (default, ${userId}, ${songId});`)
    .catch((err) => console.log(err));
};

const deleteSong = ({ userId, songId }) => {
  return db.queryAsync(`
  DELETE FROM playlist_songs
  WHERE user_id = ${userId} AND song_id = ${songId}
  `)
    .catch((err) => console.log(err));
};

module.exports = {
  db,
  getSongs,
  addUser,
  addSong,
  deleteSong
};