async function loginForm(event) {
    event.preventDefault();

//Gets the values from the login form found in the login handlebars
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 409) {
            response.json().then(data => {
                alert(data.message);
            });   
        } else if (response.ok) {
            document.location.replace('/');
        } else {
            document.location.replace('/404');
        }
    }
};

document.querySelector('#loginBtn').addEventListener('click', loginForm)
