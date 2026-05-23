/**
 * TIMED NARRATIVE TRANSITION & DYNAMIC FOOTER
 * Appended to: atmosphere.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const introStage = document.getElementById('intro-stage');
  const progressBar = document.getElementById('loading-progress');
  const mainContent = document.getElementById('main-content');
  const yearContainer = document.getElementById('current-year');

  // 1. Establish the current accurate copyright date anchor
  if (yearContainer) {
    yearContainer.textContent = new Date().getFullYear();
  }

  // 2. Trigger the loading bar transition immediately after the TV frame pops on
  if (progressBar) {
    requestAnimationFrame(() => {
      progressBar.style.width = '100%';
    });
  }

  // 3. Precise 4-second chronological exit transition
  setTimeout(() => {
    if (introStage && mainContent) {
      // Soft-fade the intro window out
      introStage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      introStage.style.opacity = '0';
      introStage.style.transform = 'scale(0.95)';
      
      // Reveal the home space concurrently
      mainContent.style.opacity = '1';

      // Discard the overlay element entirely after transition to clear RAM and layout tree
      setTimeout(() => {
        introStage.remove();
      }, 600);
    }
  }, 4000);
});
