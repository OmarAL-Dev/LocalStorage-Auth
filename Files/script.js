// ==========================================
// 2. Authentication (Login & Register)
// ==========================================


// --- DOM Elements ---
const userName = document.querySelector('#nameInput');
const email    = document.querySelector('#emailInput');
const password = document.querySelector('#inputPassword');
const openEye  = document.querySelector('#openEye');
const closeEye = document.querySelector('#closeEye');
const buttonCreate = document.querySelector('#buttonCreate');


// --- Regex Patterns ---
const forbiddenName     = /[^a-zA-Z0-9\u0621-\u064A\s]/g;
const forbiddenPassword = /[\s<>{}()[\]'"`\\]/g;
const forbiddenEmail    = /[^a-zA-Z\d@.!_-]/g;
const validEmailFormat  = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


// --- Helper: Flash field red ---
function flashError(field) {
    field.style.backgroundColor = "#d73e39a2";
    setTimeout(() => { field.style.backgroundColor = ""; }, 500);
}


// ==========================================
// Input Validation Listeners
// ==========================================

// Name: block forbidden characters & leading spaces
userName.addEventListener('input', function () {
    if (forbiddenName.test(this.value) || this.value.startsWith(' ')) {
        this.value = this.value.replace(forbiddenName, '').trimStart();
        flashError(this);
    } else {
        this.style.backgroundColor = "";
    }
});

// Email: block forbidden characters while typing
email.addEventListener('input', function () {
    if (forbiddenEmail.test(this.value)) {
        this.value = this.value.replace(forbiddenEmail, '');
        flashError(this);
    } else {
        this.style.backgroundColor = "";
    }
});

// Email: validate full format on blur
email.addEventListener('blur', function () {
    if (this.value !== '' && !validEmailFormat.test(this.value)) {
        this.style.backgroundColor = "#d73e39a2";
    } else {
        this.style.backgroundColor = "";
    }
});

// Password: block forbidden characters
password.addEventListener('input', function () {
    if (forbiddenPassword.test(this.value)) {
        this.value = this.value.replace(forbiddenPassword, '');
        flashError(this);
    } else {
        this.style.backgroundColor = "";
    }
});


// ==========================================
// Show / Hide Password
// ==========================================

closeEye.addEventListener('mousedown', function (e) {
    e.preventDefault();
    closeEye.classList.add('hide');
    openEye.classList.remove('hide');
    password.type = 'text';
});

openEye.addEventListener('mousedown', function (e) {
    e.preventDefault();
    openEye.classList.add('hide');
    closeEye.classList.remove('hide');
    password.type = 'password';
});

// Reset to hidden when field loses focus
password.addEventListener('blur', function () {
    openEye.classList.add('hide');
    closeEye.classList.remove('hide');
    password.type = 'password';
});


// ==========================================
// Register: Save to localStorage
// ==========================================

buttonCreate.addEventListener('click', function () {

    let finalName     = "";
    let finalEmail    = "";
    let finalPassword = "";

    // Validate name
    const clearName = userName.value.trim().replace(/\s+/g, ' ');
    if (clearName.length >= 3) {
        finalName = clearName;
    } else {
        userName.style.backgroundColor = "#d73e39a2";
    }

    // Validate email
    if (validEmailFormat.test(email.value)) {
        finalEmail = email.value;
    } else {
        email.style.backgroundColor = "#d73e39a2";
    }

    // Validate password
    if (password.value.length >= 6) {
        finalPassword = password.value;
    } else {
        password.style.backgroundColor = "#d73e39a2";
    }

    // Save only if all fields are valid
    if (finalName && finalEmail && finalPassword) {

        const newUser = {
            Name: finalName,
            Email: finalEmail,
            Password: finalPassword,
        };

        const existing = localStorage.getItem('All users');
        const users = existing ? JSON.parse(existing) : [];

        users.push(newUser);
        localStorage.setItem('All users', JSON.stringify(users));
    }
});