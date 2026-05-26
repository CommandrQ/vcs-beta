/* --- Functional Parameters & Structural State Machine --- */
const AppState = {
    activeModal: null
};

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
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(modalId);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && AppState.activeModal) {
        closeModal(AppState.activeModal);
    }
});