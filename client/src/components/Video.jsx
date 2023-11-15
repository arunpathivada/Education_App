import React from 'react';
import YouTube from 'react-youtube';

const Video = ({videoIds}) => {
  //const videoIds = ['cgevFXh7Ivo', '7NqyECHhgQY'];

  const opts = {
    height: '390',
    width: '800',
    playerVars: {
       autoplay: 0,
    },
  };

  return (
    <div>
      { videoIds && videoIds.map((videoId) => (
        (<YouTube key={videoId} videoId={videoId} opts={opts} />)
      ))}
    </div>
  );
};

export default Video;
