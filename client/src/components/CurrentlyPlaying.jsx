import React from 'react';

const CurrentlyPlaying = ({ currentSong }) => {
  return(
    <div id='audio-player-container'>
      {currentSong.length === 0 ?
        <div id='play-song-notice'> {'< No Song Selected >'} </div>
        :
        <div id='audio-player'>
          <img src={currentSong[2]} height='150px' width='150px'></img>
          <div id='music'>
            <div> {currentSong[0]} </div>
            <audio controls className='audio'>
              <source src={currentSong[1]} type='audio/mp3'></source>
              Your browser does not support audio.
            </audio>
          </div>
        </div>
      }
    </div>
  );
};

export default CurrentlyPlaying;