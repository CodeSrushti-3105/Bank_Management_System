// ========================================
// REGISTER - Create new user
// ========================================
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").onsubmit = async function(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        
        if (res.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Registration failed");
        }
    };
}

// ========================================
// LOGIN - Authenticate user
// ========================================
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").onsubmit = async function(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    };
}
