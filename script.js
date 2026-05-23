/**
 * VANGUARD CITIZEN SERVICES — SOFTWARE ENGINE
 * Path: script.js
 */

// --- 1. THE MENUS AND LINKS CONFIGURATION (JSON STRUCT) ---
// Easily add more items here! 
// Use type: "popup" for text windows, or type: "link" for folders and external sites.
const MENU_LINKS_JSON = [
  {
    "label": "About Us",
    "type": "popup",
    "title": "Our Story",
    "content": "<p>Vanguard started with two friends. We share a deep background in technology and military service. Moving out of those fields, we realized how much noise and distraction exists in modern culture today.</p><p style='margin-top: 12px;'>We decided to build this business with a clear purpose: to tackle and look closely at the real challenges facing our country, while showcasing the deeply personal human stories that make our communities strong. We work small to ensure our work stays focused, transparent, and meaningful.</p>"
  },
  {
    "label": "Roster",
    "type": "link",
    "url": "roster/"
  },
  {
    "label": "Legal",
    "type": "popup",
    "title": "Privacy Policy & Terms of Use",
    "content": "<div class='legal-date-stamp' id='legal-date-mount'></div><h4 class='legal-subheading'>1. Privacy Commitment</h4><p>We believe your personal details belong to you. We do not track your browsing habits, sell your information to outside data companies, or use hidden analytics software on this space.</p><h4 class='legal-subheading' style='margin-top: 12px;'>2. Terms of Use</h4><p>By interacting with Vanguard Citizen Services, you agree to engage honestly and transparently with our community tools.</p>"
  },
  {
    "label": "Support",
    "type": "link",
    "url": "support/"
  }
];

// --- 2. ATMOSPHERIC BACKGROUND SYSTEM ---
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

// --- 3. LIFECYCLE & RENDER COORDINATION ---
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
    buildMenuTrack();
    if (mask) requestAnimationFrame(() => { mask.style.opacity = '0'; });
  } else {
    if (progressBar) requestAnimationFrame(() => { progressBar.style.width = '100%'; });
    setTimeout(() => {
      if (introStage && mainContent && mask) {
        mask.style.opacity = '1';
        setTimeout(() => {
          localStorage.setItem('vanguard_initialized', 'true');
          introStage.remove();
          mainContent.style.opacity = '1';
          mask.style.opacity = '0';
          buildMenuTrack();
        }, 500);
      }
    }, 4000);
  }

  // --- 4. DYNAMIC MENU GENERATOR ---
  function buildMenuTrack() {
    const mount = document.getElementById('tabs-mount');
    if (!mount) return;

    mount.innerHTML = ''; // Clear out any existing elements

    MENU_LINKS_JSON.forEach((item, index) => {
      const button = document.createElement('button');
      button.className = 'action-tab-btn';
      button.textContent = item.label;

      button.addEventListener('click', () => {
        if (item.type === 'link') {
          window.location.href = item.url;
        } else if (item.type === 'popup') {
          openModalWindow(item, button);
        }
      });

      mount.appendChild(button);
    });
  }

  // --- 5. MODAL INTERFACE RENDERER ---
  function openModalWindow(item, targetBtn) {
    document.querySelectorAll('.action-tab-btn').forEach(btn => btn.classList.remove('is-active'));
    if (targetBtn) targetBtn.classList.add('is-active');

    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'mobile-backdrop-blur';
    modalWrapper.style.opacity = '0';
    modalWrapper.style.transition = 'opacity 0.25s ease-out';

    modalWrapper.innerHTML = `
      <div class="vanguard-modal-window vanguard-panel">
        <button class="mobile-close-overlay-btn" id="modal-close-trigger" aria-label="Close panel">&times;</button>
        <h3>${item.title}</h3>
        <div class="narrative-body-scroll scrollable-interior">${item.content}</div>
      </div>
    `;

    document.body.appendChild(modalWrapper);

    // Apply legal update stamp if it matches the Legal menu option
    if (item.label.toLowerCase() === 'legal') {
      const dateMount = modalWrapper.querySelector('#legal-date-mount');
      if (dateMount) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateMount.textContent = `UPDATED: ${today.toLocaleDateString('en-US', options).toUpperCase()}`;
      }
    }

    requestAnimationFrame(() => { modalWrapper.style.opacity = '1'; });

    const closeOverlay = () => {
      modalWrapper.style.opacity = '0';
      if (targetBtn) targetBtn.classList.remove('is-active');
      setTimeout(() => { modalWrapper.remove(); }, 250);
    };

    modalWrapper.addEventListener('click', (e) => {
      if (e.target === modalWrapper) closeOverlay();
    });
    
    const closeTrigger = modalWrapper.querySelector('#modal-close-trigger');
    if (closeTrigger) closeTrigger.addEventListener('click', closeOverlay);
  }
});