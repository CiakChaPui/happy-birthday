import { useState, useEffect, useRef } from 'react';

// Message loop texts from reference site
const messages = [
  "Today is...",
  "as beautiful as any other day",
  "but you realize",
  "another year has gone",
  "in the blink of an eye",
  "however",
  "Do you know..?",
  "today is just as special",
  "so special to you",
  "that's why",
  "Let's make it...",
  "the best celebration ever",
  "and let me share...",
  "a piece of happiness to you",
  "I made all this...",
  "as a birthday present to you",
  "thanks for being there",
  "thanks for the memories we've made",
  "thanks for everything",
  "I wish you all the best",
  "May your life be at ease",
  "May all your wishes come true",
  "Remember",
  "your ambitions",
  "you live as a free bird...",
  "flying in the blue sky",
  "Now things are different...",
  "real story of your life",
  "is just about to begin",
  "indeed..",
  "this life is not as easy as we thought",
  "but...",
  "don't worry",
  "don't be afraid",
  "because...",
  "you are not alone in this world",
  "because...",
  "this year will be better",
  "and I hope",
  "you'll find...",
  "happiness along the way",
  "keep your spirits up",
  "enjoy every single moment...",
  "that you will experience today",
  "fill it with your most beautiful smile",
  "and make it the best memory..",
  "lastly...",
  "I'd like to wish you one more time",
  "a very happy birthday",
];

// Balloon letters: LAURA JULIANT (12 letters)
const balloonLetters = ['L','A','U','R','A','J','U','L','I','A','N','T'];
const balloonColors = ['#F2B300','#0719D4','#D14D39','#8FAD00','#8377E4','#99C96A','#20CFB4','#F2B300','#F2B300','#0719D4','#D14D39','#8FAD00'];

