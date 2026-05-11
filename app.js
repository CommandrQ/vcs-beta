// --- INITIALIZE SUPABASE ---
const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// --- THE HUB DATA ---
const directoryDataRaw = {
    "Vanguard Tech Lab": [
        { 
            title: "Tech Consulting", 
            desc: "Expert strategy and support sessions for seniors, parents, and high-performance individuals.", 
            url: "vsr/techhelp.html" 
        }
    ],
    "System": [
        { 
            title: "Support Terminal", 
            desc: "Connect directly with Vanguard support for technical help or general inquiries.", 
            url: "support.html" 
        },
        { 
            title: "Legal Documents", 
            desc: "Review our Citizen Agreements, Privacy Protocols, and Service Terms.", 
            url: "legal.html" 
        }
    ]
};

// --- RENDER LOGIC ---
function renderHub(category = Object.keys(directoryDataRaw)[0]) {
    const nav = document.getElementById('category-bar');
    const list = document.getElementById('directory-list');
    if (!nav || !list) return;

    // Render Navigation Tabs
    nav.innerHTML = Object.keys(directoryDataRaw).map(cat => `
        <button class="cat-btn ${cat === category ? 'active' : ''}" 
                onclick="renderHub('${cat}')">${cat}</button>
    `).join('');

    // Render Resource Cards
    const items = directoryDataRaw[category];
    list.innerHTML = items.map(item => `
        <div class="link-card">
            <h3 style="color: var(--gold); margin: 0 0 10px; font-size: 1.2rem; text-transform: uppercase;">${item.title}</h3>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 25px; line-height: 1.4;">${item.desc}</p>
            <a href="${item.url}" class="card-btn">Initialize Link</a>
        </div>
    `).join('');
}

// --- AUTH & GREETING ---
async function updateUI() {
    const greeting = document.getElementById('user-greeting');
    const toast = document.getElementById('login-toast');
    if (!greeting) return;

    const { data: { user } } = await supabaseClient.auth.getUser();
    const cached = JSON.parse(localStorage.getItem('vanguard_profile'));

    if (user) {
        const displayName = (cached && cached.name) ? cached.name : "Citizen";
        greeting.innerText = `Welcome, ${displayName}`;

        // Login Recognition
        if (sessionStorage.getItem('just_logged_in') === 'true') {
            if (toast) {
                toast.innerText = "Uplink Established: Signed In";
                toast.classList.add('active');
                setTimeout(() => toast.classList.remove('active'), 5000);
            }
            sessionStorage.removeItem('just_logged_in');
        }
    } else {
        greeting.innerText = "Welcome";
        localStorage.removeItem('vanguard_profile'); // Clean ghost data
    }
}

// --- SYSTEM BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Capture Login Flag
    if (window.location.hash.includes('access_token')) {
        sessionStorage.setItem('just_logged_in', 'true');
    }

    // 2. Set Current Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();

    // 3. Kick off UI
    updateUI();
    renderHub();
});
