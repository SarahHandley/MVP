import React from 'react';
import SongListItem from './SongListItem.jsx';

const SongList = ({ songs, addSongToSelected }) => {
  return(
    <div className='song-list-container'>
      <h2 className='subtitle'> All Songs </h2>
      <div id='song-list'>
        {songs.map((song, i) => {
          return(<SongListItem song={song} key={i} addSongToSelected={addSongToSelected} id={i}/>)
        })}
      </div>
    </div>
  );
};

export default SongList;