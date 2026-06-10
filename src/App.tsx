import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Garage from './pages/Garage'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import VehicleIdentity from './pages/VehicleIdentity'
import Settings from './pages/Settings'
import VMart from './pages/VMart'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter basename="/vtag-app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/vehicle-identity" element={<VehicleIdentity />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/v-mart" element={<VMart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App