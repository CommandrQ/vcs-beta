/**
 * VANGUARD CITIZEN SERVICES — BROADCAST LOG ENGINE
 * Path: announcements.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('announcements-mount');
  if (!mount) return;

  // Single announcement using clear, everyday language
  const operationalBroadcasts = [
    {
      date: "MAY 23, 2026",
      tag: "SITE UPDATE",
      message: "We are currently making improvements to our website."
    }
  ];

  mount.innerHTML = '';
  operationalBroadcasts.forEach(item => {
    const node = document.createElement('div');
    node.className = 'announcement-node';
    node.innerHTML = `
      <div class="announcement-meta">${item.date} // ${item.tag}</div>
      <div class="announcement-txt">${item.message}</div>
    `;
    mount.appendChild(node);
  });
});