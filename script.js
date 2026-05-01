document.addEventListener("DOMContentLoaded", () => {
    const terminalTextElement = document.getElementById("terminal-text");
    const splashContainer = document.getElementById("splash-container");
    
    // The sequence we want to type out
    const bootSequence = "> INITIALIZING PROVE_IT ENGINE...";
    let index = 0;
    
    // Speed of the terminal typing (milliseconds per character)
    const typingSpeed = 60; 

    // Function to type out the text character by character
    function typeText() {
        if (index < bootSequence.length) {
            terminalTextElement.textContent += bootSequence.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Typing is complete. Wait 1.5 seconds, then transition.
            setTimeout(transitionToDashboard, 1500);
        }
    }

    // Function to handle the fade out and redirect
    function transitionToDashboard() {
        // Add the fade-out CSS class to the container
        splashContainer.classList.add("fade-out");
        
        // Wait for the CSS fade animation to finish (800ms) before redirecting
        setTimeout(() => {
            // Uncomment the line below when your dashboard page is ready
            // window.location.href = "dashboard.html";
            
            // For now, just change the text to show it worked
            terminalTextElement.textContent = "> SYSTEM READY. STANDBY.";
        }, 800);
    }

    // Start the boot sequence 1 second after the page loads
    setTimeout(typeText, 1000);
});