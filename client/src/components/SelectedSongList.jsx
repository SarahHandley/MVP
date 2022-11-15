import React from 'react';

const SelectedSongList = ({ selectedSongs, removeSongFromSelected, handleClickPlayInPlaylist }) => {
  return(
    <div className='selected-songs-container'>
      <h2 className='subtitle'> My Songs </h2>
      {selectedSongs.length === 0 &&
        <div id='add-songs-notice'> No Songs In Playlist... </div>}
      <div id='selected-song-list'>
        {selectedSongs.map((song, i) => {
          return(
            <div key={i} className='selected-song'>
              <img src={song[2]} width='50px' height='50px'></img>
              <div className='song-name'>
                <div> {song[0]} </div>
              </div>
              <i className={`play-icon fa-solid fa-play ${i}`} onClick={(e) => handleClickPlayInPlaylist(e.target.className.slice(27))}></i>
              <i className={`remove-icon fa-solid fa-xmark ${i}`} onClick={(e) => removeSongFromSelected(e.target.className.slice(30))}></i>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SelectedSongList;