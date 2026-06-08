import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Garage from './pages/Garage'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'

function App() {
  return (
    <BrowserRouter basename="/vtag-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App