export default function CakeSection({ isActive }) {
  const [step, setStep] = useState(0);
  const [balloonBorderTop, setBalloonBorderTop] = useState('100%');
  const [balloonsFlying, setBalloonsFlying] = useState(false);
  const [balloonsConverge, setBalloonsConverge] = useState(false);
  const [cakeVisible, setCakeVisible] = useState(false);
  const [flameVisible, setFlameVisible] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgFade, setMsgFade] = useState(true); // true = fade-in
  const [cakeFadeOut, setCakeFadeOut] = useState(false);
  const [showLetters, setShowLetters] = useState(false);
  const audioRef = useRef(null);
  const msgTimerRef = useRef(null);

  // Reset state when section becomes active
  useEffect(() => {
    if (!isActive) return;
    setStep(0);
    setBalloonBorderTop('100%');
    setBalloonsFlying(false);
    setBalloonsConverge(false);
    setCakeVisible(false);
    setFlameVisible(false);
    setMsgVisible(false);
    setMsgIndex(0);
    setMsgFade(true);
    setCakeFadeOut(false);
    setShowLetters(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isActive]);

  // Message loop logic (step 8)
  useEffect(() => {
    if (step !== 8) return;

    let i = 0;
    setMsgIndex(0);
    setMsgFade(true);

    function cycle() {
      // Fade out current
      setMsgFade(false);
      msgTimerRef.current = setTimeout(() => {
        i++;
        if (i >= messages.length) {
          // End: show cake again
          setCakeFadeOut(false);
          setMsgVisible(false);
          return;
        }
        setMsgIndex(i);
        setMsgFade(true);
        msgTimerRef.current = setTimeout(cycle, 2800);
      }, 800);
    }

    msgTimerRef.current = setTimeout(cycle, 2800);

    return () => clearTimeout(msgTimerRef.current);
  }, [step]);

  const handleNext = () => setStep(prev => prev + 1);

  // Step 1: Turn on lights
  const handleTurnOn = () => {
    setStep(1);
  };

  // Step 2: Play music, bulbs start blinking
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setStep(2);
  };

  // Step 3: Banner drops
  const handleBannar = () => {
    setStep(3);
  };

  // Step 4: Balloons fly + border animates up
  const handleBalloons = () => {
    setBalloonsFlying(true);
    setBalloonBorderTop('-500px');
    setTimeout(() => setStep(4), 1000);
  };

  // Step 5: Cake fades in
  const handleCakeFadein = () => {
    setCakeVisible(true);
    setStep(5);
  };

  // Step 6: Light candle (flames appear)
  const handleLightCandle = () => {
    setFlameVisible(true);
    setStep(6);
  };

  // Step 7: Wish message – balloons converge showing letters
  const handleWishMessage = () => {
    setBalloonsConverge(true);
    setTimeout(() => setShowLetters(true), 1000);
    setTimeout(() => setStep(7), 500);
  };

  // Step 8: Story → close the cake container, show message loop
  const handleStory = () => {
    setCakeFadeOut(true);
    setStep(8);
    setTimeout(() => {
      setMsgVisible(true);
    }, 600);
  };

  if (!isActive) return null;

  return (
    <section id="section3" className={`ref-cake-section ${isActive ? 'active' : ''}`}>
      {/* Audio */}
      <audio ref={audioRef} className="hbd-song" loop src="/hbd.mp3" />

      {/* Dark overlay that fades out on step 1 */}
      <div
        className="ref-dark-overlay"
        style={{ opacity: step >= 1 ? 0 : 1 }}
      />

      {/* Peach animated background */}
      <div
        className={`ref-peach-bg ${step >= 1 ? 'peach' : ''} ${step >= 2 ? 'peach-alive' : ''}`}
      />

      {/* Balloon Border (fixed bottom → animates off top on step 4) */}
      <img
        src="/Balloon-Border.png"
        className="ref-balloon-border"
        style={{ top: balloonBorderTop }}
        alt=""
      />

      {/* 12 PNG Balloons - fixed position, fly up on step 4 */}
      {!balloonsConverge && [0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        // Spread 12 balloons across viewport width
        const leftPct = 2 + i * 8;
        const balloonStyle = {
          backgroundImage: `url('/b${(i % 8) + 1}.png')`,
          left: `${leftPct}%`,
          bottom: '-200px',
        };
        if (balloonsFlying) {
          Object.assign(balloonStyle, {
            animation: `balloonFly${i % 8} 8s ease-in forwards`,
          });
        }
        return (
          <div
            key={i}
            className={`ref-balloon ${balloonsFlying ? (i % 2 === 0 ? 'rotate-one' : 'rotate-two') : ''}`}
            style={balloonStyle}
            id={`balloon-${i}`}
          />
        );
      })}

      {/* Converge overlay: show name as 2-row balloon grid */}
      {balloonsConverge && (
        <div className="ref-converge-overlay">
          <div className="ref-converge-row">
            {['L','A','U','R','A'].map((letter, i) => (
              <div key={i} className="ref-converge-balloon" style={{ backgroundImage: `url('/b${(i % 8) + 1}.png')` }}>
                <span style={{ color: balloonColors[i] }}>{letter}</span>
              </div>
            ))}
          </div>
          <div className="ref-converge-row">
            {['J','U','L','I','A','N','T'].map((letter, i) => (
              <div key={i} className="ref-converge-balloon" style={{ backgroundImage: `url('/b${(i + 5) % 8 + 1}.png')` }}>
                <span style={{ color: balloonColors[(i + 5) % 12] }}>{letter}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="ref-container visible">

        {/* Bulbs row */}
        <div className="ref-bulb-row">
          {['yellow','red','blue','green','pink','orange'].map((color, i) => (
            <div className="ref-bulb-holder" key={i}>
              <div
                className={`ref-bulb ${step >= 1 ? `bulb-glow-${color}` : ''} ${step >= 2 ? `bulb-glow-${color}-after` : ''}`}
                id={`bulb_${color}`}
              />
            </div>
          ))}
        </div>

        {/* Banner row */}
        <div className="ref-banner-row">
          <img
            src="/banner.png"
            className={`ref-bannar ${step >= 3 ? 'bannar-come' : ''}`}
            alt="Happy Birthday Banner"
          />
        </div>

        {/* Cake area */}
        <div
          className="ref-cake-cover"
          style={{
            opacity: cakeFadeOut ? 0 : cakeVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: cakeVisible && !cakeFadeOut ? 'auto' : 'none',
          }}
        >
          <div className="ref-cake">
            <div className="ref-velas">
              {[1,2,3,4,5].map(n => (
                <div
                  key={n}
                  className="ref-fuego"
                  style={{ display: flameVisible ? 'block' : 'none' }}
                />
              ))}
            </div>
            <div className="ref-cobertura" />
            <div className="ref-bizcocho" />
          </div>
        </div>

        {/* Message (scrolling story) */}
        {msgVisible && (
          <div className="ref-message">
            <p
              style={{
                opacity: msgFade ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
            >
              {messages[msgIndex]}
            </p>
          </div>
        )}

        {/* Button panel */}
        <div className="ref-control-panel">
          {step === 0 && (
            <button className="modern-btn" id="turn_on" onClick={handleTurnOn}>
              Turn On Lights
            </button>
          )}
          {step === 1 && (
            <button className="modern-btn" id="play" onClick={handlePlay}>
              Play Music
            </button>
          )}
          {step === 2 && (
            <button className="modern-btn" id="bannar_coming" onClick={handleBannar}>
              Let's Decorate
            </button>
          )}
          {step === 3 && (
            <button className="modern-btn" id="balloons_flying" onClick={handleBalloons}>
              Fly With Balloons
            </button>
          )}
          {step === 4 && (
            <button className="modern-btn" id="cake_fadein" onClick={handleCakeFadein}>
              Most Delicious Cake Ever
            </button>
          )}
          {step === 5 && (
            <button className="modern-btn" id="light_candle" onClick={handleLightCandle}>
              Light Candle
            </button>
          )}
          {step === 6 && (
            <button className="modern-btn" id="wish_message" onClick={handleWishMessage}>
              Happy Birthday
            </button>
          )}
          {step === 7 && (
            <button className="modern-btn" id="story" onClick={handleStory}>
              A Message For You
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
