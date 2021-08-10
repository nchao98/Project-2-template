const idea = async () => {

    const response = await fetch('api/users/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/idea/:id');
    } else {response.status};
}

document.querySelector('').addEventListener('click')

// const logout = async () => {

    
//     const response = await fetch('/api/users/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.replace('/logout');
//     } else {
//         alert("You are not currently logged in.");
//         document.location.replace('/login');
//     }

// };

// document.querySelector('#logout').addEventListener('click', logout);