import { useState, useEffect, useRef, useCallback } from 'react';

export default function IntroSection({ isActive, onNext }) {
  const [text, setText] = useState('');
  const [showActions, setShowActions] = useState(false);
  // null = not moved yet (in flow), object = fixed position coords
  const [noPos, setNoPos] = useState(null);
  const noRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    setText('');
    setShowActions(false);
    setNoPos(null);

    const textToType = "C uyung...,\nMau buka hadiah dari aku gak?";
    let charIndex = 0;

    const typeWriter = () => {
      if (charIndex < textToType.length) {
        setText(prev => prev + textToType.charAt(charIndex));
        charIndex++;
        setTimeout(typeWriter, Math.random() * 50 + 60);
      } else {
        setShowActions(true);
      }
    };

    const timeout = setTimeout(typeWriter, 1200);
    return () => clearTimeout(timeout);
  }, [isActive]);

  const getRandomPos = useCallback(() => {
    const btn = noRef.current;
    const btnW = btn ? btn.offsetWidth : 110;
    const btnH = btn ? btn.offsetHeight : 48;
    const pad = 20;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    // Avoid overlapping the center area where "Mau" button lives
    let x, y;
    do {
      x = pad + Math.random() * (vw - btnW - pad * 2);
      y = pad + Math.random() * (vh - btnH - pad * 2);
    } while (
      // Avoid centre band (where the yes button is)
      x > vw * 0.3 && x < vw * 0.7 &&
      y > vh * 0.45 && y < vh * 0.65
    );
    return { left: Math.round(x), top: Math.round(y) };
  }, []);

  const dodge = useCallback((e) => {
    e.preventDefault();
    setNoPos(getRandomPos());
  }, [getRandomPos]);

  return (
    <section id="section1" className={isActive ? 'active' : ''}>
       <img
          src="https://media.tenor.com/ef30M1n103AAAAAi/tkthao219-bubududu.gif"
          alt="Cute bear"
          className="cute-gif"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            pointerEvents: 'none'
          }}
       />

       <div className="glowing-text">
         {text.split('\n').map((line, i) => (
           <span key={i}>{line}<br/></span>
         ))}
       </div>

       <div className="action-buttons" style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            pointerEvents: showActions ? 'auto' : 'none'
       }}>
         <button className="modern-btn btn-yes" onClick={onNext}>Mau! 🥰</button>
       </div>

       {/* "Gak" button — rendered at fixed position once dodged */}
       {showActions && (
         <button
           ref={noRef}
           className="modern-btn btn-no"
           onMouseEnter={dodge}
           onMouseOver={dodge}
           onTouchStart={dodge}
           onClick={dodge}
           style={noPos
             ? {
                 position: 'fixed',
                 left: noPos.left + 'px',
                 top: noPos.top + 'px',
                 zIndex: 999,
                 transform: 'none',
                 opacity: 1,
                 transition: 'left 0.18s ease, top 0.18s ease',
                 pointerEvents: 'auto',
               }
             : {
                 // In-flow before first dodge (stays next to Mau button)
                 opacity: 1,
                 pointerEvents: 'auto',
               }
           }
         >
           Gak 😜
         </button>
       )}
    </section>
  );
}
