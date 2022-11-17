import React from 'react';
import SongListItem from './SongListItem.jsx';

const SongList = ({ songs, page, setPage, addSongToSelected, handleClickAlbum }) => {
  const handleLeftArrowClick = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (page !== 8) {
      setPage(page + 1);
    }
  };

  return(
    <div className='song-list-container'>
      <h2 className='subtitle'> All Songs </h2>
      <div id='song-list'>
        {songs.slice(12 * page, 12 * (page + 1)).map((song, i) => {
          return(<SongListItem song={song} key={i} addSongToSelected={addSongToSelected} handleClickAlbum={handleClickAlbum} id={i}/>)
        })}
      </div>
      <div id='arrow-container'>
        <i className="fa-solid fa-arrow-left" onClick={handleLeftArrowClick}></i>
        <div> Page </div>
        <i className="fa-solid fa-arrow-right" onClick={handleRightArrowClick}></i>
      </div>
    </div>
  );
};

export default SongList;