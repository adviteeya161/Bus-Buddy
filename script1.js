function submitChoice() {
    const role = document.getElementById("role").value;
    const route = document.getElementById("route").value;

    if (role && route) {
        alert(`You selected Role: ${role} and Route: ${route}`);
        // Redirect to appropriate page based on role
        if (role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "user-dashboard.html";
        }
    } else {
        alert("Please select both role and route.");
    }
}
