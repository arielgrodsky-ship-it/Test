function validateForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("Tel").value;
    const issue = document.getElementById("Issue").value;

    const usernamePattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_]+$/;

    if (username.trim() === "") {
        alert("Please enter a username!");
        return; 
    }

    if( username.length < 3 || username.length > 20) {
        alert("Username must be between 3 and 20 characters!");
        return;
    }

    if(!usernamePattern.test(username)) {
        alert("The username must contain one Cap letter, one small letter, and one number.");
        return;
    }

    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
        alert("Invalid email! Make sure it contains an @ and .");
        return;
    }

    if (age < 15 || age >= 120) {
        alert("Age must be at least 15 and less than 120!");
        return;
    }

    const phonePattern = /^[0-9]{10}$/; 
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    if (issue === "") {
        alert("Please select an issue!");
        return;
    }

    // --- UPDATED FETCH CALLS BELOW ---

    // GET – שולח בקשה עם נתונים ב-URL
    // Updated to use your live Render URL!
    fetch("https://test-qq91.onrender.com/get?username=" + username + "&email=" + email + "&age=" + age + "&phone=" + phone + "&issue=" + issue)
        .then(res => res.text())
        .then(data => alert("GET Response: " + data))
        .catch(err => console.error(err));

    // POST – שולח בקשה עם נתונים בגוף הבקשה
    // Updated to use your live Render URL!
    fetch("https://test-qq91.onrender.com/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username, email: email , phone: phone})
    })
    .then(res => res.text())
    .then(data => alert("POST Response: " + data))
    .catch(err => console.error(err));
}