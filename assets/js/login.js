const form = document.getElementById('login-form')

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value

        // email: admin@gmail.com; password: admin123

        if (email === 'admin@gmail.com' && password === 'admin123') {
            localStorage.setItem('HAS_USER', 'true')
            window.location = '../views/admin.html'
        }
    })
}