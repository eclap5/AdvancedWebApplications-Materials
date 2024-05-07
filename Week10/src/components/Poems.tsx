import Poem from "./Poem"
import React from "react"

interface PoemsProps {
    poems: {
        id: number
        vip: boolean
        poem: string
    }[]
}

const Poems: React.FC<PoemsProps> = ({poems}) => {
    return (
        <div>
            {poems.map((poem) => (
                <Poem key={poem.id} vip={poem.vip} poem={poem.poem} />
            ))}
        </div>
    )
}

export default Poems