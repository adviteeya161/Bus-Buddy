document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (name === "" || email === "" || password === "") {
        message.textContent = "All fields are required!";
        return;
    }

    // Simple validation
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters!";
        return;
    }

    message.textContent = "Sign-up successful!";
    message.style.color = "green";
});

