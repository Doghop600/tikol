const formSingUpEl = document.querySelector('#form-sing-up')
console.log(formSingUpEl)


function handleFormSubmit(event) {
    console.log('fjs')
    event.preventDefault()
    const formData = new FormData(formSingUpEl)
    const newUser = Object.fromEntries(formData)
    console.log(newUser)
    //alert('user registed')

    //window.location.href = 'index.html'

    const users = JSON.parse(localStorage.getItem('users')) || []

    localStorage.setItem('newUser',JSON.stringify(newUser))
    localStorage.setItem('users',JSON.stringify([...users, newUser]))

}

formSingUpEl.addEventListener('submit', handleFormSubmit)