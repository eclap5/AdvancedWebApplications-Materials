import useFetch from './useFetch'

interface IComments {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

const Comments = () => {
    const url: string = 'https://jsonplaceholder.typicode.com/comments'
    const { data, loading, error } = useFetch(url)
    
    const convertedData: IComments[] = data as IComments[]
    console.log(data)

    // Use fragments to return multiple elements and to reduce the number of divs in the DOM
    return (
        <>
            <h1>All Comments</h1>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {convertedData && (
                <div>
                    {convertedData.map((comment: IComments) => (
                        <div key={comment.id}>
                            <h2>{comment.name}</h2>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Comments