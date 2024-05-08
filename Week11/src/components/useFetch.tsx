import { useEffect, useState } from 'react'

// Define a custom hook to fetch data from a URL (this can be very handy with the project!)
// Note: the type of data is unknown since it can be anything, therefore it needs to be casted where it is called
const useFetch = (url: string) => {
    // Create state variables
    const [data, setData] = useState<unknown>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    
    // Use useEffect to fetch the data
    useEffect(() => {
        const abortCtrl: AbortController = new AbortController() // Create a new AbortController object to cancel the fetch request

        const fetchData = async () => {
        try {
            const response: Response = await fetch(url, { signal: abortCtrl.signal }) // Pass the signal to the fetch request to allow for cancellation
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server')
            }
            const data: unknown = await response.json()
    
            // Set data state
            setData(data)
            setLoading(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') { // Check if the error is an AbortError
                    console.log('Fetch aborted')
                } else {
                    // Set error state
                    setError(error.message)
                    setLoading(false)
                }
            }
        }
        }
        fetchData()
        return () => abortCtrl.abort() // Cleanup function to cancel the fetch request if the component is unmounted
    }, [url])
    
    return { data, loading, error }
}

export default useFetch