if (document.readyState !== 'loading') {
    initializeLogin()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initializeLogin()
    })
}

const initializeLogin = () => {
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        fetchData(event)
    })
} 

const fetchData = async (event) => {
    event.preventDefault()
    const formData = {
        username: event.target.username.value,
        password: event.target.password.value
    }
    console.log(formData)
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        if (!response.ok) {
            document.getElementById('error').textContent = 'Login failed, please try again'
        } else {
            const data = await response.json()
            if (data.token) {
                localStorage.setItem('auth_token', data.token)
                window.location.href = '/'
            }
        }
    } catch (error) {
        console.log(`Error when trying to login: ${error.message}`)
    }
}