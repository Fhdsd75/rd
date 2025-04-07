import React, { useState } from 'react';

// Укажите пути к ресурсам: видео и фотографии
const VIDEO_SRC = '/img/car.mp4';  // Замените на актуальный путь к видео
const PHOTO_SRC = '/img/car.png';   // Замените на актуальный путь к фотографии

const Body = () => {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div style={{ width: '1280px', height: '642px', overflow: 'hidden' }}>
      {showVideo ? (
        <video
          src={VIDEO_SRC}
          width="1280"
          height="642"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <img
          src={PHOTO_SRC}
          alt="Background"
          width="1280"
          height="642"
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default Body;
