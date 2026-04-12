import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Make sure to create this CSS file!

// TO DO: 
// 1. Host your chosen song online (e.g., Dropbox, Google Drive direct link, or put it in your /public folder)
// 2. Paste the link to the audio file here:
const SONG_URL = "PASTE_YOUR_AUDIO_DIRECT_LINK_HERE.mp3";
// 3. Preview image shown below; replace with your own photo URL or local public image path
const PHOTO_URL = '/birthday-photo.jpeg';

function App() {
  const [cardStage, setCardStage] = useState('envelope'); // envelope, open, message
  const audioRef = useRef(null);

  // Initialize Audio Object
  useEffect(() => {
    audioRef.current = new Audio(SONG_URL);
    audioRef.current.volume = 0.7; // Not too loud

    // Cleanup function to stop music if they close the tab
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const openCard = () => {
    setCardStage('open');
    
    // Play the audio (this works because it's triggered by a user click)
    audioRef.current.play().catch(error => console.log("Audio play failed:", error));

    // Set timer to stop music after 15 seconds
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
        audioRef.current.currentTime = 0; // Reset
      }
    }, 100); // Fade out over ~1 second
  };

  return (
    <div className="app-container">
      {/* Background decoration (floating hearts/stars) */}
      <div className="area" >
            <ul className="circles">
                    <li></li><li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li><li></li>
            </ul>
      </div >

      {/* STAGE 1: THE ENVELOPE (Needed to trigger audio on mobile) */}
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

      {/* STAGE 2: THE OPEN CARD & MESSAGE */}
      {cardStage === 'open' && (
        <div className="card-content fade-in">
          <div className="cake-icon">🎂</div>
          <h1 className="birthday-title">Happy Birthday!</h1>

          <div className="photo-frame">
            <img
              src={PHOTO_URL}
              alt="Birthday memory"
              className="card-photo"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
            />
          </div>
          
          <div className="message-body">
            <p>I wanted to make something unique for you because you’re a truly wonderful person, even from thousands of miles away.</p>
            
            <p className="divider">✦✦✦</p>
            
            {/* The delicate part of the message */}
            <p>To be honest with myself and you, I’ve had feelings for you for a while. 
               I know you’re happy in your relationship, and I sincerely respect that. 
               I didn't send this to change anything, but simply because I felt it was 
               better for me to be open about it than to keep it hidden.</p>
               
            <p>I value our connection, and I truly hope you have an amazing day and a great year ahead.</p>
          </div>
          
          <p className="signature">- Ajin Jeeslin..</p>
        </div>
      )}
    </div>
  );
}

export default App;