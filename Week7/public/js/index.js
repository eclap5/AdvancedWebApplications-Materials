if (document.readyState !== 'loading') {
    initializeCode()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initializeCode()
    })
}

initializeCode = () => {
    document.getElementById("list").addEventListener("click", listOfUsers)
    document.getElementById("logout").addEventListener("click", logout)
}

const listOfUsers = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
            window.location.href = '/login.html'
        }
        
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
                users += `<li>Username: ${user.username}, ID: ${user._id}</li>`
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