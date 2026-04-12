import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import songFile from '../public/marudhaani-marudhaani_jBNVCQDn.mp3?url';
import photoFile from '../public/birthday-photo.jpeg?url';

// TO DO:
// Asset URLs are imported directly from public folder
const SONG_URL = songFile;
// Photo URL
const PHOTO_URL = photoFile;

function App() {
  const [cardStage, setCardStage] = useState('envelope'); // envelope, open, message
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const openCard = () => {
    setCardStage('open');

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(encodeURI(`${SONG_URL}?t=${Date.now()}`));
    audioRef.current.volume = 0.7;
    audioRef.current.play().catch(error => console.log('Audio play failed:', error));
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
        <div className="birthday-card-closed">
          <div className="card-front">
            <div className="card-decoration">
              <div className="confetti">🎉</div>
              <div className="confetti">🎂</div>
              <div className="confetti">❤️</div>
              <div className="confetti">🌟</div>
            </div>
            <h2 className="card-front-title">Happy Birthday!</h2>
            <p className="card-front-message">A Special Surprise for You</p>
            <button className="open-card-btn" onClick={openCard}>Open Card →</button>
          </div>
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
                <p>To be honest with myself and you, I’ve had feelings for you from the first time I saw you in the Sunday Class in 4th Standard, it was in the our church's shool second floor we had our Sunday Class and I saw you for the first time you were in a Yellow Frock it was really the barbie doll came out of the move and walking near church like feelings and most of the time I even came to church just to see you and joined in the Peedasiragal just you joined and kept you as a role model even in studies to score atleast one mark ahead of you and did many things and these I was scared that our firendship would broke and not told these things and I am not able to keep it insdie so thought of just telling you.
                   </p>
                <p>I know you’re happy in your relationship, and I sincerely respect that.
                   I didn't send this to change anything, but simply because I felt it was
                   better for me to be open about it than to keep it hidden.</p>
                <p>I value our connection, and I truly hope you have an amazing day and a great year ahead.</p>
              </div>

              <p className="signature">- Ajin Jeeslin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
