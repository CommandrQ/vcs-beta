/* --- Functional Parameters & Structural State Machine --- */
const AppState = {
    activeModal: null
};

/* --- Global Background Vector Injector Engine --- */
document.addEventListener("DOMContentLoaded", () => {
    setInterval(triggerRandomComet, 3000); 
});

function triggerRandomComet() {
    const container = document.getElementById("comet-layer");
    if (!container) return;

    const comet = document.createElement("div");
    comet.classList.add("comet");
    
    comet.style.top = `${Math.random() * 40 - 10}%`;
    comet.style.left = `${Math.random() * 50 + 50}%`;
    
    container.appendChild(comet);
    
    setTimeout(() => {
        comet.remove();
    }, 1200);
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
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(modalId);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && AppState.activeModal) {
        closeModal(AppState.activeModal);
    }
});
