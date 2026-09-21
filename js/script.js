/**
 * Core System: Audio Ambient Control & Fireflies Canvas Particle System
 */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AMBIENT AUDIO CONTROLLER
    // ==========================================
    const audioBtn = document.getElementById('audio-control');
    const bgMusic = document.getElementById('bg-music');
    let isAudioPlaying = false;

    if (audioBtn && bgMusic) {
        bgMusic.volume = 0.35; // Volume musik latar diset lembut

        audioBtn.addEventListener('click', () => {
            if (isAudioPlaying) {
                bgMusic.pause();
                audioBtn.setAttribute('data-playing', 'false');
                audioBtn.querySelector('.audio-text').textContent = 'Atmosfer';
                isAudioPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    audioBtn.setAttribute('data-playing', 'true');
                    audioBtn.querySelector('.audio-text').textContent = 'Atmosfer On';
                    isAudioPlaying = true;
                }).catch(err => {
                    console.warn("Autoplay audio diblokir oleh browser. Membutuhkan interaksi pengguna.", err);
                });
            }
        });
    }

    // ==========================================
    // 2. FIREFLIES CANVAS SYSTEM
    // ==========================================
    const canvas = document.getElementById('fireflies-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Resize handler agar canvas selalu full screen
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Firefly {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1; // Ukuran 1px - 3px
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random();
                this.fadeSpeed = Math.random() * 0.008 + 0.003;
                this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Reset posisi jika keluar layar
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }

                // Efek berpendar (pudar - terang)
                this.opacity += this.fadeSpeed * this.fadeDirection;
                if (this.opacity >= 0.9) {
                    this.opacity = 0.9;
                    this.fadeDirection = -1;
                } else if (this.opacity <= 0.1) {
                    this.opacity = 0.1;
                    this.fadeDirection = 1;
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(226, 250, 173, ${this.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(226, 250, 173, 0.8)';
                ctx.fill();
                ctx.restore();
            }
        }

        // Jumlah kunang-kunang disesuaikan dengan lebar layar
        const firefliesCount = Math.min(Math.floor(window.innerWidth / 25), 40);
        const fireflies = Array.from({ length: firefliesCount }, () => new Firefly());

        function animateFireflies() {
            ctx.clearRect(0, 0, width, height);
            fireflies.forEach(firefly => {
                firefly.update();
                firefly.draw();
            });
            requestAnimationFrame(animateFireflies);
        }

        animateFireflies();
    }
});
// ==========================================
// 3. EXPLORE BUTTON & SMOOTH SCROLL
// ==========================================
const btnExplore = document.getElementById('btn-explore');
if (btnExplore) {
    btnExplore.addEventListener('click', () => {
        const valleySection = document.getElementById('valley');
        if (valleySection) {
            valleySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==========================================
// 4. INTERSECTION OBSERVER (FLOWER GROWTH & CARDS REVEAL)
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

// Pemicu animasi pertumbuhan SVG Bunga Lily
const flowerSection = document.getElementById('flower-reveal');
if (flowerSection) {
    const flowerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                flowerSection.classList.add('animate-growth');
                // Sekali terpicu, hentikan pengamatan agar animasi tidak berulang kaku
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    flowerObserver.observe(flowerSection);
}

// Pemicu animasi kartu "Why This Flower" bertahap
const cards = document.querySelectorAll('.card-item');
if (cards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));
}

// ==========================================
// 5. INTERACTIVE GARDEN (TOAST POPUP ON FLOWER CLICK)
// ==========================================
const gardenFlowers = document.querySelectorAll('.interactive-flower');
const flowerToast = document.getElementById('flower-toast');
let toastTimeout = null;

if (gardenFlowers.length > 0 && flowerToast) {
    gardenFlowers.forEach(flower => {
        flower.addEventListener('click', (e) => {
            // Efek goyang (sway animation) pada elemen bunga yang diklik
            flower.classList.remove('sway');
            void flower.offsetWidth; // Force reflow untuk mereset CSS animation
            flower.classList.add('sway');

            // Ambil pesan dari atribut data-message atau fallback data
            const message = flower.getAttribute('data-message') || "🌸";

            // Tampilkan popup toast
            flowerToast.textContent = message;
            flowerToast.classList.add('show');

            // Bersihkan timer sebelumnya jika ada klik beruntun
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }

            // Sembunyikan toast setelah 5,5 detik
            toastTimeout = setTimeout(() => {
                flowerToast.classList.remove('show');
            }, 5500);
        });
    });
}
// ==========================================
// 6. HIDDEN MESSAGE PUZZLE SYSTEM
// ==========================================
const secretFlowers = document.querySelectorAll('.secret-flower');
const wordSlots = document.querySelectorAll('.slot');
const puzzleCompleteBox = document.getElementById('puzzle-complete-box');
const btnToEnding = document.getElementById('btn-to-ending');
const collectedWords = [];

if (secretFlowers.length > 0) {
    secretFlowers.forEach(flower => {
        flower.addEventListener('click', () => {
            // Hindari pengklikan ulang pada bunga yang sama
            if (flower.classList.contains('found')) return;

            const word = flower.getAttribute('data-word');
            if (word && !collectedWords.includes(word)) {
                flower.classList.add('found');
                collectedWords.push(word);

                // Perbarui tampilan kata pada slot
                const slotIndex = collectedWords.length - 1;
                if (wordSlots[slotIndex]) {
                    wordSlots[slotIndex].textContent = word;
                    wordSlots[slotIndex].classList.add('filled');
                }

                // Cek apakah ketiga kata rahasia telah lengkap
                if (collectedWords.length === 3) {
                    setTimeout(() => {
                        if (puzzleCompleteBox) {
                            puzzleCompleteBox.classList.remove('hidden');
                            puzzleCompleteBox.classList.add('fade-in');
                        }
                    }, 600);
                }
            }
        });
    });
}

// ==========================================
// 7. FINAL LETTER & ENDING REVEAL SEQUENCE
// ==========================================
const finalLetterSection = document.getElementById('final-letter');

if (btnToEnding && finalLetterSection) {
    btnToEnding.addEventListener('click', () => {
        // Tampilkan kontainer surat akhir dan gulir dengan halus
        finalLetterSection.classList.remove('hidden');
        finalLetterSection.scrollIntoView({ behavior: 'smooth' });

        // Animasi kemunculan baris teks bertahap (cinematic staggered fade)
        const fadeLines = finalLetterSection.querySelectorAll('.fade-line');
        fadeLines.forEach(line => {
            const delayIndex = parseInt(line.getAttribute('data-delay') || '1', 10);
            
            // Jeda 1,2 detik per baris agar ritme membaca terasa tenang
            setTimeout(() => {
                line.classList.add('visible');
            }, delayIndex * 2500); // 2500ms = 2.5 detik
        });
    });
}