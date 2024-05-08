import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ButtonAppBar from './components/Navigation'
import Posts from './components/Posts'
import Comments from './components/Comments'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
        <ButtonAppBar />
          <Routes>
            <Route path="/" element={<> <Posts /> </>} />
            <Route path="/comments" element={<> <Comments /> </>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
