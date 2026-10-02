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
import VehicleSettings from './pages/VehicleSettings'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ManufacturerInformation from './pages/ManufacturerInformation'
import VehicleRecord from './pages/VehicleRecord'
import VehicleHealth from './pages/VehicleHealth'
import VehicleDocuments from './pages/VehicleDocuments'
import VehicleMileage from './pages/VehicleMileage'
import MotHistory from './pages/MotHistory'
import ServiceHistory from './pages/ServiceHistory'
import VehicleModifications from './pages/VehicleModifications'
import VehicleCondition from './pages/VehicleCondition'
import VehicleWarranty from './pages/VehicleWarranty'
import TechnicalSpecification from './pages/TechnicalSpecification'
import FactoryEquipment from './pages/FactoryEquipment'
import VehicleEmissions from './pages/VehicleEmissions'
import VehicleRecalls from './pages/VehicleRecalls'
import VehicleOwnership from './pages/VehicleOwnership'
import VehicleRegistrationHistory from './pages/RegistrationHistory'
import VTagRecord from './pages/VTagRecord'
import VehicleVerification from './pages/VehicleVerification'
import Timeline from './pages/Timeline'

function App() {
  return (
    <BrowserRouter basename="/vtag-app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/vehicle-identity" element={<VehicleIdentity />} />
        <Route path="/user-settings" element={<Settings />} />
        <Route path="/vehicle-settings" element={<VehicleSettings />} />
        <Route path="/v-mart" element={<VMart />} />
        <Route
          path="/vehicle-identity/manufacturer"
          element={<ManufacturerInformation />}
        />
        <Route path="/vehicle-identity/record" element={<VehicleRecord />} />
        <Route path="/vehicle-identity/health" element={<VehicleHealth />} />
        <Route
          path="/vehicle-identity/documents"
          element={<VehicleDocuments />}
        />
        <Route
          path="/vehicle-identity/health/mileage"
          element={<VehicleMileage />}
        />
        <Route path="/vehicle-identity/health/mot" element={<MotHistory />} />
        <Route
          path="/vehicle-identity/health/servicing"
          element={<ServiceHistory />}
        />
        <Route
          path="/vehicle-identity/health/modifications"
          element={<VehicleModifications />}
        />
        <Route
          path="/vehicle-identity/health/condition"
          element={<VehicleCondition />}
        />
        <Route
          path="/vehicle-identity/warranty"
          element={<VehicleWarranty />}
        />
        <Route
          path="/vehicle-identity/manufacturer/specification"
          element={<TechnicalSpecification />}
        />
        <Route
          path="/vehicle-identity/manufacturer/equipment"
          element={<FactoryEquipment />}
        />
        <Route
          path="/vehicle-identity/manufacturer/emissions"
          element={<VehicleEmissions />}
        />
        <Route
          path="/vehicle-identity/manufacturer/recalls"
          element={<VehicleRecalls />}
        />
        <Route
          path="/vehicle-identity/record/ownership"
          element={<VehicleOwnership />}
        />
        <Route
          path="/vehicle-identity/record/registration-history"
          element={<VehicleRegistrationHistory />}
        />
        <Route path="/vehicle-identity/record/vtag" element={<VTagRecord />} />
        <Route
          path="/vehicle-identity/record/verification"
          element={<VehicleVerification />}
        />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
