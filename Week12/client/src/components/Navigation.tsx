import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function NavigationBar() {
    const [jwt, setJwt] = useState<string | null>(null)

    // Check if the token is stored in local storage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setJwt(localStorage.getItem('token'))
        }
    }, [jwt])

    // Function to logout the user and remove the token from local storage
    const logout = () => {
        localStorage.removeItem('token')
        setJwt(null)
        window.location.href = '/'
    }

    // Use conditional rendering based on login status
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cool App
                    </Typography>
                    {!jwt ? (
                    <>
                        <Button component={Link} to="/login" color="inherit">Login</Button>
                        <Button component={Link} to="/register" color="inherit">Register</Button>
                    </>) : (
                        <Button component={Link} to="/logout" color="inherit" onClick={logout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
