import React from 'react';
import axios from 'axios';
import SongList from './SongList.jsx';
import SelectedSongList from './SelectedSongList.jsx';

const { useState, useEffect } = React;

const App = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const getSongs = () => {
    return axios.get('/songs')
      .then((response) => setSongs(response.data))
      .catch((err) => console.log(err));
  };

  const addSongToSelected = (songId) => {
    setSelectedSongs([...selectedSongs, songs[songId]]);
  };

  const removeSongFromSelected = (selectedSongId) => {
    let newSelectedSongsList = selectedSongs.slice();
    newSelectedSongsList.splice(selectedSongId, 1);
    setSelectedSongs(newSelectedSongsList);
  };

  useEffect(() => {
    getSongs();
  }, []);

  return(
  <div>
    <div id='heading'>
      <h1 id='title'> Animal Crossing Playlist </h1>
      <img id='isabelle-photo' src='isabelle_jammin.jpeg' height='250px'></img>
    </div>
    <div id='songs-container'>
      <SongList songs={songs} addSongToSelected={addSongToSelected}/>
      <SelectedSongList selectedSongs={selectedSongs} removeSongFromSelected={removeSongFromSelected}/>
    </div>
  </div>);
};

export default App;