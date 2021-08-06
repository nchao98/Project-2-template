const registerForm = async (event) => {
    //event.preventDefault();
    //event.stopPropagation();

console.log('test')


// //Gets the values from the login form found in the login handlebars
const username = document.querySelector('#inputUserName').value.trim();
const email = document.querySelector('#inputEmail').value.trim();
const password = document.querySelector('#inputPassword').value.trim();
//const passwordConfirm = document.querySelector('#inputPasswordConfirm').value.trim();

// function check_pass() {
//     if (password == passwordConfirm) {
//         document.getElementById('createAcct').disabled = false;
//     } else {
//         document.getElementById('createAcct').disabled = true;
//     }
// };
// check_pass();

if (username && email && password) {
    const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
       // document.location.replace('/profile');
       alert('Success!')
    } else {
        alert(response.statusText);
    }
  }
};

document.querySelector('#createAcct').addEventListener('click', registerForm)