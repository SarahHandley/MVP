import React from 'react';

const SongList = ({ songs, addSongToSelected }) => {
  return(
    <div className='song-list-container'>
      <h2 className='subtitle'> All Songs </h2>
      <div id='song-list'>
        {songs.map((song, i) => {
          return(
            <div key={i} className='song'>
              <img src={song[2]} width='175px' height='175px'></img>
              <div className='song-name'>
                <div> {song[0]} </div>
                <i className={`icon fa-solid fa-plus ${i}`} onClick={(e)=>addSongToSelected(e.target.className.slice(22))}></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SongList;