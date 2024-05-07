import './App.css'
import Poems from './components/Poems'
import AddPoem from './components/AddPoem'
import { useState } from 'react'

interface IPoem {
  id: number
  poem: string
  vip: boolean
}

function App() {
  const [poems, setPoems] = useState<IPoem[]>([{
    "id": 1,
    "poem": "Nunc tempus eros id venenatis sagittis. Nam ac sagittis elit. Aenean ac eleifend metus, eget tincidunt odio.",
    "vip": true
  },
  {
    "id": 2,
    "poem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit libero sed mi euismod dapibus. Nullam eu molestie libero, eget interdum massa.",
    "vip": false
  },
  {
    "id": 3,
    "poem": "Suspendisse efficitur tellus id blandit vestibulum. Etiam condimentum dolor velit, in fermentum ligula ultricies et.",
    "vip": false
  }])

  const addPoem = (poem: {vip: boolean, content: string}) => {
    const id: number = Math.floor(Math.random() * 1000000 + 1000)
    const newPoem: IPoem = {id, poem: poem.content, vip: poem.vip}
    setPoems([...poems, newPoem])
  }

  return (
    <div className="App">
      <h1>Poems</h1>
      <Poems poems={poems} />
      <AddPoem onAdd={addPoem} />
    </div>
  )
}

export default App
