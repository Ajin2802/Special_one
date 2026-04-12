import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// TO DO:
// 1. Host your chosen song online (e.g., Dropbox, Google Drive direct link, or put it in your /public folder)
// 2. Paste the link to the audio file here:
const SONG_URL = 'PASTE_YOUR_AUDIO_DIRECT_LINK_HERE.mp3';
// 3. Actual photo from public folder path
const PHOTO_URL = '/birthday-photo.jpeg';

function App() {
  const [cardStage, setCardStage] = useState('envelope');
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(SONG_URL);
    audioRef.current.volume = 0.7;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const openCard = () => {
    setCardStage('open');
    audioRef.current.play().catch(error => console.log('Audio play failed:', error));

    setTimeout(() => {
      fadeOutAudio();
    }, 15000);
  };

  const fadeOutAudio = () => {
    if (!audioRef.current) return;

    let volume = audioRef.current.volume;
    const fadeInterval = setInterval(() => {
      if (volume > 0.1) {
        volume -= 0.1;
        audioRef.current.volume = volume;
      } else {
        clearInterval(fadeInterval);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 100);
  };

  return (
    <div className="app-container">
      <div className="area">
        <ul className="circles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
      </div>

      {cardStage === 'envelope' && (
        <div className="envelope-wrapper">
          <div className="envelope" onClick={openCard}>
            <div className="flap"></div>
            <div className="body"></div>
            <div className="heart">❤️</div>
          </div>
          <p className="tap-instruction">A little something for your birthday...</p>
          <button className="open-btn" onClick={openCard}>Tap to Open</button>
        </div>
      )}

      {cardStage === 'open' && (
        <div className="card-content fade-in">
          <div className="card-inner">
            <div className="photo-panel">
              <img
                src={PHOTO_URL}
                alt="Birthday memory"
                className="card-photo"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            </div>

            <div className="text-panel">
              <div className="card-heading">
                <div className="cake-icon">🎂</div>
                <h1 className="birthday-title">Happy Birthday!</h1>
              </div>

              <div className="message-body">
                <p>I wanted to make something unique for you because you’re a truly wonderful person, even from thousands of miles away.</p>
                <p className="divider">✦✦✦</p>
                <p>To be honest with myself and you, I’ve had feelings for you for a while.
                   I know you’re happy in your relationship, and I sincerely respect that.
                   I didn't send this to change anything, but I felt it was
                   better for me to keep it hidden.</p>
                <p>I value our connection, and I truly hope you have an amazing day and a great year ahead.</p>
              </div>

              <p className="signature">- [Your Name]</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
