/**
 * NOTE: "Proxy": "http://localhost:5050"  needs to be added to package.json
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<> <Home /> </>} />
            <Route path="/login" element={<> <Login /> </>} />
            <Route path="/register" element={<> <Register /> </>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
