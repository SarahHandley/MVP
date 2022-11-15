import React from 'react';
import axios from 'axios';

const { useState, useEffect } = React;

const App = () => {
  const [songs, setSongs] = useState([]);
  const [photo, setPhoto] = useState('');

  const getSongs = () => {
    return axios.get('http://acnhapi.com/v1/songs')
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSongs();
  }, [songs]);

  return (
  <div>Hello World {console.log(songs)}</div>);
};

export default App;