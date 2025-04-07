import React, { useRef } from 'react';

const VIDEO_SRC = '/img/car2.mp4';  // Замените на актуальный путь к видео

const Body = () => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration - 0;
      videoRef.current.pause();
    }
  };

  return (
    <div style={{ width: '1280px', height: '642px', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        width="1280"
        height="642"
        autoPlay
        muted
        onEnded={handleVideoEnd}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default Body;
