/* THE VANGUARD LOGIC */

const nodes = document.querySelectorAll('.node');
const gateway = document.querySelector('.gateway');
const table = document.querySelector('.round-table');

// 1. SPATIAL INTERACTION (The 3D Tilt)
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // Tilt intensity
    const y = (e.clientY / window.innerHeight - 0.5) * -30;

    nodes.forEach(node => {
        // Only tilt if not being grabbed
        if (!node.classList.contains('grabbing')) {
            node.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        }
    });
});

// 2. SNAPPY TRANSITION (Gateway to Round Table)
nodes.forEach(node => {
    node.addEventListener('click', () => {
        // Instant visual feedback
        node.style.transform = 'scale(0.9) opacity(0)';
        
        // Snap the transition
        setTimeout(() => {
            gateway.style.display = 'none';
            table.style.display = 'block';
            table.style.animation = 'snapIn 0.3s cubic-bezier(0.2, 0, 0, 1) forwards';
        }, 200);
    });
});

// 3. GRABBING PHYSICS (Preparing for Spatial/VR)
nodes.forEach(node => {
    node.addEventListener('mousedown', () => {
        node.classList.add('grabbing');
    });

    document.addEventListener('mouseup', () => {
        node.classList.remove('grabbing');
    });
});

/* ADDING DYNAMIC SNAP ANIMATION */
const style = document.createElement('style');
style.innerHTML = `
    @keyframes snapIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(1.1); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);
