const announcements = [
    "Website under maintennance."
];

const list = document.getElementById('announcement-list');
announcements.forEach(text => {
    const p = document.createElement('p');
    p.textContent = `• ${text}`;
    list.appendChild(p);
});
