const registerForm = async (event) => {
    event.preventDefault();


//Gets the values from the login form found in the login handlebars
const userName = document.querySelector('#inputUserName').value.trim();
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();
const passwordConfirm = document.querySelector('#inputPasswordConfirm').value.trim();
if (userName && email && password && passwordConfirm) {
    const response = await fetch('api/users/login', {
        method: 'POST',
        body: JSON.stringify({userName, email, password, passwordConfirm}),
        headers: { 'Content-Type': 'application/json' },
    });

    check_pass();

    function check_pass() {
        if (password == passwordConfirm) {
            document.getElementById('createAcct').disabled = false;
        } else {
            document.getElementById('createAcct').disabled = true;
        }
    }

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
  }
};