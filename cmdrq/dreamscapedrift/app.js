/**
 * DREAMSCAPE DRIFT — ENGINE CONTROLLER
 * Path: cmdrq/dreamscapedrift/app.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize system features
    initializeVideoGallery();
    initializeAudioStreams();
    initializeDynamicFooter();
});

/**
 * 1. VIDEO SELECTION GALLERY ENGINE
 * Handles switching the main video showcase from thumbnail clicks
 */
function initializeVideoGallery() {
    const mainDisplayVideo = document.getElementById('main-drift-video');
    const thumbButtons = document.querySelectorAll('.video-thumb');

    if (!mainDisplayVideo || thumbButtons.length === 0) return;

    thumbButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Strip active state from all items and add to clicked item
            thumbButtons.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Safely swap the main player video path
            const targetVideoSrc = this.getAttribute('data-video-src');
            if (targetVideoSrc) {
                mainDisplayVideo.src = targetVideoSrc;
                mainDisplayVideo.play().catch(err => {
                    console.log('Autoplay blocked by browser. Awaiting user interaction.');
                });
            }
        });
    });
}

/**
 * 2. LIVE MIX AUDIO DECK CONTROLLER
 * Simple play/pause interface tracking for audio sets
 */
function initializeAudioStreams() {
    const audioTrack = document.getElementById('dreamscape-audio-set');
    const togglePlaybackBtn = document.getElementById('play-mix-btn');

    if (!audioTrack || !togglePlaybackBtn) return;

    togglePlaybackBtn.addEventListener('click', () => {
        if (audioTrack.paused) {
            audioTrack.play()
                .then(() => {
                    togglePlaybackBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Mix Set';
                    togglePlaybackBtn.classList.add('playing');
                })
                .catch(err => console.error("Audio playback interrupted:", err));
        } else {
            audioTrack.pause();
            togglePlaybackBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Mix Set';
            togglePlaybackBtn.classList.remove('playing');
        }
    });

    // Reset button design naturally when music track completes its run
    audioTrack.addEventListener('ended', () => {
        togglePlaybackBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Mix Set';
        togglePlaybackBtn.classList.remove('playing');
    });
}

/**
 * 3. SYNCED PLATFORM YEAR FOOTER ENGINE
 */
function initializeDynamicFooter() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
}
