import React, { useState } from "react"

// Define interface for the onAdd function to be passed to the AddPoem component
interface AddPoemProps {
    onAdd: (poem: {vip: boolean, content: string}) => void
}

const AddPoem: React.FC<AddPoemProps> = ({onAdd}) => {
    // Define state variables to store state of variables
    const [vip, setVip] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')

    // Define function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(vip, content)

        onAdd({vip, content})

        setVip(false)
        setContent('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Poem</label>
                <textarea placeholder="Add poem" onChange={(e) => setContent(e.target.value)} value={content}/>
                <label>
                    VIP
                    <input
                        type="checkbox"
                        checked={vip}
                        onChange={(e) => setVip(e.target.checked)}
                    />
                </label>
                <button type="submit">Add Poem</button>
            </form>
        </div>
    )
}

export default AddPoem