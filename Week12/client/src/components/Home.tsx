import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

interface IPoem {
    id: number
    poem: string
    vip: boolean
}

const Home = () => {
    const [jwt, setJwt] = useState<string | null>(null)
    const [poems, setPoems] = useState<IPoem[]>([])

    // Check if the token is stored in local storage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setJwt(localStorage.getItem('token'))
        }
    }, [jwt])

    // Fetch poems from the server
    const fetchPoems = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/poems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
            if (!response.ok) {
                throw new Error('Error while fetching data')
            }
            const data = await response.json()
            setPoems(data)
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error when trying to fetch poems: ${error.message}`)
            }
        }
    }

    // Use conditional rendering based on login status to display poems
    return (
        <div>
            <h1>Welcome to Poems</h1>
            {!jwt ? (
                <p>Please login to fetch poems.</p>
                ) : (
                    <>
                        <Button sx={{ display: 'flex', justifyContent: 'center', margin: 'auto' }} variant="contained" color="primary" onClick={fetchPoems}>Fetch Poems</Button>
                        {poems.map((poem, index) => (
                        <div key={index}>
                            <h3>Poem {poem.id}.</h3>
                            <p>{poem.poem}</p>
                        </div>))}
                    </>
                )}
        </div>
    )
}

export default Home