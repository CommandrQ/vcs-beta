const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const surveyForm = document.getElementById('index-survey-form');
const identityModal = document.getElementById('identity-modal');
const modalGateForm = document.getElementById('modal-gate-form');
const modalAbortBtn = document.getElementById('modal-abort-btn');
const modalCloseX = document.getElementById('modal-close-x');
const engineChassis = document.getElementById('engine-chassis');
const successScreen = document.getElementById('success-screen');

document.querySelectorAll('.na-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const categoryName = e.target.getAttribute('data-target');
        const targetScaleRow = document.getElementById(`scale-${categoryName}`);
        const inputsInRow = targetScaleRow.querySelectorAll('input[type="radio"]');

        if (e.target.checked) {
            targetScaleRow.classList.add('disabled-scale');
            inputsInRow.forEach(radio => {
                radio.checked = false;
                radio.required = false; 
            });
        } else {
            targetScaleRow.classList.remove('disabled-scale');
            inputsInRow.forEach(radio => {
                radio.required = true;
            });
        }
    });
});

function toggleModal(open) {
    if (open) {
        identityModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        identityModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

surveyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModal(true);
});

modalAbortBtn.addEventListener('click', () => toggleModal(false));
modalCloseX.addEventListener('click', () => toggleModal(false));

modalGateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const zipCodeValue = document.getElementById('user-zip').value.trim();
    
    const cat1Na = document.getElementById('na-cat1').checked;
    const cat2Na = document.getElementById('na-cat2').checked;
    const cat3Na = document.getElementById('na-cat3').checked;
    const cat4Na = document.getElementById('na-cat4').checked;

    const cat1Score = cat1Na ? null : parseInt(document.querySelector('input[name="cat1"]:checked')?.value || null);
    const cat2Score = cat2Na ? null : parseInt(document.querySelector('input[name="cat2"]:checked')?.value || null);
    const cat3Score = cat3Na ? null : parseInt(document.querySelector('input[name="cat3"]:checked')?.value || null);
    const cat4Score = cat4Na ? null : parseInt(document.querySelector('input[name="cat4"]:checked')?.value || null);

    const firstNameValue = document.getElementById('auth-first-name').value.trim();
    const emailValue = document.getElementById('auth-email').value.trim();

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: emailValue,
            password: Math.random().toString(36).slice(-12), 
            options: {
                data: {
                    first_name: firstNameValue
                }
            }
        });

        if (authError) throw authError;

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

        toggleModal(false);
        surveyForm.reset();
        modalGateForm.reset();
        
        window.location.href = "results.html";

    } catch (err) {
        console.error(err.message || err);
        alert(`Transmission Error: ${err.message || 'Offline'}`);
    }
});
