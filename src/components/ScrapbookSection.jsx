import { useState } from 'react';

export default function ScrapbookSection({ isActive, onNext }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const flipNext = () => {
     if (currentPage < totalPages) {
       setCurrentPage(prev => prev + 1);
     }
  };

  const flipPrev = () => {
     if (currentPage > 0) {
       setCurrentPage(prev => prev - 1);
     }
  };

  const showPrev = currentPage > 0;
  const showNext = currentPage > 0 && currentPage < totalPages;
  const showSurprise = currentPage >= totalPages;

  return (
    <section id="section2" className={isActive ? 'active' : ''}>
       <div className="vintage-decor decor-top-left">🦋</div>
       <div className="vintage-decor decor-bottom-right">🌻</div>

       <div className="book-wrapper">
         <div className={`book ${currentPage > 0 && currentPage < totalPages ? 'is-open' : ''} ${currentPage === totalPages ? 'is-closed-back' : ''}`}>
           
           {/* Page 1 (Cover) */}
           <div className={`book-page ${currentPage > 0 ? 'flipped' : ''}`} style={{ zIndex: currentPage > 0 ? 1 : 3 }}>
              <div className="page-face front cover-face">
                  <div className="cover-content">
                      <div className="polaroid-mini" style={{ top: '10%', left: '10%', transform: 'rotate(-5deg)' }}>
                          <div className="polaroid-mini-img" style={{ position: 'relative' }}>
                              <img src="/images/1.jpg" alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                          </div>
                      </div>
                      <div className="polaroid-mini" style={{ top: '40%', right: '10%', transform: 'rotate(8deg)' }}>
                          <div className="polaroid-mini-img" style={{ position: 'relative' }}>
                              <img src="/images/2.jpg" alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                          </div>
                      </div>
                      <div className="polaroid-mini" style={{ bottom: '15%', left: '15%', transform: 'rotate(-2deg)' }}>
                          <div className="polaroid-mini-img" style={{ position: 'relative' }}>
                              <img src="/images/3.jpg" alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                          </div>
                      </div>
                      <h2 className="cover-title"><span>HAPPY</span><br/>Special Day</h2>
                  </div>
              </div>
              <div className="page-face back">
                  <div className="page-content spread-left">
                      <div className="washi-tape" style={{ top: '-10px', left: '40%' }}></div>
                      <div className="scrap-note">
                          <p>Selamat Ulang Tahun, Cuyung ku. Semoga aku berhasil jadi orang pertama yang ucapin itu, yang terpenting aku masih nemuin ulang tahun kali ini sama kamu.</p>
                      </div>
                  </div>
              </div>
           </div>
           
           {/* Page 2 */}
           <div className={`book-page ${currentPage > 1 ? 'flipped' : ''}`} style={{ zIndex: currentPage > 1 ? 2 : 2 }}>
              <div className="page-face front">
                  <div className="page-content spread-right">
                      <div className="polaroid-vintage">
                          <div className="polaroid-vintage-img" style={{ position: 'relative' }}>
                              <img src="/images/4.jpg" alt="Memory" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }} onError={(e) => e.target.style.display = 'none'} />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ zIndex: 1, position: 'relative' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" /></svg>
                          </div>
                      </div>
                      <div className="flower-sticker" style={{ bottom: '20%', right: '-10px' }}>🌼</div>
                  </div>
              </div>
              <div className="page-face back">
                  <div className="page-content spread-left grid-bg">
                      <h3 className="scrap-title" style={{ transform: 'rotate(-3deg)' }}>ME AND YOU</h3>
                      <div className="scrap-note-white">
                          <p>I love you on your birthday, and everyday, now and forever.</p>
                          <div className="washi-tape" style={{ bottom: '-5px', right: '20%', background: '#94a3b8', width: '60px' }}></div>
                      </div>
                  </div>
              </div>
           </div>
           
           {/* Page 3 */}
           <div className={`book-page ${currentPage > 2 ? 'flipped' : ''}`} style={{ zIndex: currentPage > 2 ? 3 : 1 }}>
              <div className="page-face front">
                  <div className="page-content spread-right torn-bg">
                      <div className="polaroid-vintage" style={{ top: '10%', right: '10%', width: '80%', transform: 'rotate(3deg)' }}>
                          <div className="polaroid-vintage-img" style={{ aspectRatio: '16/9', background:'#57534e', position: 'relative' }}>
                              <img src="/images/5.jpg" alt="Memory" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                          </div>
                          <div className="caption-hand">Special Memories</div>
                      </div>
                      <div className="scrap-note" style={{ bottom: '10px', width: '90%', fontSize: '0.9rem' }}>
                          <p>Maaf buat perilaku yang nyakitin kamu.. I'm so lucky have you. Jangan bosen sama aku, aku udah cukup berantakan apalagi kalo ga sama kamu.<br/><br/>I love you cuyung...</p>
                      </div>
                  </div>
              </div>
              <div className="page-face back cover-face" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 30px' }}>
                  <h3 style={{ fontFamily: 'var(--font-accent)', color: '#ffdcb5', fontSize: '1.5rem', textAlign: 'center', marginBottom: '15px', fontStyle: 'italic' }}>Tumbuh Bersama</h3>
                  <p style={{ fontFamily: 'var(--font-display)', color: '#f1e9d2', textAlign: 'center', fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    "Mari terus belajar dan saling memahami sebagai pasangan. Beriringan langkah untuk saling membaikkan, agar kita bisa terus bersama menjadi versi terbaik dari diri kita."
                  </p>
                  <div className="flower-sticker" style={{ position: 'relative', marginTop: '25px', fontSize: '2rem' }}>🤍</div>
              </div>
           </div>

         </div>
       </div>

       <div className="scrapbook-controls">
         {currentPage === 0 && <button className="vintage-btn" onClick={flipNext}>Open</button>}
         
         <button className="vintage-btn-round" onClick={flipPrev} style={{ display: showPrev ? 'flex' : 'none' }}>←</button>
         <button className="vintage-btn-round" onClick={flipNext} style={{ display: showNext ? 'flex' : 'none' }}>→</button>
         
         <button className="vintage-btn btn-surprise" onClick={onNext} style={{ display: showSurprise ? 'block' : 'none' }}>Kejutan Terakhir 🎉</button>
       </div>
    </section>
  );
}
