const form = document.getElementById("downloadForm");
const videoUrl = document.getElementById("videoUrl");
const pasteBtn = document.getElementById("pasteBtn");
const result = document.getElementById("result");
const message = document.getElementById("message");
const openVideo = document.getElementById("openVideo");

// Memeriksa alamat video TikTok
function isTikTokUrl(value) {
    try {
        const url = new URL(value);

        const validHost =
            /(^|\.)tiktok\.com$/i.test(url.hostname);

        return (
            (url.protocol === "https:" ||
             url.protocol === "http:") &&
            validHost
        );
    } catch {
        return false;
    }
}

// Tombol tempel link
pasteBtn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();

        videoUrl.value = text.trim();
        result.hidden = true;
    } catch {
        message.textContent =
            "Clipboard tidak dapat diakses. Tempel link secara manual.";
        result.hidden = false;
        openVideo.hidden = true;
    }
});

// Memproses link
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const link = videoUrl.value.trim();

    result.hidden = false;
    openVideo.hidden = true;

    if (!isTikTokUrl(link)) {
        message.textContent =
            "Link tidak valid. Masukkan URL dari tiktok.com.";
        result.querySelector("h3").textContent =
            "Link tidak valid";
        return;
    }

    result.querySelector("h3").textContent =
        "Link berhasil diperiksa!";

    message.textContent =
        "Tautan TikTok valid. Tombol berikut membuka video asli. " +
        "Pengunduhan langsung memerlukan backend atau API downloader.";

    openVideo.href = link;
    openVideo.hidden = false;
});
