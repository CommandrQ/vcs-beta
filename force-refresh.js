// force-refresh.js

// Method 1: Check if the page was loaded from the back/forward cache (bfcache)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // If the page is loaded from cache (like hitting the back button), force a reload
        window.location.reload();
    }
});

// Method 2: Modern fallback using the Performance API 
if (window.performance && window.performance.getEntriesByType) {
    const navEntries = window.performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'back_forward') {
        window.location.reload();
    }
}
