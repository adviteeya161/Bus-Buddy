document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");

    document.addEventListener("click", function(event) {
        if (!sidebar.contains(event.target)) {
            sidebar.style.transform = "translateX(-260px)";
        } else {
            sidebar.style.transform = "translateX(0)";
        }
    });
});
