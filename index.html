/**
 * VANGUARD CITIZEN SERVICES — MAIN CORE ENGINE
 * Path: script.js
 */

class DeepAtmosphere {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.comet = { x: 0, y: 0, active: false, timer: 0 };
    
    this.init();
    window.addEventListener('resize', () => this.init());
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateStars();
  }

  generateStars() {
    this.stars = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  }

  updateComet(deltaTime) {
    this.comet.timer += deltaTime;
    if (this.comet.timer >= 4000) {
      this.comet.timer = 0;
      this.comet.active = true;
      this.comet.x = Math.random() * (this.canvas.width * 0.5);
      this.comet.y = -50;
    }

    if (this.comet.active) {
      this.comet.x += 8;
      this.comet.y += 6;
      if (this.comet.y > this.canvas.height || this.comet.x > this.canvas.width) {
        this.comet.active = false;
      }
    }
  }

  draw() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.stars.forEach(star => {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    if (this.comet.active) {
      let gradient = this.ctx.createLinearGradient(this.comet.x, this.comet.y, this.comet.x - 60, this.comet.y - 45);
      gradient.addColorStop(0, 'rgba(253, 245, 230, 1)');
      gradient.addColorStop(0.2, 'rgba(179, 157, 219, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(this.comet.x, this.comet.y);
      this.ctx.lineTo(this.comet.x - 60, this.comet.y - 45);
      this.ctx.stroke();
    }
  }

  run() {
    let lastTime = 0;
    const loop = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      this.updateComet(deltaTime);
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Sequencing Transitions and UI Drivers
document.addEventListener('DOMContentLoaded', () => {
  // Start Starfield System
  const bg = new DeepAtmosphere('atmosphere-canvas');
  bg.run();

  const introStage = document.getElementById('intro-stage');
  const progressBar = document.getElementById('loading-progress');
  const mainContent = document.getElementById('main-content');
  const yearContainer = document.getElementById('current-year');

  // Inject exact rolling current calendar year
  if (yearContainer) {
    yearContainer.textContent = new Date().getFullYear();
  }

  // Trigger 4-Second Loading Bar
  if (progressBar) {
    requestAnimationFrame(() => {
      progressBar.style.width = '100%';
    });
  }

  // Handle Complete Transition Handshake at 4000ms
  setTimeout(() => {
    if (introStage && mainContent) {
      introStage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      introStage.style.opacity = '0';
      introStage.style.transform = 'scale(0.95)';
      
      mainContent.style.opacity = '1';

      setTimeout(() => {
        introStage.remove();
      }, 600);
    }
  }, 4000);
});
