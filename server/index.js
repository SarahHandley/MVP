const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/songs', (req, res) => {
  return axios.get('http://acnhapi.com/v1/songs')
    .then((response) => {
      let songKeys = Object.keys(response.data);
      let songs = [];
      songKeys.forEach((key) => {
        let songObj = response.data[key];
        let song = [];
        song.push(songObj.name['name-USen']);
        song.push(songObj['music_uri']);
        song.push(songObj['image_uri']);
        song.push(false);
        songs.push(song);
      })
      res.send(songs);
    })
    .catch((err) => console.log(err));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});