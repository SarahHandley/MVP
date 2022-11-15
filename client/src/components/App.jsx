import React from 'react';
import axios from 'axios';
import SongList from './SongList.jsx';
import SelectedSongList from './SelectedSongList.jsx';

const { useState, useEffect } = React;

const App = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState('');

  const getSongs = () => {
    return axios.get('/songs')
      .then((response) => setSongs(response.data))
      .catch((err) => console.log(err));
  };

  const handleClickPlayInPlaylist = (selectedSongId) => {
    setCurrentSong(selectedSongs[selectedSongId][1]);
  };

  const addSongToSelected = (songId) => {
    if (!songs[songId][3]) {
      let newSelectedSong = songs[songId].slice();
      newSelectedSong.splice(3, 1, true);
      setSelectedSongs([...selectedSongs, newSelectedSong.concat(songId)]);

      let newSongsList = songs.slice();
      newSongsList.splice(songId, 1, newSelectedSong);
      setSongs(newSongsList);
    }
  };

  const removeSongFromSelected = (selectedSongId) => {
    let newSelectedSongsList = selectedSongs.slice();
    newSelectedSongsList.splice(selectedSongId, 1);
    setSelectedSongs(newSelectedSongsList);

    let unselectedSong = selectedSongs[selectedSongId];
    let id = unselectedSong[4];
    unselectedSong.splice(3, 2, false);
    let newSongsList = songs.slice();
    newSongsList.splice(id, 1, unselectedSong);
    setSongs(newSongsList);
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
      <div id='right-songs-container'>
        <SelectedSongList selectedSongs={selectedSongs} removeSongFromSelected={removeSongFromSelected} handleClickPlayInPlaylist={handleClickPlayInPlaylist}/>
        {currentSong !== '' &&
          <audio controls>
            <source src={currentSong} type='audio/mp3'></source>
            Your browser does not support audio.
          </audio>
        }
      </div>
    </div>
  </div>);
};

export default App;