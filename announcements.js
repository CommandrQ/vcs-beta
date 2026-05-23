/**
 * VANGUARD CITIZEN SERVICES — BROADCAST LOG ENGINE
 * Path: announcements.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('announcements-mount');
  if (!mount) return;

  const operationalBroadcasts = [
    {
      date: "MAY 23, 2026",
      tag: "MAINTENANCE INFRASTRUCTURE",
      message: "The platform workspace is currently undergoing active technical maintenance. System parameters are being reconfigured to lock down fluid dark layouts."
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