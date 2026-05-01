document.addEventListener("DOMContentLoaded", () => {
    // 1. Auth & HUD Logic
    const savedUser = localStorage.getItem("vindex_user");
    if (savedUser) {
        document.getElementById("user-display").textContent = "OP: " + savedUser.toUpperCase();
    } else {
        // Kick out unauthorized access to the splash screen
        window.location.href = "index.html"; 
    }

    // Disconnect Button Logic
    document.getElementById("btn-disconnect").addEventListener("click", () => {
        localStorage.removeItem("vindex_user");
        window.location.href = "index.html";
    });

    // Real-time HUD Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById("time-display").textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);
});

// 2. Global Agent Radar System (Canvas Background)
const canvas = document.getElementById('radar-map');
const ctx = canvas.getContext('2d');
let width, height;
const agents = [];

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnAgent() {
    agents.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        maxRadius: Math.random() * 50 + 20, 
        alpha: 1.0 // Bright spawn
    });
    setTimeout(spawnAgent, Math.random() * 2000 + 500); 
}

function drawMap() {
    ctx.clearRect(0, 0, width, height);
    
    // Brighter Tactical Grid
    ctx.strokeStyle = 'rgba(74, 107, 140, 0.4)'; 
    ctx.lineWidth = 1;
    for(let i = 0; i < width; i += 100) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke(); }
    for(let i = 0; i < height; i += 100) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke(); }

    agents.forEach((agent, index) => {
        // Expanding outer ring
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${agent.alpha})`; 
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${agent.alpha})`;
        ctx.fill();

        agent.radius += 0.3;
        agent.alpha -= 0.002; // Slower fade

        if (agent.alpha <= 0) agents.splice(index, 1);
    });
    requestAnimationFrame(drawMap);
}

// Initialize Radar
spawnAgent();
drawMap();