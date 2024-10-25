const logInForm = document.querySelector('#form-log-in');
console.log(logInForm);

function handleLogIn(event) {
    event.preventDefault();
    const formData = new FormData(logInForm);
    const user = Object.fromEntries(formData);
    console.log(user);

    // window.location.href = 'index.html';

    const users = JSON.parse(localStorage.getItem('users')) || []
    const foundedUser = 
}

logInForm.addEventListener('submit', handleLogIn);
