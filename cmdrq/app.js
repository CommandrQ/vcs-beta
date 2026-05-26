/* --- Functional Parameters & Structural State Machine --- */
const AppState = {
    audio: 'off',
    activeModal: null
};

/* --- Global Setting Toggle Switches --- */
function toggleSetting(settingKey) {
    if (settingKey === 'audio') {
        const btn = document.getElementById('audio-toggle');
        if (AppState.audio === 'off') {
            AppState.audio = 'on';
            btn.innerText = 'ON';
            btn.style.boxShadow = '0 0 12px var(--blue-muted)';
            btn.style.color = 'var(--blue-muted)';
            btn.style.borderColor = 'var(--blue-muted)';
        } else {
            AppState.audio = 'off';
            btn.innerText = 'OFF';
            btn.style.boxShadow = '0 0 4px var(--pink-glow)';
            btn.style.color = 'var(--pink-neon)';
            btn.style.borderColor = 'var(--pink-neon)';
        }
    }
}

/* --- Popup Overlay & Drawer Interactivity Architecture --- */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        AppState.activeModal = modalId;
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        if (AppState.activeModal === modalId) {
            AppState.activeModal = null;
        }
    }
}

/* --- Global Intercept for Escape Closes --- */
function closeModalOutside(event, modalId) {
    // Intercept backdrop triggers safely away from modal target window frame
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(modalId);
    }
}

// Global Keyboard Intercept Engine
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && AppState.activeModal) {
        closeModal(AppState.activeModal);
    }
});