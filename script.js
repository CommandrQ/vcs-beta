/**
 * VANGUARD CITIZEN SERVICES — CORE SYSTEM AUTOMATION
 * Path: script.js
 */

// --- 1. DEEP SPACE BACKDROP BACKGROUND ENGINE ---
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

// --- 2. REGISTRY DICTIONARY Configuration (Easy to expand tabs here) ---
const REGISTRY_DATA = {
  "about us": {
    title: "About Our Guild",
    content: "<p>We bypass modern distractions to construct transparent tools and honest infrastructure for real-world communities. Vanguard operates as a small team with a large reach, ensuring clarity remains at the center of everything we build.</p>"
  },
  "legal": {
    title: "Legal Framework",
    content: "<p>All operations under the Vanguard umbrella are designed with absolute clarity in mind. We prioritize community transparency, data sovereignty, and open protocols over hidden terms.</p>"
  },
  "support": {
    title: "Support Operations",
    content: "<p>Need connection with our crew? Open a communication relay. Our support windows run light to ensure questions are answered directly by an internal builder without automated circular routing panels.</p>"
  }
};

// --- 3. RUNTIME COORDINATION ---
document.addEventListener('DOMContentLoaded', () => {
  const bg = new DeepAtmosphere('atmosphere-canvas');
  bg.run();

  const introStage = document.getElementById('intro-stage');
  const progressBar = document.getElementById('loading-progress');
  const mainContent = document.getElementById('main-content');
  const mask = document.getElementById('transition-mask');
  
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Acknowledge the user's return history entry point
  const hasVisited = localStorage.getItem('vanguard_initialized');

  if (hasVisited) {
    // Returnee: Instantly clean up splash DOM nodes to lock in fast paths
    if (introStage) introStage.remove();
    mainContent.style.opacity = '1';
    initializeCoreFeatures();
  } else {
    // Direct New Arrival Sequence: Run the 4000ms loop sequence
    if (progressBar) {
      requestAnimationFrame(() => { progressBar.style.width = '100%'; });
    }

    setTimeout(() => {
      if (introStage && mainContent && mask) {
        // Step A: Fade completely to black
        mask.style.opacity = '1';

        setTimeout(() => {
          // Step B: Set token state, swap stage frames silently in the dark
          localStorage.setItem('vanguard_initialized', 'true');
          introStage.remove();
          mainContent.style.opacity = '1';

          // Step C: Fade back up cleanly to present the workspace
          mask.style.opacity = '0';
          initializeCoreFeatures();
        }, 500); // Cross-fade synchronization timing window
      }
    }, 4000);
  }

  // --- 4. CORE ENGINE INITIALIZATION FEATURES ---
  function initializeCoreFeatures() {
    fetchAnnouncements();
    buildNavigationTabs();
    setupModalHandlers();
  }

  // Fetch and display messages from the json endpoint
  function fetchAnnouncements() {
    const mount = document.getElementById('announcements-mount');
    
    fetch('announcements.json')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        mount.innerHTML = '';
        data.announcements.forEach(item => {
          const block = document.createElement('div');
          block.className = 'announcement-node';
          block.innerHTML = `
            <div class="announcement-meta">${item.date} // ${item.tag}</div>
            <div class="announcement-txt">${item.message}</div>
          `;
          mount.appendChild(block);
        });
      })
      .catch(() => {
        // Safe programmatic fallback notice if remote data pipeline breaks locally
        mount.innerHTML = '<p class="system-message">Secure local transmissions encrypted. Registry reading online.</p>';
      });
  }

  // Generate actionable items from our layout map dictionary
  function buildNavigationTabs() {
    const mount = document.getElementById('tabs-mount');
    if (!mount) return;

    Object.keys(REGISTRY_DATA).forEach(key => {
      const button = document.createElement('button');
      button.className = 'action-tab-btn';
      button.textContent = key;
      button.addEventListener('click', () => openModalPane(key));
      mount.appendChild(button);
    });
  }

  // Interfacing mechanics managing the glassy overlay structures
  const modal = document.getElementById('modal-overlay');
  const mTitle = document.getElementById('modal-title');
  const mBody = document.getElementById('modal-body');

  function openModalPane(key) {
    const records = REGISTRY_DATA[key];
    if (!records || !modal) return;

    mTitle.textContent = records.title;
    mBody.innerHTML = records.content;
    modal.classList.add('is-visible');
  }

  function setupModalHandlers() {
    const closeBtn = document.getElementById('modal-close-trigger');
    
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('is-visible'));
      // Close overlay window if someone taps out into space shadows
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-visible');
      });
    }
  }
});
