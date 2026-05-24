const canvas = document.createElement('canvas');
canvas.id = 'starfield';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5,
    opacity: Math.random()
}));

let comets = [];

function draw() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
    });

    comets.forEach((c, i) => {
        c.x += 4; c.y += 2;
        ctx.strokeStyle = '#f5c518';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(c.x - 30, c.y - 15); ctx.stroke();
        if (c.x > canvas.width) comets.splice(i, 1);
    });

    requestAnimationFrame(draw);
}

// Comet trigger every 4 seconds
setInterval(() => comets.push({ x: 0, y: Math.random() * canvas.height }), 4000);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
draw();
