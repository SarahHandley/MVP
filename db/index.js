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
        let music = songObj['music_uri'];
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

const getSongs = () => {
  return db.queryAsync(`
  SELECT * FROM songs;
  `)
    .then((data) => {
      let rows = data[0].rows;
      let songs = [];
      rows.forEach((row) => {
        let song = [];
        song.push(row['name']);
        song.push(row['music_uri']);
        song.push(row['image_uri']);
        song.push(false);
        songs.push(song);
      });
      return songs;
    })
};

module.exports = {
  db,
  getSongs
};