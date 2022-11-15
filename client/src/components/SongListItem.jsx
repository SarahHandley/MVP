import React from 'react';

const SongListItem = ({ song, addSongToSelected, id }) => {
  return(
    <div className='song'>
      <img src={song[2]} width='175px' height='175px'></img>
      <div className='song-name'>
        <div> {song[0]} </div>
        {song[3] ?
          <i className="check-icon fa-solid fa-check"></i>
          : <i className={`icon fa-solid fa-plus ${id}`} onClick={(e)=>addSongToSelected(e.target.className.slice(22))}></i>
        }
      </div>
    </div>
  );
};

export default SongListItem;