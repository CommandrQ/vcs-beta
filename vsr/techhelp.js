document.addEventListener("DOMContentLoaded", () => {
    const tiersContainer = document.getElementById("tiers-container");
    const modal = document.getElementById("request-modal");
    const step1 = document.getElementById("modal-step-1");
    const step2 = document.getElementById("modal-step-2");
    let selectedPackage = "";

    // 1. Fetching the data
    fetch('tiers.json')
        .then(res => res.json())
        .then(data => {
            tiersContainer.innerHTML = data.map(tier => `
                <div class="service-card">
                    <h3>${tier.title}</h3>
                    <p>${tier.price}</p>
                    <button class="btn-request-help" data-title="${tier.title}" data-desc="${tier.description}">
                        Request Help
                    </button>
                </div>
            `).join('');
        })
        .catch(err => console.error("Cards failed to load. Check tiers.json location.", err));

    // 2. Click Handling (Delegation)
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-request-help")) {
            selectedPackage = e.target.getAttribute("data-title");
            document.getElementById("modal-package-title").innerText = selectedPackage;
            document.getElementById("modal-package-description").innerText = e.target.getAttribute("data-desc");
            
            step1.style.display = "block";
            step2.style.display = "none";
            modal.classList.add("active");
        }

        if (e.target.id === "btn-continue-to-form") {
            step1.style.display = "none";
            step2.style.display = "block";
        }

        if (e.target.id === "btn-go-back" || e.target.id === "close-btn" || e.target === modal) {
            modal.classList.remove("active");
        }
    });
});
