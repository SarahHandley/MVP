require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('../db/index.js').db;
const getSongs = require('../db/index.js').getSongs;
const addUser = require('../db/index.js').addUser;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/songs', (req, res) => {
  return getSongs()
    .then((songs) => res.send(songs))
    .catch((err) => console.log(err));
});

app.post('/user', (req, res) => {
  return addUser(req.body.user)
    .then((id) => res.send({'id': id}))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});