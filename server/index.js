require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('../db/index.js').db;
const getSongs = require('../db/index.js').getSongs;
const addUser = require('../db/index.js').addUser;
const addSong = require('../db/index.js').addSong;
const deleteSong = require('../db/index.js').deleteSong;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/songs/:userId', (req, res) => {
  return getSongs(req.params.userId)
    .then((results) => res.send(results))
    .catch((err) => console.log(err));
});

app.post('/user', (req, res) => {
  return addUser(req.body.user)
    .then((id) => res.send({'id': id}))
    .catch((err) => console.log(err));
});

app.post('/song', (req, res) => {
  return addSong(req.body)
    .then(() => res.end())
    .catch((err) => console.log(err));
});

app.delete('/song', (req, res) => {
  return deleteSong(req.body)
    .then(() => res.end())
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});