import { useState, useEffect } from 'react';

export default function IntroSection({ isActive, onNext }) {
  const [text, setText] = useState('');
  const [showActions, setShowActions] = useState(false);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Reset state each time it becomes active (if we ever route back)
    setText('');
    setShowActions(false);
    
    const textToType = "C uyung...,\nMau buka hadiah dari aku gak?";
    let charIndex = 0;
    
    const typeWriter = () => {
      if (charIndex < textToType.length) {
        // Append char by char safely
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

  const moveNoButton = (e) => {
    const btn = e.target;
    if (btn.style.position !== 'fixed') {
      btn.style.position = 'fixed';
      btn.style.zIndex = '999';
    }
    const btnW = btn.offsetWidth || 100;
    const btnH = btn.offsetHeight || 50;
    const safePadding = 50;
    
    // Gunakan documentElement agar lebih akurat di mobile browser dibanding window.innerHeight
    const maxX = document.documentElement.clientWidth - btnW - safePadding;
    const maxY = document.documentElement.clientHeight - btnH - safePadding;
    
    const randomX = Math.max(safePadding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(safePadding, Math.floor(Math.random() * maxY));
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transform = 'none';
  };

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
         <button 
            className="modern-btn btn-no" 
            onMouseOver={moveNoButton} 
            onTouchStart={(e) => { e.preventDefault(); moveNoButton(e); }}
            onClick={moveNoButton}
         >
            Gak 😜
         </button>
       </div>
    </section>
  );
}
