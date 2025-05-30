// Save token to localStorage
export function setAuthToken(token) {
    console.log(token, "setorToken");

    localStorage.setItem("token", token);
}

// Get token from localStorage
export function getAuthToken() {
    return localStorage.getItem("token"); // <-- FIXED: token should be in quotes
}

// Remove token from localStorage
export function removeAuthToken() {
    localStorage.removeItem("token"); // <-- FIXED: token should be in quotes
}

// Save user to localStorage
export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user)); // Saves full user object as string
}


export function getUser() {
    const user = localStorage.getItem("user"); // <-- FIXED: you were referencing user without declaring it
    return user ? JSON.parse(user) : null;
}

// Remove user from localStorage
export function removeUser() {
    localStorage.removeItem("user"); // <-- FIXED: "user" in quotes
}
