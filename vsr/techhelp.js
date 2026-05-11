// --- SERVICE PACKAGE DATA ---
const serviceTiers = [
    {
        id: "senior",
        title: "The Golden Year Upgrade",
        desc: "Best for seniors. We focus on patience, simplicity, and making technology work for you, not against you.",
        price: "$75 / session",
        features: ["Large-text optimization", "Scam prevention setup", "Simple video call training", "Hardware setup & cleanup"]
    },
    {
        id: "parent",
        title: "The Digital Household",
        desc: "Best for parents. Focus on family safety, screen-time management, and educational tech strategy.",
        price: "$100 / session",
        features: ["Parental control setup", "Educational tool audits", "Home network safety", "Device boundaries strategy"]
    },
    {
        id: "other",
        title: "The Strategic Uplink",
        desc: "Best for business owners and students. Advanced optimization and high-performance strategy.",
        price: "$125 / session",
        features: ["High-speed network tuning", "Remote work optimization", "Custom hardware builds", "Project strategy sessions"]
    }
];

// --- RENDER ENGINE ---
function renderTiers() {
    const container = document.getElementById('tiers-container');
    container.innerHTML = serviceTiers.map(tier => `
        <div class="link-card" style="margin-top: 20px;">
            <h3 class="card-title">${tier.title}</h3>
            <p class="card-desc">${tier.desc}</p>
            <div class="price-tag">${tier.price}</div>
            <ul class="service-features">
                ${tier.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <button onclick="openModal('${tier.title}')" class="gate-button">Request This Path</button>
        </div>
    `).join('');
}

// --- MODAL CONTROLS ---
function openModal(title) {
    document.getElementById('modal-tier-title').innerText = title;
    document.getElementById('request-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('request-modal').style.display = 'none';
}

// --- SUBMIT REQUEST (Mailto) ---
function submitRequest() {
    const tier = document.getElementById('modal-tier-title').innerText;
    const name = document.getElementById('f-name').value;
    const email = document.getElementById('f-email').value;
    const phone = document.getElementById('f-phone').value;
    const issue = document.getElementById('f-issue').value;

    if(!name || !email || !issue) return alert("Please identify yourself and your goals.");

    const subject = `[Consulting Request] ${tier} - ${name}`;
    const body = `NAME: ${name}\nEMAIL: ${email}\nPHONE: ${phone}\nPACKAGE: ${tier}\n\nGOALS:\n${issue}`;

    window.location.href = `mailto:support@vcscitizen.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal();
}

document.addEventListener('DOMContentLoaded', renderTiers);
