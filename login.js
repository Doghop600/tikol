const logInForm = document.querySelector('#form-log-in');
console.log(logInForm);

function handleLogIn(event) {
    event.preventDefault();
    const formData = new FormData(logInForm);
    const user = Object.fromEntries(formData);
    console.log(user);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);

    // Проверяем, существует ли пользователь в массиве users
    const existingUser = users.find(u => u.username === user.username && u.password === user.password);

    if (existingUser) {
        // Если пользователь найден, перенаправляем на основную страницу site.html
        window.location.href = 'site.html';
    } else {
        // Если пользователя нет, выводим сообщение об ошибке
        alert('Неправильный логин или пароль');
    }
}

logInForm.addEventListener('submit', handleLogIn);
