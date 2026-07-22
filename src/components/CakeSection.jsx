import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function CakeSection({ isActive }) {
  const [isBlown, setIsBlown] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);

    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);

    setTimeout(() => {
        setShowGreeting(true);
    }, 400);
  };

  return (
    <section id="section3" className={isActive ? 'active' : ''}>
        <h1 className={`greeting-text ${showGreeting ? 'show' : ''}`} id="greeting">Happy Birthday Sayang! 🎂</h1>
        
        <div className="cake-container">
            <div className="cake" title="Klik kue / Lilin untuk meniup!" onClick={handleBlow}>
                <div className="plate"></div>
                <div className="layer layer-bottom"></div>
                <div className="layer layer-middle"></div>
                <div className="layer layer-top">
                    <div className="icing"></div>
                    <div className="drip" style={{ left: '10%', height: '35px' }}></div>
                    <div className="drip" style={{ left: '30%', height: '50px' }}></div>
                    <div className="drip" style={{ left: '50%', height: '40px' }}></div>
                    <div className="drip" style={{ left: '70%', height: '55px' }}></div>
                    <div className="drip" style={{ left: '85%', height: '30px' }}></div>
                </div>
                <div className="candle">
                    <div className={`flame ${isBlown ? 'off' : ''}`} id="flame"></div>
                </div>
            </div>
            
            {!isBlown && (
              <button className="modern-btn" id="btn-blow" style={{ background: 'rgba(244,63,94,0.15)', borderColor: 'rgba(244,63,94,0.4)' }} onClick={handleBlow}>
                  Tiup Lilin 🌬️
              </button>
            )}
            
            <a 
              href="https://api.whatsapp.com/send?phone=6282281923174&text=Halo%20sayang!%20Makasih%20ya%20kejutan%20ulang%20tahunnya,%20aku%20suka%20banget!%20%E2%9D%A4%EF%B8%8F" 
              target="_blank" 
              rel="noreferrer"
              className={`btn-wa ${showGreeting ? 'show' : ''}`} 
              id="btn-wa"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.898-4.45 9.899-9.898 0-2.64-1.026-5.119-2.894-6.985-1.87-1.866-4.35-2.893-6.993-2.893-5.451 0-9.901 4.451-9.9 9.897 0 2.02.484 3.864 1.488 5.44l-1.127 4.116 4.135-1.269zm8.567-5.753c-.354-.177-2.096-1.036-2.42-1.155-.323-.118-.559-.177-.794.177-.235.353-.912 1.154-1.117 1.391-.206.235-.412.264-.764.088-.354-.177-1.492-.55-2.844-1.758-1.053-.941-1.764-2.103-1.97-2.455-.205-.353-.022-.544.155-.72.161-.16.354-.412.531-.617.177-.206.235-.353.354-.588.118-.235.059-.441-.029-.617-.089-.176-.795-1.916-1.09-2.624-.286-.689-.577-.596-.794-.606-.205-.011-.441-.011-.676-.011-.235 0-.618.088-.942.441-.323.353-1.235 1.206-1.235 2.943s1.265 3.413 1.441 3.649c.176.235 2.489 3.882 6.079 5.385 1.258.528 2.239.843 3.003 1.079 1.261.389 2.411.334 3.327.202 1.033-.149 3.178-1.302 3.619-2.56.441-1.258.441-2.336.31-2.56-.134-.234-.499-.373-.854-.559z"/>
                </svg>
                Kirim Pesan Sayang
            </a>
        </div>
    </section>
  )
}
