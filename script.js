/**
 * VANGUARD CITIZEN SERVICES — MAIN SOFTWARE ENGINE
 * Path: script.js
 */

// --- 1. ATMOSPHERIC BACKGROUND SYSTEM ---
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

// --- 2. CONFIGURATION DATA DICTIONARY ---
const REGISTRY_DATA = {
  "about us": {
    title: "Our Story",
    content: "<p>Vanguard started with two friends. We share a deep background in technology and military service. Moving out of those fields, we realized how much noise and distraction exists in modern culture today.</p><p style='margin-top: 12px;'>We decided to build this business with a clear purpose: to tackle and look closely at the real challenges facing our country, while showcasing the deeply personal human stories that make our communities strong. We work small to ensure our work stays focused, transparent, and meaningful.</p>"
  },
  "legal": {
    title: "Privacy Policy & Terms of Use",
    content: `
      <div class="legal-date-stamp" id="legal-date-mount"></div>
      <h4 class="legal-subheading">1. Privacy Commitment</h4>
      <p>We believe your personal details belong to you. We do not track your browsing habits, sell your information to outside data companies, or use hidden analytics software on this space. Any data shared with us stays completely protected and under our strict control.</p>
      <h4 class="legal-subheading" style='margin-top: 12px;'>2. Terms of Use</h4>
      <p>By interacting with Vanguard Citizen Services, you agree to engage honestly and transparently with our community tools. We do not tolerate any malicious use, automated scraping, or actions meant to interrupt our services to the public.</p>
      <h4 class="legal-subheading" style='margin-top: 12px;'>3. Security Protocols</h4>
      <p>We work to keep our systems secure using simple, clean software architecture. Because we keep our footprint small and skip modern tech bloat, your connection lines stay transparent, fast, and secure.</p>
    `
  },
  "support": {
    title: "Redirecting...",
    content: "<p>Moving directly to Vanguard Support Operations...</p>"
  }
};

// --- 3. LIFECYCLE COORDINATION ---
document.addEventListener('DOMContentLoaded', () => {
  const bg = new DeepAtmosphere('atmosphere-canvas');
  bg.run();

  const introStage = document.getElementById('intro-stage');
  const progressBar = document.getElementById('loading-progress');
  const mainContent = document.getElementById('main-content');
  const mask = document.getElementById('transition-mask');
  
  document.getElementById('current-year').textContent = new Date().getFullYear();

  const hasVisited = localStorage.getItem('vanguard_initialized');

  if (hasVisited) {
    if (introStage) introStage.remove();
    mainContent.style.opacity = '1';
    buildNavigationTabs();
    
    if (mask) {
      requestAnimationFrame(() => {
        mask.style.opacity = '0';
      });
    }
  } else {
    if (progressBar) {
      requestAnimationFrame(() => { progressBar.style.width = '100%'; });
    }
    setTimeout(() => {
      if (introStage && mainContent && mask) {
        mask.style.opacity = '1';
        setTimeout(() => {
          localStorage.setItem('vanguard_initialized', 'true');
          introStage.remove();
          mainContent.style.opacity = '1';
          mask.style.opacity = '0';
          buildNavigationTabs();
        }, 500);
      }
    }, 4000);
  }

  // --- 4. CORE REVEAL PROCESSES ---
  function buildNavigationTabs() {
    const mount = document.getElementById('tabs-mount');
    if (!mount) return;

    Object.keys(REGISTRY_DATA).forEach(key => {
      const button = document.createElement('button');
      button.className = 'action-tab-btn';
      button.id = `tab-btn-${key.replace(' ', '-')}`;
      button.textContent = key;
      button.addEventListener('click', () => activateRegistryItem(key));
      mount.appendChild(button);
    });
  }

  // --- 5. ISOLATED MODAL INTERFACE GENERATOR ---
  function activateRegistryItem(key) {
    if (key === "support") {
      window.location.href = "support/";
      return;
    }

    const data = REGISTRY_DATA[key];
    if (!data) return;

    document.querySelectorAll('.action-tab-btn').forEach(btn => btn.classList.remove('is-active'));
    const targetBtn = document.getElementById(`tab-btn-${key.replace(' ', '-')}`);
    if (targetBtn) targetBtn.classList.add('is-active');

    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'mobile-backdrop-blur';
    modalWrapper.style.opacity = '0';
    modalWrapper.style.transition = 'opacity 0.25s ease-out';

    modalWrapper.innerHTML = `
      <div class="vanguard-modal-window vanguard-panel">
        <button class="mobile-close-overlay-btn" id="modal-close-trigger" aria-label="Close panel">&times;</button>
        <h3>${data.title}</h3>
        <div class="narrative-body-scroll scrollable-interior">${data.content}</div>
      </div>
    `;

    document.body.appendChild(modalWrapper);

    if (key === "legal") {
      const dateMount = modalWrapper.querySelector('#legal-date-mount');
      if (dateMount) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateMount.textContent = `UPDATED: ${today.toLocaleDateString('en-US', options).toUpperCase()}`;
      }
    }

    requestAnimationFrame(() => {
      modalWrapper.style.opacity = '1';
    });

    const closeOverlay = () => {
      modalWrapper.style.opacity = '0';
      if (targetBtn) targetBtn.classList.remove('is-active');
      setTimeout(() => {
        modalWrapper.remove();
      }, 250);
    };

    modalWrapper.addEventListener('click', (e) => {
      if (e.target === modalWrapper) closeOverlay();
    });
    
    const closeTrigger = modalWrapper.querySelector('#modal-close-trigger');
    if (closeTrigger) {
      closeTrigger.addEventListener('click', closeOverlay);
    }
  }
});