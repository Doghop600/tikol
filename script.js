const btnLogout = document.querySelector('#btn-logout')
const viewBtn = document.querySelector('.view-btn')

btnLogout.addEventListener('click',function () {
    localStorage.setItem('newUser', null)
    window.location.href = 'login.html'
})

viewBtn.addEventListener('click',function(event) {
    event.preventDefault()
    window.location.href = 'news.html'
})