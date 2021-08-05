const regusterForm = async (event) => {
    event.preventDefault();


//Gets the values from the login form found in the login handlebars
const firstName = document.querySelector('inputFirstName').value.trim();
const lastName = document.querySelector('inputLastName').value.trim();
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();
const passwordConfirm = document.querySelector('#inputPasswordConfirm').value.trim();
if (firstName && lastName && email && password && passwordConfirm) {
    const response = await fetch('api/users/login', {
        method: 'POST',
        body: JSON.stringify({firstName, lastName, email, password, passwordConfirm}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
  }
};