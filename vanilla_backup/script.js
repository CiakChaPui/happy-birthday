document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect ---
    // Make text sleek and elegant. Focus on subtle delay and feel.
    const textToType = "Halo sayang,\nMau buka hadiah dari aku gak?";
    const typingEl = document.getElementById('typing-text');
    const actionBtns = document.getElementById('action-buttons');
    const cuteGif = document.getElementById('cute-gif');
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            if (textToType.charAt(charIndex) === '\n') {
                typingEl.innerHTML += '<br>';
            } else {
                typingEl.innerHTML += textToType.charAt(charIndex);
            }
            charIndex++;
            setTimeout(typeWriter, Math.random() * 50 + 60);
        } else {
            // Show modern glass button after typing finishes
            cuteGif.style.display = 'block';
            actionBtns.style.display = 'flex';
        }
    }

    setTimeout(typeWriter, 1200);

    // --- 2. Navigation Controls & Escaping Button ---
    const s1 = document.getElementById('section1');
    const s2 = document.getElementById('section2');
    const s3 = document.getElementById('section3');
    
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // Navigation: S1 -> S2 (Switch to Vintage Scrapbook)
    btnYes.addEventListener('click', () => {
        s1.classList.remove('active');
        document.body.classList.add('vintage-theme'); // Trigger vintage background
        
        setTimeout(() => {
            s2.classList.add('active');
        }, 800);
    });

    // Escaping Button NO Logic
    function moveNoButton() {
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '999';
            btnNo.style.transition = 'left 0.2s ease, top 0.2s ease'; // fast evasion
        }
        
        const btnRect = btnNo.getBoundingClientRect();
        
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
        btnNo.style.transform = 'none'; // Clear hover transform scales that could interfere
    }

    btnNo.addEventListener('mouseover', moveNoButton);
    // For mobile
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        moveNoButton();
    });

    // --- 3. 3D Flipbook Logic ---
    const pages = document.querySelectorAll('.book-page');
    const book = document.querySelector('.book');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSurprise = document.getElementById('btn-surprise');
    let currentPage = 0; // 0 = cover, 1 = spread 1, 2 = spread 2

    // Cover open button logic
    const btnOpenCover = document.getElementById('btn-open-cover');
    if(btnOpenCover) {
        btnOpenCover.addEventListener('click', () => {
            flipNext();
        });
    }

    function checkButtons() {
        if (currentPage === 0) {
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
            book.style.transform = 'translateX(0)'; // Center for cover
        } else {
            btnPrev.style.display = 'inline-flex';
            book.style.transform = 'translateX(50%)'; // Shift to center the spread
            
            if (currentPage >= pages.length) {
                // End of book
                btnNext.style.display = 'none';
                btnSurprise.style.display = 'inline-flex';
            } else {
                btnNext.style.display = 'inline-flex';
                btnSurprise.style.display = 'none';
            }
        }
    }

    function flipNext() {
        if (currentPage < pages.length) {
            pages[currentPage].classList.add('flipped');
            pages[currentPage].style.zIndex = currentPage + 1; // fix z-index issues
            currentPage++;
            checkButtons();
        }
    }

    function flipPrev() {
        if (currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove('flipped');
            pages[currentPage].style.zIndex = pages.length - currentPage;
            checkButtons();
        }
    }

    btnNext.addEventListener('click', flipNext);
    btnPrev.addEventListener('click', flipPrev);
    checkButtons(); // Initial check

    // Navigation: S2 -> S3 (Switch to Festive Cake)
    btnSurprise.addEventListener('click', () => {
        s2.classList.remove('active');
        document.body.classList.remove('vintage-theme'); 
        // Returning to modern dark or keeping it clean for cake
        
        setTimeout(() => {
            s3.classList.add('active');
        }, 800);
    });

    // --- 4. Cake, Candle & Confetti Logic ---
    const flame = document.getElementById('flame');
    const cakeArea = document.querySelector('.cake');
    const btnBlow = document.getElementById('btn-blow');
    const greeting = document.getElementById('greeting');
    const btnWA = document.getElementById('btn-wa');
    let isBlown = false;

    function blowCandle() {
        if (isBlown) return;
        isBlown = true;
        
        flame.classList.add('off');
        btnBlow.style.display = 'none';

        var duration = 3.5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
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
            greeting.classList.add('show');
            btnWA.classList.add('show');
        }, 400);
    }

    cakeArea.addEventListener('click', blowCandle);
    btnBlow.addEventListener('click', blowCandle);
});
