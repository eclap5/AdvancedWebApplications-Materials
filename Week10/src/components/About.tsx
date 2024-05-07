import { useState, useEffect } from 'react'

const About = () => {
    const [dataType, setDataType] = useState<string>('posts')
    const [data, setData] = useState<string>('')

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${dataType}`)
            .then(response => response.json())
            .then(json => setData(JSON.stringify(json)))
    }, [dataType])

    return (
        <div>
            <h2>About</h2>
            <p>Text...</p>
            <button onClick={() => setDataType('posts')}>Posts</button>
            <button onClick={() => setDataType('comments')}>Comments</button>
            <h3>{dataType}</h3>
            <p>{data}</p>
        </div>
    )

}

export default About