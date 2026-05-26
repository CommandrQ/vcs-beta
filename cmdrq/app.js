/* --- Functional Parameters & Structural State Machine --- */
const AppState = {
    activeModal: null
};

/* --- Global Background Vector Injector Engine --- */
document.addEventListener("DOMContentLoaded", () => {
    generateGlassShards(8);
    setInterval(triggerRandomComet, 3000); 
});

function generateGlassShards(count) {
    const container = document.getElementById("glass-shards");
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const shard = document.createElement("div");
        shard.classList.add("glass-shard");
        
        const sizeW = Math.random() * 40 + 20;
        const sizeH = Math.random() * 60 + 30;
        shard.style.width = `${sizeW}px`;
        shard.style.height = `${sizeH}px`;
        shard.style.left = `${Math.random() * 100}vw`;
        
        shard.style.animationDelay = `${Math.random() * -25}s`;
        shard.style.animationDuration = `${Math.random() * 15 + 20}s`;
        
        container.appendChild(shard);
    }
}

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
    }, 1500);
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