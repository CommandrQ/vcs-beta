const canvas = document.getElementById('space-layer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    size: Math.random() * 1.5, opacity: Math.random()
}));

let comets = [];

function draw() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Stars
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
    });

    // Draw Comets
    comets.forEach((c, i) => {
        c.x += 5; c.y += 2;
        ctx.strokeStyle = '#f5c518';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(c.x - 40, c.y - 20); ctx.stroke();
        if (c.x > canvas.width) comets.splice(i, 1);
    });

    requestAnimationFrame(draw);
}

// Comet Trigger: Every 4 seconds
setInterval(() => comets.push({ x: 0, y: Math.random() * canvas.height / 2 }), 4000);

// Transition Logic
setTimeout(() => {
    document.getElementById('bar').style.width = '100%';
    setTimeout(() => {
        document.getElementById('ui').style.opacity = '0';
        setTimeout(() => window.location.href = 'home/index.html', 1000);
    }, 2000);
}, 500);

draw();
