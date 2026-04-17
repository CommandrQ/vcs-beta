/* ==========================================================================
   THE VANGUARD ENGINE (Logic & Choreography)
   ========================================================================== */

// --- DOM ELEMENTS (Connecting the logic to the HTML structure) ---
const btnKnock = document.getElementById('btn-knock');
const dialogueBox = document.getElementById('dialogue-box');
const questionText = document.getElementById('question-text');

const flashOverlay = document.getElementById('flash-overlay');
const theGates = document.getElementById('the-gates');
const theCitadel = document.getElementById('the-citadel');

// --- THE INITIATION SCRIPT ---
const questions = [
    "When was the last time you were Educated?",
    "When was the last time you were Empowered?",
    "When was the last time you were Elevated?"
];

// --- PACING CONFIGURATION ---
const typingSpeed = 50; // Speed of the typewriter effect (milliseconds per letter)
const pauseBetweenQuestions = 2500; // How long the question stays on screen before the next one

/* ==========================================================================
   ACT I: THE SEQUENCE
   ========================================================================== */

// 1. The user interacts with the gate
btnKnock.addEventListener('click', () => {
    // Hide the 'Knock' button
    btnKnock.classList.add('hidden');
    // Reveal the empty FF7-style dialogue box
    dialogueBox.classList.remove('hidden');
    
    // Begin asking the three questions, starting at index 0
    runDialogueSequence(0);
});

// 2. The Dialogue Manager
function runDialogueSequence(index) {
    // Check if we have asked all three questions
    if (index >= questions.length) {
        triggerCitadelTransition();
        return;
    }

    // Clear the box for the new question
    questionText.innerHTML = "";
    
    // Execute the typewriter effect for the current question
    typeWriterEffect(questions[index], questionText, () => {
        // Once the typing is fully complete, wait a few seconds, then loop to the next question
        setTimeout(() => {
            runDialogueSequence(index + 1);
        }, pauseBetweenQuestions);
    });
}

// 3. The Typewriter Effect (Forces the user to read at the Vanguard's pace)
function typeWriterEffect(text, element, callback) {
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            // Add the next character
            element.innerHTML += text.charAt(charIndex);
            charIndex++;
            // Loop the function after a short delay
            setTimeout(type, typingSpeed);
        } else {
            // Typing is finished, trigger the callback (the pause)
            if (callback) callback();
        }
    }

    // Start the typing loop
    type();
}

/* ==========================================================================
   ACT II: THE CITADEL TRANSITION
   ========================================================================== */

// 4. The Cinematic Screen Wipe
function triggerCitadelTransition() {
    // Ignite the pure white CSS flash overlay (opacity transitions to 1)
    flashOverlay.classList.add('flash-active');

    // Wait exactly 1.5 seconds for the screen to go completely blind (matches CSS transition)
    setTimeout(() => {
        // While the screen is white, swap the rooms
        theGates.classList.add('hidden');
        theCitadel.classList.remove('hidden');
        
        // Fade the flash away to reveal the RPG HUD
        flashOverlay.classList.remove('flash-active');
        
        // Check if this citizen needs their initiation guidance
        checkFirstTimeUser();
    }, 1500); 
}

// 5. The Memory Check (Local Storage)
function checkFirstTimeUser() {
    // Check the browser's local memory to see if they hold the 'initiated' token
    const hasVisited = localStorage.getItem('vanguardInitiated');
    
    if (!hasVisited) {
        console.log("System: First-time citizen detected. Initiating tutorial sequence...");
        
        // Give the user exactly 1 second to take in the new environment before speaking to them
        setTimeout(() => {
            alert("Welcome to The Grand Citadel.\n\nYou are no longer waiting. Use the Mirrorgates to explore our directory. Return periodically for new operations.");
            
            // Mark the user as initiated so they aren't bothered upon return visits
            localStorage.setItem('vanguardInitiated', 'true');
        }, 1000);
        
    } else {
        console.log("System: Initiated Sovereign returned. Welcome back to the Citadel.");
        // The user is free to interact with the Mirrorgates immediately
    }
}
