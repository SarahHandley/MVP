import React from 'react';

const CurrentlyPlaying = ({ currentSong }) => {
  return(
    <div id='audio-player-container'>
      <h2 className='subtitle'> Currently Playing </h2>
      <div id='audio-player'>
        <div id='audio-header'>
          <img src={currentSong[2]} width='225px'></img>
          <div> {currentSong[0]} </div>
        </div>
        <audio controls className='audio'>
          <source src={currentSong[1]} type='audio/mp3'></source>
          Your browser does not support audio.
        </audio>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;