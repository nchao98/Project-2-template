const registerForm = async (event) => {
    event.preventDefault();
    event.stopPropagation();

// //Gets the values from the login form found in the login handlebars
const username = document.querySelector('#inputUserName').value.trim();
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();
const passwordConfirm = document.querySelector('#inputPasswordConfirm').value.trim();

const checkPass = (password, passwordConfirm) => {
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};

    if (username && email && checkPass(password, passwordConfirm)) {
        const response = await fetch('/api/users/create', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
        // document.location.replace('/profile');
            alert('Success!')
        } 
        else 
        {
            alert(response.statusText);
        }
    }
    else 
    {
        alert('Password does not match!');
    }
}

document.querySelector('#createAcct').addEventListener('click', registerForm)