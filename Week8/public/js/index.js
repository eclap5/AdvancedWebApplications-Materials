if (document.readyState !== 'loading') {
    initializeCode()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initializeCode()
    })
}

// If token not found from local storage or url parameters (google login), redirect to login page
initializeCode = () => {
    if (localStorage.getItem('auth_token') === null) {
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')
        if (urlToken) {
            localStorage.setItem('auth_token', urlToken)
        } else {
            window.location.href = '/login.html'
        }
    }
    const token = localStorage.getItem('auth_token')
    document.getElementById("list").addEventListener("click", () => listOfUsers(token)) // arrow function to pass parameters
    document.getElementById("logout").addEventListener("click", logout)
}

const listOfUsers = async (token) => {
    try {
        const response = await fetch('/api/users/list', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            document.getElementById('error').textContent = 'Error when trying to list users. Please try again.'
        } else {
            const data = await response.json()
            let users = ''
            data.map(user => {
                users += `<li>Username: ${user.username}, ID: ${user._id}, Google ID: ${user.googleId}</li>`
            })
            document.getElementById('user-list').innerHTML = users
        }
    }
    catch (error) {
        console.log(`Error when trying to list users: ${error.message}`)
    }
}

const logout = () => {
    localStorage.removeItem('auth_token')
    window.location.href = '/login.html'
}