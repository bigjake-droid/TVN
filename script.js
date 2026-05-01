document.addEventListener("DOMContentLoaded", () => {
    // Splash Elements
    const terminalText = document.getElementById("terminal-text");
    const initBtn = document.getElementById("initialize-btn");
    const splashLayer = document.getElementById("splash-layer");
    const authLayer = document.getElementById("auth-layer");

    // Auth Elements
    const authSelection = document.getElementById("auth-selection");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    
    // Boot Sequence Logic
    const bootSequence = "> FETCHING ENCRYPTED PAYLOAD...";
    let index = 0;
    
    function typeText() {
        if (index < bootSequence.length) {
            terminalText.textContent += bootSequence.charAt(index);
            index++;
            setTimeout(typeText, 40);
        } else {
            setTimeout(() => {
                terminalText.textContent = "> PAYLOAD SECURED. SYSTEM READY.";
                initBtn.classList.remove("hidden");
            }, 500);
        }
    }
    setTimeout(typeText, 800);

    // Transition from Splash to Auth
    initBtn.addEventListener("click", () => {
        splashLayer.classList.add("fade-out");
        setTimeout(() => {
            splashLayer.classList.replace("active-layer", "hidden-layer");
            authLayer.classList.replace("hidden-layer", "active-layer");
            
            // Check if user already exists in local storage
            if (localStorage.getItem("vindex_user")) {
                // If they exist, auto-show the login form to save time
                showLoginForm();
            }
        }, 500);
    });

    // UI Navigation Logic
    document.getElementById("btn-login").addEventListener("click", showLoginForm);
    document.getElementById("btn-new-candidate").addEventListener("click", showRegisterForm);
    
    document.querySelectorAll(".back-btn").forEach(btn => {
        btn.addEventListener("click", resetAuthUI);
    });

    function showLoginForm() {
        authSelection.style.display = "none";
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        // Auto fill username if exists
        const savedUser = localStorage.getItem("vindex_user");
        if(savedUser) document.getElementById("login-user").value = savedUser;
    }

    function showRegisterForm() {
        authSelection.style.display = "none";
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }

    function resetAuthUI() {
        authSelection.style.display = "block";
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        document.getElementById("login-error").textContent = "";
        document.getElementById("reg-error").textContent = "";
    }

    // REGISTRATION LOGIC
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("reg-user").value;
        const pass1 = document.getElementById("reg-pass").value;
        const pass2 = document.getElementById("reg-pass-verify").value;
        const errorText = document.getElementById("reg-error");

        if (pass1 !== pass2) {
            errorText.textContent = "[!] PASSPHRASES DO NOT MATCH";
            return;
        }

        // Save to Local Device Storage
        localStorage.setItem("vindex_user", user);
        localStorage.setItem("vindex_pass", pass1); // Stored locally on device
        
        const submitBtn = registerForm.querySelector(".submit-btn");
        submitBtn.textContent = "> ENCRYPTING...";
        submitBtn.style.color = "#00ff00";

        setTimeout(() => {
            // Forward to Command Center
            window.location.href = "command-center.html";
        }, 1000);
    });

    // LOGIN LOGIC
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("login-user").value;
        const pass = document.getElementById("login-pass").value;
        const errorText = document.getElementById("login-error");

        const savedUser = localStorage.getItem("vindex_user");
        const savedPass = localStorage.getItem("vindex_pass");

        if (!savedUser) {
            errorText.textContent = "[!] NO CANDIDATE RECORD FOUND ON DEVICE";
            return;
        }

        if (user === savedUser && pass === savedPass) {
            const submitBtn = loginForm.querySelector(".submit-btn");
            submitBtn.textContent = "> ACCESS GRANTED";
            submitBtn.style.color = "#00ff00";
            
            setTimeout(() => {
                // Forward to Command Center
                window.location.href = "command-center.html";
            }, 1000);
        } else {
            errorText.textContent = "[!] INVALID CREDENTIALS";
        }
    });
});