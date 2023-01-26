
// Get the form element
const form = document.getElementById("register");

// Get the input elements
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Get the data from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedUsername = storedUser.username;
const storedPassword = storedUser.password;
console.log(storedPassword);


// Populate the input elements with the data from localStorage
// usernameInput.value = storedUsername;
// passwordInput.value = storedPassword;

// Add a submit event listener to the form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the input values
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if the input values match the stored data
    if (username === storedUsername && password === storedPassword) {
        window.location = 'home.html'
    } else {
        alert('Incorrect Username/Password');
    }
});






