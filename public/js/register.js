const registerForm = async (event) => {
    event.preventDefault();
    event.stopPropagation();

// //Gets the values from the login form found in the login handlebars
const username = document.querySelector('#inputUserName').value.trim();
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();
const passwordConfirm = document.querySelector('#inputPasswordConfirm').value.trim();
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkPass = (password, passwordConfirm) => {
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};

if (!username) {
    alert('Username is required.');
    return;
} else if (!emailPattern.test(email)) {
    alert('Please provide a valid email address for registration.');
    return;
} else if (password.length < 6) {
    alert('Password length must be greater than or equal to 6.');
    return;
} else if (checkPass(password, passwordConfirm)) {
    const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 409) {
            response.json().then(data => {
                alert(data.message);
            });
        } else if (response.ok) {
            document.location.replace('/login');
            response.json().then(data => {
                alert(data.message);
            });
        } else {
            alert('test');
        };
    } else {
    alert('Passwords do not match.  Please try again.');
    };
};

document.querySelector('#createAcct').addEventListener('click', registerForm)