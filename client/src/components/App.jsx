import React from 'react';
import axios from 'axios';
import LogIn from './LogIn.jsx';
import SongList from './SongList.jsx';
import SelectedSongList from './SelectedSongList.jsx';
import CurrentlyPlaying from './CurrentlyPlaying.jsx';

const { useState, useEffect } = React;

const App = () => {
  const [email, setEmail] = useState('');
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [userId, setUserId] = useState(0);

  const getSongs = (id) => {
    return axios.get(`/songs/${id}`)
      .then((response) => {
        setSongs(response.data.songs);
        setSelectedSongs(response.data.playlistSongs);
      })
      .catch((err) => console.log(err));
  };

  const handleClickAlbum = (songId) => {
    setCurrentSong(songs[songId]);
    if (currentSong.length !== 0) {
      let audioPlaying = document.getElementsByClassName('audio');
      audioPlaying[0].pause();
      audioPlaying[0].load();
    }
  };

  const handleClickPlay = (selectedSongId) => {
    setCurrentSong(selectedSongs[selectedSongId]);
    if (currentSong.length !== 0) {
      let audioPlaying = document.getElementsByClassName('audio');
      audioPlaying[0].pause();
      audioPlaying[0].load();
    }
  };

  const addSongToSelected = (songId) => {
    if (!songs[songId][3]) {
      let newSelectedSong = songs[songId].slice();
      newSelectedSong.splice(3, 1, true);
      setSelectedSongs([...selectedSongs, newSelectedSong.concat(songId)]);

      let newSongsList = songs.slice();
      newSongsList.splice(songId, 1, newSelectedSong);
      setSongs(newSongsList);

      return axios.post('/song', {
        userId: userId,
        songId: (Number(songId) + 1)
      })
        .catch((err) => console.log(err));
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

    return axios.delete('/song', {data: {
      userId: userId,
      songId: (Number(id) + 1)
    }})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentSong.length !== 0) {
      let audioPlaying = document.getElementsByClassName('audio');
      audioPlaying[0].play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (email !== '') {
      return axios.post('/user', {user: email})
        .then((res) => {
          setUserId(res.data.id);
          getSongs(res.data.id);
        })
        .catch((err) => console.log(err));
    }
  }, [email]);

  return(
  <div>
    {email === '' ?
      <LogIn setEmail={setEmail}/>
      :
      <div>
        <div id='heading'>
          <h1 id='title'> Animal Crossing Playlist </h1>
          <img id='isabelle-photo' src='isabelle_jammin.jpeg' height='250px'></img>
        </div>
        <div id='songs-container'>
          <SongList songs={songs} addSongToSelected={addSongToSelected} handleClickAlbum={handleClickAlbum}/>
          <div id='right-songs-container'>
            <SelectedSongList selectedSongs={selectedSongs} removeSongFromSelected={removeSongFromSelected} handleClickPlay={handleClickPlay}/>
            {currentSong.length !== 0 &&
              <CurrentlyPlaying currentSong={currentSong}/>
            }
          </div>
        </div>
      </div>
    }
  </div>);
};

export default App;