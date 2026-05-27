/* ==========================================================================
   SUPABASE SERVICE NODE INITIALIZATION CONFIGURATION
   ========================================================================== */
const SUPABASE_URL = "https://your-project-url.supabase.co"; 
const SUPABASE_ANON_KEY = "your-anon-key-string";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ==========================================================================
   DOM TARGET INTERCEPTORS
   ========================================================================== */
const surveyForm = document.getElementById('index-survey-form');
const identityModal = document.getElementById('identity-modal');
const modalGateForm = document.getElementById('modal-gate-form');
const modalAbortBtn = document.getElementById('modal-abort-btn');
const engineChassis = document.getElementById('engine-chassis');
const successScreen = document.getElementById('success-screen');

/* ==========================================================================
   DYNAMIC N/A TOGGLE INTERACTION LOGIC
   ========================================================================== */
document.querySelectorAll('.na-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const categoryName = e.target.getAttribute('data-target');
        const targetScaleRow = document.getElementById(`scale-${categoryName}`);
        const inputsInRow = targetScaleRow.querySelectorAll('input[type="radio"]');

        if (e.target.checked) {
            // Visual state shifts to greyed out layout profiles
            targetScaleRow.classList.add('disabled-scale');
            inputsInRow.forEach(radio => {
                radio.checked = false;
                radio.required = false; // Disables field validation rules cleanly
            });
        } else {
            // Re-enforces active tracking configurations
            targetScaleRow.classList.remove('disabled-scale');
            inputsInRow.forEach(radio => {
                radio.required = true;
            });
        }
    });
});

/* ==========================================================================
   SURVEY SUBMISSION AND GATE INTERCEPTION
   ========================================================================== */
surveyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Intercept operational flow and reveal access gate layout modal popups
    identityModal.classList.add('active');
});

modalAbortBtn.addEventListener('click', () => {
    identityModal.classList.remove('active');
});

/* ==========================================================================
   THE DATA SPLIT EXECUTION ENGINE
   ========================================================================== */
modalGateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect Step 1 and 2 payload profiles directly from view
    const zipCodeValue = document.getElementById('user-zip').value.trim();
    
    const cat1Na = document.getElementById('na-cat1').checked;
    const cat2Na = document.getElementById('na-cat2').checked;
    const cat3Na = document.getElementById('na-cat3').checked;
    const cat4Na = document.getElementById('na-cat4').checked;

    const cat1Score = cat1Na ? null : parseInt(document.querySelector('input[name="cat1"]:checked')?.value || null);
    const cat2Score = cat2Na ? null : parseInt(document.querySelector('input[name="cat2"]:checked')?.value || null);
    const cat3Score = cat3Na ? null : parseInt(document.querySelector('input[name="cat3"]:checked')?.value || null);
    const cat4Score = cat4Na ? null : parseInt(document.querySelector('input[name="cat4"]:checked')?.value || null);

    // Collect Step 3 target parameters from overlay container fields
    const firstNameValue = document.getElementById('auth-first-name').value.trim();
    const emailValue = document.getElementById('auth-email').value.trim();

    try {
        // PIPELINE DELAY PARTITION A: Secure Authentication Generation Signups
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: emailValue,
            password: Math.random().toString(36).slice(-12), // Generates standard secure dummy token key hashes automatically
            options: {
                data: {
                    first_name: firstNameValue
                }
            }
        });

        if (authError) throw authError;

        // PIPELINE DELAY PARTITION B: Total Anonymity Anonymous Database Mutations Injection
        const { error: dbError } = await supabase
            .from('school_scores')
            .insert([
                {
                    zip_code: zipCodeValue,
                    category_1: cat1Score,
                    category_2: cat2Score,
                    category_3: cat3Score,
                    category_4: cat4Score
                }
            ]);

        if (dbError) throw dbError;

        // TERMINAL OPERATIONS SUCCESS TRANSITIONS
        identityModal.classList.remove('active');
        surveyForm.reset();
        modalGateForm.reset();
        
        // Restore radio requirement baselines safely across loop components
        document.querySelectorAll('.slider-row').forEach(row => row.classList.remove('disabled-scale'));

        engineChassis.style.display = 'none';
        successScreen.style.display = 'block';

    } catch (err) {
        console.error("System Matrix Transmission Fault:", err.message || err);
        alert(`Transmission Error: ${err.message || 'Verification connection array baseline offline.'}`);
    }
});