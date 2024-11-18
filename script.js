const btnLogout = document.querySelector('#btn-logout')

btnLogout.addEventListener('click',function () {
    localStorage.setItem('newUser', null)
    window.location.href = 'login.html'
})

