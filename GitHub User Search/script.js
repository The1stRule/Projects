
const form = document.querySelector('form');
const message = document.getElementById('message');
const elements = document.querySelectorAll('.t-element');

const loadMessage = () => {
    message.textContent = "Loading..."
    message.style.color = "white";
}

const errorMessage = (error) => {
    message.textContent = error;
    message.style.color = "red";
}

const renderUserProfile = (data) => {
    elements[0].src = data.avatar_url;
    elements[1].textContent = data.name;
    elements[2].textContent = data.login;
    elements[3].textContent = `Bio: ${data.bio !== null ? data.bio : "Don't have it"}`;
    elements[4].textContent = `Number of public repositories: ${data.public_repos}`;
    elements[5].href = data.html_url;
    elements[5].textContent = data.html_url;
}

const getUser = () => {
    const username = form.username.value.trim();

    const promise = fetch(`https://api.github.com/users/${username}`);
    
    loadMessage();

    promise
        .then((response) => {
            console.log(response)
            if(!response.ok) {
                return;
            }

            return response.json();
        })
        .then((data) => {
            message.textContent = '';
            console.log(data);
            renderUserProfile(data);
        })
        .catch((error) => {
            console.log(error);
            errorMessage("User not found");
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    getUser();
    form.reset();
})