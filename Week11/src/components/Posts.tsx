import useFetch from './useFetch'

interface IPosts {
    userId: number
    id: number
    title: string
    body: string
}

const Posts = () => {
    const url: string = 'https://jsonplaceholder.typicode.com/posts'
    const { data, loading, error } = useFetch(url)
    
    const convertedData: IPosts[] = data as IPosts[]
    console.log(data)

    // Use fragments to return multiple elements and to reduce the number of divs in the DOM
    return (
        <>
            <h1>All Posts</h1>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {convertedData && (
                <div>
                    {convertedData.map((post: IPosts) => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Posts