import React from "react"

// Define interface for the props to be passed to the Poem component
interface PoemProps {
    vip: boolean
    poem: string
}

const Poem: React.FC<PoemProps> = ({vip, poem}) => {
    return (
        <div>
            <p className={vip ? 'vip' : ''}>{poem}</p>
        </div>
    )
}

export default Poem