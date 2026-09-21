/* ==========================================
   DATA & CONTENT CONFIGURATION - LILY OF THE VALLEY
   ========================================== */

const valleyData = {
    // ------------------------------------------
    // Section 4: Cards Reveal (Kartu Alasan / Makna)
    // ------------------------------------------
    cards: [
        {
            id: 1,
            title: "Kehadiran yang Tenang",
            description: "Tak perlu menjadi yang paling menonjol untuk memberikan arti. Seperti Lily of the Valley, keindahan sejati tumbuh dalam keheningan.",
            icon: "🌸"
        },
        {
            id: 2,
            title: "Ketulusan Sederhana",
            description: "Setiap langkah kecil dan perhatian sederhana membawa kehangatan yang tak tergantikan dalam setiap momen.",
            icon: "🌿"
        },
        {
            id: 3,
            title: "Harapan & Kebahagiaan",
            description: "Menjadi simbol mekarnya kembali kebahagiaan, memberi pengingat bahwa hal-hal indah selalu hadir pada waktunya.",
            icon: "✨"
        }
    ],

    // ------------------------------------------
    // Section 5: Interactive Garden (Taman Interaktif)
    // ------------------------------------------
    gardenFlowers: [
        { id: 1, message: "Kebaikan kecilmu selalu berbekas." },
        { id: 2, message: "Terima kasih sudah bertahan sampai sejauh ini." },
        { id: 3, message: "Semoga harimu dipenuhi hal-hal hangat." },
        { id: 4, message: "Kamu lebih berharga dari yang kamu bayangkan." },
        { id: 5, message: "Tetaplah tumbuh dengan caramu sendiri." },
        { id: 6, message: "Ada senyum yang selalu menunggu kehadiranmu." }
    ],

    // ------------------------------------------
    // Section 6: Hidden Message Puzzle (Teka-teki Pesan Rahasia)
    // ------------------------------------------
    puzzle: {
        words: [
            { id: "slot-1", targetText: "TERIMA KASIH", placeholder: "???" },
            { id: "slot-2", targetText: "SUDAH", placeholder: "???" },
            { id: "slot-3", targetText: "DATANG", placeholder: "???" }
        ],
        secretFlowers: [
            { id: "secret-1", wordIndex: 0, text: "TERIMA KASIH", hint: "Bunga rahasia pertama terungkap!" },
            { id: "secret-2", wordIndex: 1, text: "SUDAH", hint: "Bunga rahasia kedua terungkap!" },
            { id: "secret-3", wordIndex: 2, text: "DATANG", hint: "Bunga rahasia ketiga terungkap!" }
        ],
        completionMessage: "Pesan rahasia berhasil terungkap! ✨"
    },

    // ------------------------------------------
    // Section 7: Final Letter (Surat Penutup)
    // ------------------------------------------
    letter: {
        lines: [
            "Terima kasih telah meluangkan waktu untuk berjalan sejauh ini.",
            "Di antara bisingnya dunia, semoga ruang kecil ini membawa sedikit ketenangan.",
            "Seperti Lily of the Valley yang mekar dengan anggun di lembah...",
            "Semoga kebahagiaan dan kedamaian selalu menyertai setiap langkahmu."
        ],
        signature: "— Adnan"
    }
};

// Pastikan data bisa diakses secara global oleh script.js
if (typeof window !== 'undefined') {
    window.valleyData = valleyData;
}