const ideaForm = async (event) => {
    event.preventDefault();
    event.stopPropagation();

// //Gets the values from the login form found in the login handlebars
const inputtedIdea = document.querySelector('#inputIdea').value.trim();
const categoryChoice = parseInt(document.querySelector('#chooseCategory').value.trim());
const linkName = document.querySelector('#inputLink').value.trim();
const description = document.querySelector('#inputDescription').value.trim();


if (inputtedIdea && linkName && description && categoryChoice) {
    console.log(inputtedIdea,linkName, description, categoryChoice);
        const response = await fetch('/api/users/createIdea', {
            method: 'POST',
            body: JSON.stringify({inputtedIdea, linkName, description, categoryChoice}),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace(`/categories/${categoryChoice}`);
            alert('Success!')
        } 
        else 
        {
            alert(response.statusText);
        }
    }
}

document.querySelector('#ideaBtn').addEventListener('click', ideaForm)