document.addEventListener("DOMContentLoaded", () => {
    const terminalTextElement = document.getElementById("terminal-text");
    const splashContainer = document.getElementById("splash-container");
    const initButton = document.getElementById("initialize-btn");
    
    const bootSequence = "> INITIALIZING PROVE_IT ENGINE...";
    let index = 0;
    const typingSpeed = 50; 

    function typeText() {
        if (index < bootSequence.length) {
            terminalTextElement.textContent += bootSequence.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Typing is complete. Change text and reveal the manual override button.
            setTimeout(() => {
                terminalTextElement.textContent = "> SYSTEM READY. AWAITING COMMAND.";
                initButton.classList.remove("hidden");
            }, 600);
        }
    }

    // When the user clicks the INITIALIZE button
    initButton.addEventListener("click", () => {
        // Change terminal output to show action
        terminalTextElement.textContent = "> EXECUTING PROTOCOL...";
        initButton.classList.add("hidden"); // Hide the button
        
        // Trigger the CSS fade out
        splashContainer.classList.add("fade-out");
        
        // Wait for the CSS fade animation to finish (800ms) before redirecting
        setTimeout(() => {
            // When dashboard.html is ready, remove the '//' from the next line:
            // window.location.href = "dashboard.html";
        }, 800);
    });

    // Start the boot sequence 1 second after the page loads
    setTimeout(typeText, 1000);
});