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
}

formSingUpEl.addEventListener('submit', handleFormSubmit)